import React from "react";
import SearchBar from "./SearchBar";

export default function Header({ onSearch }) {
  return (
    <header className="glass-header">
      <h2>🎵 BazBeat</h2>
      <SearchBar onSearch={onSearch} />
    </header>
  );
}
