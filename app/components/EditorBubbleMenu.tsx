import { BubbleMenu, Editor } from '@tiptap/react'
import './editorStyle.css'
import { AiOutlineHighlight } from 'react-icons/ai'
import { RxFontBold, RxFontItalic, RxUnderline } from 'react-icons/rx'
import { ComponentProps, ReactNode } from 'react'

export interface BubbleButtonProps extends ComponentProps<'button'> {
  children: ReactNode
}

interface EditorBubbleMenuProps {
  editor: Editor
}

const EditorBubbleMenu: React.FC<EditorBubbleMenuProps> = ({ editor }) => (
  <BubbleMenu
    editor={editor}
    className="flex justify-around space-x-1 overflow-hidden"
  >
    <BubbleButton
      onClick={() => editor.chain().focus().toggleBold().run()}
      data-active={editor.isActive('bold')}
      style={{ backgroundColor: '#FFD6E3' }}
    >
      <RxFontBold />
    </BubbleButton>

    <BubbleButton
      onClick={() => editor.chain().focus().toggleItalic().run()}
      data-active={editor.isActive('italic')}
      style={{ backgroundColor: '#A2DBFA' }}
    >
      <RxFontItalic />
    </BubbleButton>

    <BubbleButton
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      data-active={editor.isActive('underline')}
      style={{ backgroundColor: '#C3F0CA' }}
    >
      <RxUnderline />
    </BubbleButton>

    <BubbleButton
      onClick={() => editor.commands.toggleHighlight({ color: '#74c0fc' })}
      data-active={editor.isActive('highlight')}
      style={{ backgroundColor: '#F6D6AD' }}
    >
      <AiOutlineHighlight />
    </BubbleButton>
  </BubbleMenu>
)

export default EditorBubbleMenu

export function BubbleButton(props: BubbleButtonProps) {
  return (
    <button
      className={
        'flex-center h-12 w-12 rounded-full text-sm text-gray-700 hover:text-zinc-50 data-[active=true]:border-2 data-[active=true]:border-gray-700'
      }
      {...props}
    />
  )
}
