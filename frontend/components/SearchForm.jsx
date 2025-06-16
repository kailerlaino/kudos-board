import React from 'react'
import './SearchForm.css'

function SearchForm({ searchMovies, handleClear, query }) {

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const queryString = formData.get('query')
    if (!queryString.trim()) {
        // TODO: Return all if 
      alert('Should return all.');
      return;
    }
    // searchBoards(queryString)
    event.target.reset();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} >
      <input className="search-input" type="text" name="query" placeholder={query ? `${query}` :"Search boards"} />
      <button className="search-button" type="submit" >Search</button>
      <button className="clear-button" type="button" onClick={handleClear}>Clear</button>
    </form>
  );
}

export default SearchForm
