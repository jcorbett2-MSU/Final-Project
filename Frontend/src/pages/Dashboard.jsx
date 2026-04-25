import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    const res = await axios.get("http://localhost:3000/api/recipes");
    setRecipes(res.data);
  };

  const addRecipe = async () => {
    await axios.post("http://localhost:3000/api/recipes", {
      userId: 1,
      title,
      ingredients: "test",
      instructions: "test",
      category: "test"
    });

    loadRecipes();
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <input onChange={e => setTitle(e.target.value)} placeholder="Recipe name" />
      <button onClick={addRecipe}>Add Recipe</button>

      {recipes.map(r => (
        <div key={r.id}>{r.title}</div>
      ))}
    </div>
  );
}