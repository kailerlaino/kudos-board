import React from "react";
import "./SortBy.css";

function SortBy({ changeSortType }) {
  return (
    <form>
      <select name="sortBy" onChange={(e) => changeSortType(e.target.value)}>
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

export default SortBy;
