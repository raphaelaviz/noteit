import React from 'react'

interface SearchBarProps {
  handleSearchChange: (searchTerm: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearchChange }) => {
  return (
    <div className="ml-4">
      <input
        type="text"
        placeholder="Search an assistance..."
        className="min-w-[300px] rounded-full border-primary px-3 py-2 outline-none"
        onChange={(e) => handleSearchChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
