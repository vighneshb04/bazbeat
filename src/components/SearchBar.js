import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <div className="search-bar-container">
      <form onSubmit={onSearch} className="search-form">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search for a song or artist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" style={{ display: 'none' }}>Search</button>
      </form>
    </div>
  );
}