import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/recipes")
        .then(res => setRecipes(res.data));
    }, []);

    return (
        <div>
      <h2>Dashboard</h2>
      {recipes.map(r => (
        <div key={r.id}>
          <h3>{r.title}</h3>
          <p>{r.ingredients}</p>
        </div>
      ))}
    </div>
    );
}