export function errorHandler(err, req, res, next) {

    // Affiche l'erreur dans la console du serveur pour le debug
    console.error(err);

    // Vérifie si l'erreur est une erreur de validation (souvent venant de Mongoose)
    if (err.name === "ValidationError") {

        // Retourne une réponse 400 (Bad Request) avec le message d'erreur
        return res.status(400).json({
            error: {
                message: err.message
            }
        })

    }

    // Si l'erreur n'est pas une erreur de validation
    // on retourne une erreur serveur générique
    return res.status(500).json({
        error: {
            message: "Internal Server Error"
        }
    })
}