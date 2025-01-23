const db = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerUser = (req, res) => {
    const { nom, prenom, email, mot_de_passe } = req.body;
    
    if (!nom || !prenom || !email || !mot_de_passe) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    // Hash du mot de passe
    bcrypt.hash(mot_de_passe, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: "Erreur lors du hachage" });

        db.run(`INSERT INTO Utilisateur (nom, prenom, email, mot_de_passe) VALUES (?, ?, ?, ?)`,
            [nom, prenom, email, hash],
            function (err) {
                if (err) {
                    return res.status(400).json({ error: "Email déjà utilisé : "+err });
                }
                res.status(201).json({ message: "Utilisateur enregistré avec succès !" });
            }
        );
    });
};
