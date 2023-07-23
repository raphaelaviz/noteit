'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { Assistance } from './Panel'
import { DeleteCategoryModal } from './DeleteCategoryModal'
import { deleteAssistance } from '../utis'

declare const modal_delete_category: any // DaisyUI function

export interface DeleteAssistanceModalProps {
  assistance: Assistance
}

export const DeleteAssistanceModal: React.FC<DeleteAssistanceModalProps> = ({
  assistance,
}) => {
  const router = useRouter()

  const handleDeleteAssistance = async () => {
    const deleted = await deleteAssistance(assistance.id, assistance.categoryId)

    if (deleted && deleted.categoryIsEmpty) {
      modal_delete_category.showModal()
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <dialog id="modal_delete_assistance" className="modal modal-bottom sm:modal-middle">
      <DeleteCategoryModal categoryToDelete={assistance.categoryId} />
      <form method="dialog" className="modal-box">
        <h3 className="text-lg font-bold">
          Are you absolutely sure?
        </h3>
        <p className="py-4">
          This action can not be undone. This will permanently delete the
          assistance from our servers.
        </p>
        <div className="modal-action">
          <button id="cancel" className="btn">
            Cancel
          </button>
          <button
            id='delete_assistance'
            onClick={handleDeleteAssistance}
            className="btn bg-red-200 text-red-500"
          >
            Delete Assistance
          </button>
        </div>
      </form>
    </dialog>
  )
}
