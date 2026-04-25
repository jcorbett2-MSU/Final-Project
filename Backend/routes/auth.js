const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "User already exists" });
      }

      res.json({ message: "User created" });
    }
  );
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });

    if (!user) return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ error: "Invalid password" });

    res.json({ message: "Login success", userId: user.id });
  });
});

router.put("/change-password", async (req, res) => {
  const { username, newPassword } = req.body;

  const hashed = await bcrypt.hash(newPassword, 10);

  db.run(
    "UPDATE users SET password = ? WHERE username = ?",
    [hashed, username],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ message: "Password updated" });
    }
  );
});

module.exports = router;