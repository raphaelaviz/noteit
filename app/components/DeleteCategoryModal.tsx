'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { deleteCategory } from '../utis'

export interface DeleteCategoryModalProps {
  categoryToDelete: string | null
}

export const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
  categoryToDelete,
}) => {
  const router = useRouter()

  const handleKeepCategory = () => {
    router.push('/')
    router.refresh()
  }

  const handleDeleteCategory = async () => {
    const deleted = await deleteCategory(categoryToDelete)

    if (deleted) {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <dialog id="modal_delete_category" className="modal modal-bottom sm:modal-middle">
      <form method="dialog" className="modal-box">
        <h3 className="text-lg font-bold">
          This was the last one.
        </h3>
        <p className="py-4">
          This was the last assistance in the category. Do you wish to delete
          the category as well?
        </p>
        <div className="modal-action">
          <button id="keep_category" onClick={handleKeepCategory} className="btn">
            Keep the Category
          </button>
          <button
            id="delete_category"
            onClick={handleDeleteCategory}
            className="btn bg-red-200 text-red-500"
          >
            Delete Category
          </button>
        </div>
      </form>
    </dialog>
  )
}
