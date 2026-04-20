const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const recipeRoutes = require("./routes/recipes");
const authRoutes = require("./routes/auth");

app.use("/api/recipes", recipeRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => 
    {
        console.log(`Final Project Server running at http://localhost:${PORT}`);
    })

app.get("/", (req, res) => {
    res.send("Final Project API is running.");
});