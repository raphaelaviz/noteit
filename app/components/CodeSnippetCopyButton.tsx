import { BiCopy } from 'react-icons/bi'
import { AiOutlineCheck } from 'react-icons/ai'
import React, { useState, useEffect } from 'react'

interface CodeSnippetCopyButtonProps {
  handleCopy: () => void
}

const CodeSnippetCopyButton: React.FC<CodeSnippetCopyButtonProps> = ({
  handleCopy,
}) => {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    handleCopy()
    setCopied(true)
  }

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 2500)
    }
  }, [copied])

  return (
    <button
      className="rounded-md p-3 text-white hover:bg-gray-600 focus:outline-none"
      onClick={handleClick}
    >
      {copied ? <AiOutlineCheck /> : <BiCopy />}
    </button>
  )
}

export default CodeSnippetCopyButton
