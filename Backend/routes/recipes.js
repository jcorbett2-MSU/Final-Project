const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
    const { userId, title, ingredients, instructions, category } = req.body;

    const sql = `
    INSERT INTO recipes (userId, title, ingredients, instructions, category)
    VALUES (?, ?, ?, ?, ?)
    `;

    db.run(sql, [userId, title, ingredients, instructions, category], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: "Recipe created", id: this.lastID });
    });
});

router.get("/", (req, res) => {
    const sql = "SELECT * FROM recipes";

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});

router.get("/:id", (req, res) => {
    const sql = "SELECT * FROM recipes WHERE id = ?";

    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(row);
    });
});

router.put("/:id", (req, res) => {
    const { title, ingredients, instructions, category } = req.body;

    const sql = `
    UPDATE recipes
    SET title = ?, ingredients = ?, instructions = ?, category = ?
    WHERE id = ?
    `;

    db.run(sql, [title, ingredients, instructions, category, req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: "Recipe updated", changes: this.changes });
    });
});

router.delete("/:id", (req, res) => {
    const sql = "DELETE FROM recipe WHERE id = ?";

    db.run(sql, [req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: "Recipe deleted", changes: this.changes });
    });
});

module.exports = router;