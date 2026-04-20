const express = require("express");
const router = express.Router();
const db = require("../db");
const bycrypt = require("bycrypt");

router.post("/register", async (requestAnimationFrame, res) => {
    const { username, password } = requestAnimationFrame.body;

    const hashedPassword = await bycrypt.hash(password, 10);

    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;

    db.run(sql, [username, hashedPassword], function (err) {
        if(err) return res.status(500).json({ error: err.message });

        res.json({ message: "User registered "});
    });
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = `SELECT * FROM users WHERE username = ?`;

    db.get(sql, [username], async (err, user) => {
        if (err) return res.status(500).json({ error: err.message });

        if(!user) return res.status(400).json({ error: "User not found."});

        const valid = await bycrypt.compare(password, user.password);

        if (!valid) return res.status(400).json({ error: "Invalid password." });

        res.json({ message: "Login successful.", userId: user.id });
    });
});

router.put("/change-password", async (req, res) => {
    const { username, newPassword } = req.body;

    const hashedPassword = await bycrypt.hash(newPassword, 10);

    const sql = `UPDATE users SET password = ? WHERE username = ?`;

    db.run(sql, [hashedPassword, username], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ message: "Password updated."});
    });
});

module.exports = router;