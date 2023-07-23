import React from 'react'
import SearchBar from './SearchBar'
import { Category } from './Panel'

interface FiltersBarProps {
  categories: Category[]
  handleCategoryClick: (categoryId: string | null) => void
  selectedCategoryFilter: string | null
  handleSearchChange: (searchTerm: string) => void
}

const FiltersBar: React.FC<FiltersBarProps> = ({
  categories,
  handleCategoryClick,
  selectedCategoryFilter,
  handleSearchChange,
}) => {

  return (
    <div className="relative space-y-4">
      <div className="flex justify-between divide-x-2 divide-gray-600 p-4">
        <div className="my-scrollable-div mr-4 flex space-x-3 overflow-x-auto">
          <button
            style={{ backgroundColor: '#d6d6cd', minWidth: '120px' }}
            onClick={() => handleCategoryClick(null)}
            className={`pill-button ${selectedCategoryFilter === null ? 'border-black font-extrabold' : ''}`}
          >
            All assistances
          </button>

          {categories.map((category: Category) => (
            <button
              key={category.id}
              style={{ backgroundColor: category.color, minWidth: '80px' }}
              onClick={() => handleCategoryClick(category.id)}
              className={`pill-button ${selectedCategoryFilter === category.id ? 'border-black font-extrabold' : ''}`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div>
          <SearchBar handleSearchChange={handleSearchChange} />
        </div>
      </div>
    </div>
  )
}

export default FiltersBar
