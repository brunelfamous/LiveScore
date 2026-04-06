import { app } from './app.js';
import redis from 'redis'
import { connectDb } from './config/db.js';

const PORT = process.env.PORT ?? 2026;

await connectDb();

// 1. Création et connexion au client Redis
const client = redis.createClient({
    url: 'redis://localhost:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    await client.connect();
    console.log("Connecté à Redis ! ⚡");
})();

// 2. Route pour le Gestionnaire (Mise à jour du score)
app.post('/api/update-score', async (req, res) => {
    const { matchId, scoreA, scoreB, timer } = req.body;

    try {
        // On stocke les données dans un "Hash" Redis
        // HSET match:ID field value
        await client.hSet(`match:${matchId}`, {
            'scoreA': scoreA.toString(),
            'scoreB': scoreB.toString(),
            'timer': timer.toString(),
            'lastUpdate': Date.now().toString()
        });

        // Optionnel : Définir une expiration (ex: 24h) pour ne pas encombrer la RAM
        await client.expire(`match:${matchId}`, 86400);

        // C'est ici que tu appellerais Socket.io pour prévenir Flutter
        // io.emit(`scoreUpdate:${matchId}`, { scoreA, scoreB, timer });

        res.status(200).send({ message: "Score actualisé dans le cache !" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// 3. Route pour récupérer le score (ultra rapide)
app.get('/api/score/:id', async (req, res) => {
    const matchId = req.params.id;
    
    // On récupère tout l'objet d'un coup depuis la RAM
    const data = await client.hGetAll(`match:${matchId}`);
    
    if (Object.keys(data).length === 0) {
        return res.status(404).send({ message: "Match non trouvé" });
    }
    
    res.send(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});