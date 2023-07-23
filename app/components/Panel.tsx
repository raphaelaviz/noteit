'use client'

import React, { useState } from 'react'
import AssistancesGrid from './AssistancesGrid'
import FiltersBar from './FiltersBar'

export interface Category {
  id: string
  name: string
  color: string
}

export interface Assistance {
  id: string
  name: string
  Category: Category | null
  categoryId: string | null
  editorContent: any
}

interface PanelProps {
  assistancesProp: Assistance[]
  categories: Category[]
}

const Panel: React.FC<PanelProps> = ({ assistancesProp, categories }) => {
  const [assistances] = useState<Assistance[]>(assistancesProp)
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategoryFilter(categoryId)
  }

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm.toLowerCase())
  }

  const filteredAssistances = assistances
    .filter((assistance) => selectedCategoryFilter
      ? assistance.Category?.id === selectedCategoryFilter : true)
    .filter((assistance) => assistance.name.toLowerCase().includes(searchTerm))

  return (
    <div>
      <FiltersBar
        categories={categories}
        handleCategoryClick={handleCategoryClick}
        selectedCategoryFilter={selectedCategoryFilter}
        handleSearchChange={handleSearchChange}
      />
      <AssistancesGrid assistances={filteredAssistances} />
    </div>
  )
}

export default Panel
