// use client
import React, { ChangeEvent } from 'react';

interface SearchBarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchInput, setSearchInput, placeholder = 'Search for class by name...' }) => {
  return (
    <input
      className="border text-maingrey border-bordercolor text-sm py-3 px-4 ml-40 w-full rounded"
      type="text"
      placeholder={placeholder}
      value={searchInput}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setSearchInput(e.target.value)
      }
    />
  );
};

export default SearchBar;
