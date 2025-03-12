import React from "react";


const CategoryBar = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="category-bar">
      <button onClick={() => setSelectedCategory("all")} className={selectedCategory === "all" ? "active" : ""}>
        Todas
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={selectedCategory === category ? "active" : ""}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
