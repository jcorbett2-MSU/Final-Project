import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    const res = await axios.get("http://localhost:3000/api/recipes");
    setRecipes(res.data);
    setFiltered(res.data);
  };

  useEffect(() => {
    let results = recipes;

    if (search) {
      results = results.filter(r =>
        r.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterCategory) {
      results = results.filter(r =>
        r.category.toLowerCase().includes(filterCategory.toLowerCase())
      );
    }

    setFiltered(results);
  }, [search, filterCategory, recipes]);

  const handleSubmit = async () => {
    if (!title || !ingredients || !instructions) {
      alert("All fields are required");
      return;
    }

    if (title.length < 3) {
      alert("Title must be at least 3 characters");
      return;
    }

    if (ingredients.length < 5) {
      alert("Ingredients too short");
      return;
    }

    if (instructions.length < 5) {
      alert("Instructions too short");
      return;
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:3000/api/recipes/${editId}`, {
          title,
          ingredients,
          instructions,
          category
        });
      } else {
        await axios.post("http://localhost:3000/api/recipes", {
          userId: localStorage.getItem("userId"),
          title,
          ingredients,
          instructions,
          category
        });
      }

      resetForm();
      loadRecipes();
    } catch (err) {
      alert("Error saving recipe");
    }
  };

  const resetForm = () => {
    setTitle("");
    setIngredients("");
    setInstructions("");
    setCategory("");
    setEditId(null);
  };

  const deleteRecipe = async (id) => {
    await axios.delete(`http://localhost:3000/api/recipes/${id}`);
    loadRecipes();
  };

  const startEdit = (recipe) => {
    setEditId(recipe.id);
    setTitle(recipe.title);
    setIngredients(recipe.ingredients);
    setInstructions(recipe.instructions);
    setCategory(recipe.category);
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Dashboard</h2>

        <input
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          placeholder="Filter by category..."
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        />

        <h3>{editId ? "Edit Recipe" : "Add Recipe"}</h3>

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
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {editId ? "Update Recipe" : "Add Recipe"}
        </button>

        {filtered.map((r) => (
          <div key={r.id} style={{ marginTop: "15px" }}>
            <strong>{r.title}</strong>

            <div>
              <button onClick={() => startEdit(r)}>Edit</button>
              <button onClick={() => deleteRecipe(r.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}