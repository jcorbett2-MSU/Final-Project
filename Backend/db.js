const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./recipe.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

db.run("PRAGMA foreign_keys = ON");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      title TEXT,
      ingredients TEXT,
      instructions TEXT,
      category TEXT,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);
});

module.exports = db;