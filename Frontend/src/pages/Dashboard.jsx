import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");

  // Load recipes on page load
  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/recipes");
      setRecipes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addRecipe = async () => {
    if (!title || !ingredients || !instructions) {
      alert("Please fill out all required fields");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/recipes", {
        userId: localStorage.getItem("userId"),
        title,
        ingredients,
        instructions,
        category
      });

      // Clear inputs
      setTitle("");
      setIngredients("");
      setInstructions("");
      setCategory("");

      loadRecipes();
    } catch (err) {
      console.error(err);
      alert("Error adding recipe");
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/recipes/${id}`);
      loadRecipes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Dashboard</h2>

        {/* Add Recipe Form */}
        <h3>Add New Recipe</h3>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <input
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />

        <input
          placeholder="Category (optional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button onClick={addRecipe}>Add Recipe</button>

        {/* Recipe List */}
        <h3>Your Recipes</h3>

        {recipes.length === 0 ? (
          <p>No recipes yet.</p>
        ) : (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginTop: "10px",
                borderRadius: "5px"
              }}
            >
              <h4>{recipe.title}</h4>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              <p><strong>Category:</strong> {recipe.category}</p>

              <button onClick={() => deleteRecipe(recipe.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}