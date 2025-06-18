import React from "react";
import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch, onClear, currentQuery }) {
  const [query, setQuery] = useState(currentQuery || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    onSearch(trimmedQuery);
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        name="query"
        value={query}
        onChange={handleInputChange}
        placeholder="Search boards by title..."
      />
      <button className="search-button" type="submit">
        Search
      </button>
      <button className="clear-button" type="button" onClick={handleClear}>
        Clear
      </button>
    </form>
  );
}

export default SearchForm;
