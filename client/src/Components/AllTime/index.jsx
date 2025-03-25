import { useEffect, useState } from "react";

function TopCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/top-categories")  // Fetch from Flask API
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div>
      <h2>Top 10 Categories by Sales</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            {category["Category"]} - Total Sales: ${category["Sales"].toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopCategories;
