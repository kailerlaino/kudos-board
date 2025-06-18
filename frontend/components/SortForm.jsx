import React from "react";
import "./SortForm.css";

function SortForm({ onCategoryChange, selectedCategory }) {
  return (
    <form className="sort-form">
      <select
        name="category-filter"
        value={selectedCategory || "All"}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Recent">Recent</option>
        <option value="Celebration">Celebration</option>
        <option value="Thank You">Thank You</option>
        <option value="Inspiration">Inspiration</option>
      </select>
    </form>
  );
}

export default SortForm;
