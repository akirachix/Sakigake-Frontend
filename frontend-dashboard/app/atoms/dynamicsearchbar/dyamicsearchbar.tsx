'use client'
import React, { ChangeEvent } from 'react';

interface SearchBarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchInput, setSearchInput }) => {
  return (
    <input
      className="border border-greygrey ml-32 py-4 px-4 w-4/5 rounded"
      type="text"
      placeholder="Search for class by name..."
      value={searchInput}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setSearchInput(e.target.value)
      }
    />
  );
};

export default SearchBar;
