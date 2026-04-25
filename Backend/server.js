const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const recipeRoutes = require("./routes/recipes");
const authRoutes = require("./routes/auth");

app.use("/api/recipes", recipeRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});