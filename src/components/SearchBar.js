import React, { useState } from "react";
import { searchTracks } from "../spotify";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("spotify_token");
    if (!token) {
      alert("Please add your Spotify token to localStorage");
      return;
    }
    if (query) {
      onSearch(await searchTracks(query, token));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Search songs..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">🔍</button>
    </form>
  );
}
