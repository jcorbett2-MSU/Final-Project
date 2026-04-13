# Final Project - Recipe Management Application
# Database Schema

Database Name: recipe.db

---

## Table: users

Columns:
- id (INTEGER, PRIMARY KEY, AUTOINCREMENT)
- username (TEXT)
- password (TEXT)

JSON Format:
{
  id: int,
  username: string,
  password: string
}

---

## Table: recipes

Columns:
- id (INTEGER, PRIMARY KEY, AUTOINCREMENT)
- userId (INTEGER)
- title (TEXT)
- ingredients (TEXT)
- instructions (TEXT)
- category (TEXT)

JSON Format:
{
  id: int,
  userId: int,
  title: string,
  ingredients: string,
  instructions: string,
  category: string
}