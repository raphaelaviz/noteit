'use client'

import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import ColorPickerGrid from './ColorPickerGrid'
import { Category } from '../page'
import { Session } from 'next-auth'
import { createCategory, createAssistance } from '../utis'

export interface NewAssistanceModalProps {
  categoriesProp: Category[]
  session: Session | null
}

const NewAssistanceModal: React.FC<NewAssistanceModalProps> = ({
  categoriesProp,
  session,
  
}) => {

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [categories] = useState<Category[]>(categoriesProp)
  const [newCategory, setNewCategory] = useState(false)
  const [categoryColor, setCategoryColor] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'new') {
      setNewCategory(true)
      setCategory('')
    } else {
      setNewCategory(false)
      setCategory(e.target.value)
    }
  }

  const handleColorSelect = (color: string) => {
    setCategoryColor(color)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    let categoryId = category

    if (newCategory) {
      // Create a new category
      const newCategoryData = await createCategory(category, categoryColor, session!.user.id)
      categoryId = newCategoryData.id
    }

    // Create a new assistance
    try {
      const data = await createAssistance(name, categoryId, session!.user.id)
      router.push(`/assistances/${data.id}`)
      router.refresh()

      setName('')
      setCategory('')
      setCategoryColor('')
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <dialog id="modal_new_assistance" className="modal modal-bottom sm:modal-middle">
      <form
        method="dialog"
        className="modal-box flex-col"
        onSubmit={handleSubmit}
      >
        <label className="text-gray-700">
          Assistance Name:
          <input
            type="text"
            maxLength={20}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-6 mt-3 w-full rounded bg-white p-2 text-gray-700 outline outline-gray-200"
          />
        </label>
        <label className="text-gray-700">
          Category:
          <select
            value={category}
            onChange={handleCategoryChange}
            className="mb-6 mt-3 w-full rounded bg-white p-2 text-gray-700 outline outline-gray-200"
          >
            <option value="" disabled selected className="text-gray-700">
              Choose a Category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
            <option value="new">
              Add new category
            </option>
          </select>

          {newCategory && (
            <input
              type="text"
              maxLength={20}
              value={category}
              placeholder="New category name"
              onChange={(e) => setCategory(e.target.value)}
              className="mb-6 mt-3 w-full rounded bg-white p-2 text-gray-700 outline outline-gray-200"
            />
          )}
        </label>

        {newCategory && (
          <div>
            <label className="mt-2 text-gray-700">
              Choose a color:
            </label>

            <ColorPickerGrid
              onColorSelect={handleColorSelect}
              selectedColor={categoryColor}
            />
          </div>
        )}
        <div className="flex justify-end">
          <button
            aria-label="submit"
            type="submit"
            className="mt-4 rounded border-2 border-slate-500 px-4 py-2 text-slate-800"
            disabled={
              !name ||
              (!newCategory && !category) ||
              (newCategory && (!category || !categoryColor)) ||
              isLoading
            }
          >
            {isLoading ? (
              <span className="loading loading-spinner text-secondary" />
            ) : (
              'Create Assistance'
            )}
          </button>
        </div>
      </form>
      {/* daisyUI component to make the modal close when clicked outside */}
      <form method="dialog" className="modal-backdrop">
        <button aria-label="close-modal" className="cursor-auto" />
      </form>
    </dialog>
  )
}

export default NewAssistanceModal
