import { app } from './app.js';
import { connectDb } from './config/db.js';

const PORT = process.env.PORT ?? 2026;

/*------------------------------------------------------------
CONNEXION A LA BASE DE DONNEE
------------------------------------------------------------*/
await connectDb()

/*------------------------------------------------------------
ENVOI DES REQUETTES SUR LE PORT 3000
------------------------------------------------------------*/
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});