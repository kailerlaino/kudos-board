import React from "react";
import "./SortForm.css";

function SortForm({ onCategoryChange, selectedCategory }) {
  return (
    <form className="sort-form">
      <select name="sort-by" onChange={(e) => changeSortType(e.target.value)}>
        <option>Sort By</option>
        <option value="">All</option>
        <option value="">Recent</option>
        <option value="">Celebration</option>
        <option value="">Thank You</option>
        <option value="">Inspiration</option>
      </select>
    </form>
  );
}

export default SortForm;
