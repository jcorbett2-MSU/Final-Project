const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.all("SELECT * FROM recipes", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { userId, title, ingredients, instructions, category } = req.body;

  db.run(
    "INSERT INTO recipes (userId, title, ingredients, instructions, category) VALUES (?, ?, ?, ?, ?)",
    [userId, title, ingredients, instructions, category],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

router.put("/:id", (req, res) => {
  const { title, ingredients, instructions, category } = req.body;

  db.run(
    "UPDATE recipes SET title=?, ingredients=?, instructions=?, category=? WHERE id=?",
    [title, ingredients, instructions, category, req.params.id],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated" });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.run("DELETE FROM recipes WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
});

module.exports = router;