import { Editor } from '@tiptap/core'
import { FloatingMenu } from '@tiptap/react'
import './editorStyle.css'
import { ComponentProps, ReactNode } from 'react'
import Image from 'next/image'

export interface FloatingButtonProps extends ComponentProps<'button'> {
  children: ReactNode
}
interface EditorFloatingMenuProps {
  editor: Editor
  deleteLastCharacter: () => void
}

const EditorFloatingMenu: React.FC<EditorFloatingMenuProps> = ({
  editor,
  deleteLastCharacter,
}) => (
  <FloatingMenu
    className="flex flex-col overflow-hidden border-primary bg-zinc-50 px-1 py-2"
    editor={editor}
    shouldShow={({ state }) => {
      const { $from } = state.selection
      const currentLineText = $from.nodeBefore?.textContent
      return currentLineText === '.'
    }}
  >
    <FloatingButton
      onClick={() => {
        editor.chain().focus().toggleHeading({ level: 1 }).run()
        deleteLastCharacter()
      }}
    >
      <Image
        width={48}
        height={48}
        src="http://www.notion.so/images/blocks/header.57a7576a.png"
        alt="Heading 1"
        className="rounded border border-zinc-600"
      />
      <div className="flex flex-col text-left">
        <span className="text-sm">
          Heading 1
        </span>
        <span className="text-xs text-zinc-400">
          Big section heading.
        </span>
      </div>
    </FloatingButton>

    <FloatingButton
      onClick={() => {
        editor.chain().focus().toggleHeading({ level: 2 }).run()
        deleteLastCharacter()
      }}
    >
      <Image
        width={48}
        height={48}
        src="http://www.notion.so/images/blocks/subheader.9aab4769.png"
        alt="Heading 2"
        className="rounded border border-zinc-600"
      />
      <div className="flex flex-col text-left">
        <span className="text-sm">
          Heading 2
        </span>
        <span className="text-xs text-zinc-400">
          Medium section heading.
        </span>
      </div>
    </FloatingButton>

    <FloatingButton
      onClick={() => {
        editor.chain().focus().toggleCodeBlock().run()
        deleteLastCharacter()
      }}
      data-active={editor.isActive('codeblock')}
    >
      <Image
        width={48}
        height={48}
        src="http://www.notion.so/images/blocks/code.a8b201f4.png"
        alt="Code block"
        className="rounded border border-zinc-600"
      />
      <div className="flex flex-col text-left">
        <span className="text-sm">
          Code Snippet
        </span>
        <span className="text-xs text-zinc-400">
          Write useful code snippets.
        </span>
      </div>
    </FloatingButton>

    <FloatingButton
      onClick={() => {
        editor.chain().focus().toggleBulletList().run()
        deleteLastCharacter()
      }}
      data-active={editor.isActive('bulletlist')}
    >
      <Image
        width={48}
        height={48}
        src="http://www.notion.so/images/blocks/bulleted-list.0e87e917.png"
        alt="Bulleted List"
        className="rounded border border-zinc-600"
      />
      <div className="flex flex-col text-left">
        <span className="text-sm">
          Bulleted List
        </span>
        <span className="text-xs text-zinc-400">
          Create a simple bulleted list.
        </span>
      </div>
    </FloatingButton>

    <FloatingButton
      onClick={() => {
        editor.chain().focus().toggleOrderedList().run()
        deleteLastCharacter()
      }}
      data-active={editor.isActive('orderedlist')}
    >
      <Image
        width={48}
        height={48}
        src="http://www.notion.so/images/blocks/numbered-list.0406affe.png"
        alt="Ordered List"
        className="rounded border border-zinc-600"
      />
      <div className="flex flex-col text-left">
        <span className="text-sm">
          Ordered List
        </span>
        <span className="text-xs text-zinc-400">
          Create a simple ordered list.
        </span>
      </div>
    </FloatingButton>
  </FloatingMenu>
)

export default EditorFloatingMenu

export function FloatingButton(props: FloatingButtonProps) {
  return (
    <button
      aria-label="floating-button"
      className="flex items-center gap-2 rounded p-1 hover:bg-zinc-200"
      {...props}
    />
  )
}
