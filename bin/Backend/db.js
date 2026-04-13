const sqlite3 = require("sqlite3").verbose();

// Connect to database
const db = new sqlite3.Database("./recipe.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to SQLite database (Final Project).");
  }
});

// Create tables if they do not exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      title TEXT,
      ingredients TEXT,
      instructions TEXT,
      category TEXT
    )
  `);
});

module.exports = db;