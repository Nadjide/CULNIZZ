const sqlite3 = require('sqlite3').verbose();

// Création de la connexion à la base de données SQLite
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la BDD', err.message);
    } else {
        console.log('Connexion réussie à la base SQLite');
    }
});

// Création d'une table utilisateurs
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Utilisateur (
        idUtilisateur INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        prenom TEXT NOT NULL,
        score INTEGER NULL,
        email TEXT UNIQUE NOT NULL,
        mot_de_passe TEXT NOT NULL
    )`);

    // Table Quiz
    db.run(`CREATE TABLE IF NOT EXISTS Quiz (
        idQuiz INTEGER PRIMARY KEY AUTOINCREMENT,
        titre TEXT NOT NULL,
        description TEXT NULL,
        utilisateur_id INTEGER NOT NULL,
        FOREIGN KEY (utilisateur_id) REFERENCES Utilisateur(idUtilisateur) ON DELETE CASCADE
    )`);

    // Table Question
    db.run(`CREATE TABLE IF NOT EXISTS Question (
        idQuestion INTEGER PRIMARY KEY AUTOINCREMENT,
        quiz_id INTEGER NOT NULL,
        question TEXT NOT NULL,
        reponse_correcte TEXT NOT NULL,
        choix1 TEXT NULL,
        choix2 TEXT NULL,
        choix3 TEXT NULL,
        choix4 TEXT NULL,
        points INTEGER NOT NULL,
        FOREIGN KEY (quiz_id) REFERENCES Quiz(idQuiz) ON DELETE CASCADE
    )`);

    //console.log('Tables Utilisateur, Quiz et Question créées avec succès');
});


module.exports = db;