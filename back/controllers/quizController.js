/* const db = require('../models/db');

exports.createQuiz = (req, res) => {
    const { titre, description, utilisateur_id } = req.body;

    if (!titre || !description || !utilisateur_id) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    db.run(`INSERT INTO Quiz (titre, description, utilisateur_id) VALUES (?, ?, ?)`,
        [titre, description, utilisateur_id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: "Erreur lors de la création du quiz" });
            }
            res.status(201).json({ message: "Quiz créé avec succès !" });
        }
    );
}; */


const db = require('../models/db');

exports.createQuizWithQuestions = (req, res) => {
    const { titre, description, utilisateur_id, questions } = req.body;

    if (!titre || !utilisateur_id || !questions || questions.length === 0) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    db.run(`INSERT INTO Quiz (titre, description, utilisateur_id) VALUES (?, ?, ?)`, 
        [titre, description, utilisateur_id], 
        function (err) {
            if (err) {
                return res.status(500).json({ error: "Erreur lors de la création du quiz" });
            }

            const quizId = this.lastID; // Récupération de l'ID du quiz inséré

            // Insérer toutes les questions associées
            const stmt = db.prepare(`INSERT INTO Question (quiz_id, question, reponse_correcte, choix1, choix2, choix3, choix4, points) 
                                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);

            for (let q of questions) {
                stmt.run(quizId, q.question, q.reponse_correcte, q.choix1, q.choix2, q.choix3, q.choix4, q.points);
            }

            stmt.finalize((err) => {
                if (err) {
                    return res.status(500).json({ error: "Erreur lors de l'insertion des questions" });
                }
                res.status(201).json({ message: "Quiz  et questions ajoutés avec succès ! "+quizId });
            });
        }
    );
};
