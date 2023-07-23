'use client'

import { FaTrashAlt } from 'react-icons/fa'

declare const modal_delete_assistance: any // DaisyUI function

export const DeleteAssistanceButton = () => {
  return (
    <div
      className="tooltip tooltip-top absolute bottom-0 right-0 mb-4 mr-10"
      data-tip="Delete Assistance"
    >
      <button
        aria-label='delete-assistance'
        className="flex-center rounded-md border-secondary bg-red-500 p-3
                  text-2xl text-white transition-transform hover:scale-110 "
        onClick={() => modal_delete_assistance.showModal()}
      >
        <FaTrashAlt />
      </button>
    </div>
  )
}
