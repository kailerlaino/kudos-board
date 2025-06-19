import React from "react";
import "./CreateCardForm.css";
import { useState, useEffect } from "react";

function CreateCardForm({ boardId, onSuccess, onClose }) {
  const [cardData, setCardData] = useState({
    title: "",
    content: "",
    author: "",
    gifUrl: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [gifOptions, setGifOptions] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    document.body.classList.add("active-modal");
    return () => {
      document.body.classList.remove("active-modal");
    };
  }, []);

  const apiKey = import.meta.env.VITE_GIPHY_API_KEY;

  const searchGifs = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchQuery}&limit=5`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch GIFs");
      }
      const gifData = await response.json();
      const gifUrls = gifData.data.map((gif) => gif.images.original.url);
      setGifOptions(gifUrls);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCard(cardData);
  };

  const handleSelectGif = (gifUrl) => {
    setCardData({ ...cardData, gifUrl });
    setGifOptions([]); 
  };

  const createCard = async (cardData) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/boards/${boardId}/cards`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cardData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create card");
      }
      onSuccess();
      setCardData({ title: "", content: "", author: "", gifUrl: "" });
      onClose();
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  return (
    <div className="overlay">
      <form className="new-card-form" onSubmit={handleSubmit}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Create new card</h2>
        <input
          className="card-title-input"
          type="text"
          value={cardData.title}
          placeholder="Enter card title"
          onChange={(e) => setCardData({ ...cardData, title: e.target.value })}
          required
        ></input>
        <input
          className="card-content-input"
          type="text"
          value={cardData.content}
          placeholder="Enter card content"
          onChange={(e) =>
            setCardData({ ...cardData, content: e.target.value })
          }
          required
        ></input>
        <input
          className="card-gif-search-input"
          type="text"
          value={searchQuery}
          placeholder="Search for GIFs"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        ></input>
        <button
          type="button"
          className="search-gif-button"
          onClick={() => searchGifs(searchQuery)}
        >Search</button>
        {gifOptions.length > 0 && (
          <div className="gif-options">
            {gifOptions.map((gifUrl, index) => (
              <img
                key={index}
                src={gifUrl}
                alt={`GIF ${index + 1}`}
                className="gif-option"
                onClick={() => handleSelectGif(gifUrl)}
              />
            ))}
          </div>
        )

        }
        <input
          className="card-gif-input"
          type="text"
          value={cardData.gifUrl}
          placeholder="Enter GIF URL"
          onChange={(e) => setCardData({ ...cardData, gifUrl: e.target.value })}
          required
        ></input>
        <input
          className="card-author-input"
          type="text"
          value={cardData.author}
          placeholder="Enter author (optional)"
          onChange={(e) => setCardData({ ...cardData, author: e.target.value })}
        ></input>
        <button type="submit" className="submit">
          Create Card
        </button>
      </form>
    </div>
  );
}

export default CreateCardForm;
