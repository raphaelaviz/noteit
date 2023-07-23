import React, { useState } from 'react'
import CodeSnippetCopyButton from './CodeSnippetCopyButton'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { NodeViewWrapper } from '@tiptap/react'

const CodeSnippet: React.FC = () => {
  const [code, setCode] = useState('')

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <NodeViewWrapper>
      <div className="relative bg-[#282c34] rounded-lg text-white">
        <div className="flex justify-between items-center rounded-lg bg-gray-900">
          <CodeSnippetCopyButton handleCopy={handleCopy} />
        </div>
        <textarea
          className="w-full h-32 text-white bg-transparent outline-none"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <SyntaxHighlighter
          language="tsx"
          style={oneDark}
          showLineNumbers
        ></SyntaxHighlighter>
      </div>
    </NodeViewWrapper>
  )
}

export default CodeSnippet
