'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { lowlight } from 'lowlight'
import js from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/paraiso-dark.css'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Document from '@tiptap/extension-document'
import { AiFillSave, AiFillCheckCircle } from 'react-icons/ai'
import { HiLockClosed, HiLockOpen } from 'react-icons/hi'
import { CustomCodeBlock } from './CustomCodeBlock'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import EditorBubbleMenu from './EditorBubbleMenu'
import EditorFloatingMenu from './EditorFloatingMenu'
import { Assistance } from './Panel'
import './editorStyle.css'
import { useSession } from 'next-auth/react'
import {Toaster} from 'react-hot-toast'
import { updateAssistance } from '../utis'

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

interface EditorProps {
  assistance: Assistance
}

const Editor: React.FC<EditorProps> = ({ assistance }) => {

  const { data: session } = useSession()
  const [isEditorEditable, setIsEditorEditable] = useState(
    !assistance.editorContent,
  )

  const [saveButtonClick, setSaveButtonClick] = useState(false)

  const editorConfig = {
    extensions: [
      Document.extend({ content: 'heading block*' }),
      StarterKit.configure({ document: false }),
      CustomCodeBlock.configure({ lowlight }),
      Highlight.configure({ multicolor: true }),
      Underline,
      Image.configure({
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Untitled'
          }

          if (node.type.name === 'codeBlock') {
            return ''
          }

          return "Type '.' to see commands..."
        },
      }),
    ],
    content: assistance.editorContent,
    autofocus: true,
    editorProps: {
      attributes: {
        spellcheck: 'false',
        class: 'outline-none',
      },
    },
    editable: isEditorEditable,
  }

  const editor = useEditor(editorConfig)

  const router = useRouter()

  const handleSaveButton = async () => {
    setSaveButtonClick(true)
    setTimeout(() => {
      setSaveButtonClick(false)
    }, 2000)

    if (editor) {
      const editorContent = editor.getJSON()
      const response = await updateAssistance(assistance.id, editorContent)

      if (!response.ok) {
        console.error('Failed to save editor content')
      }
      router.refresh()
    }
  }

  const deleteLastCharacter = () => {
    const editorTransaction = editor!.state.tr
    const currentCursorPosition = editorTransaction.selection.anchor
    const deletionTransaction = editorTransaction.delete(
      currentCursorPosition - 1,
      currentCursorPosition,
    )
    editor!.view.dispatch(deletionTransaction)
  }

  return (
    <div className="relative w-full bg-gray-200">
      <EditorContent
        editor={editor}
        className="prose mx-auto lg:max-w-[700px] max-w-full min-h-screen border-[3px] border-b-8 border-r-8 border-gray-700 bg-gray-50 p-2 px-6 pt-4"

      >
        {session && <div className="flex items-center justify-end space-x-2">
          {isEditorEditable ? (
            <div className="tooltip tooltip-top" data-tip="Lock Content">
              <button
                onClick={() => {
                  setIsEditorEditable(false)
                  editor!.setEditable(false)
                }}
                className="rounded-md border-secondary p-2 text-3xl transition-transform hover:scale-110"
              >
                <HiLockOpen className="text-green-500" />
              </button>
            </div>
          ) : (
            <div className="tooltip tooltip-top" data-tip="Unlock Content">
              <button
                onClick={() => {
                  setIsEditorEditable(true)
                  editor!.setEditable(true)
                }}
                className="rounded-md border-secondary p-2 text-3xl transition-transform hover:scale-110"
              >
                <HiLockClosed className="text-red-400" />
              </button>
            </div>
          )}

          <div className="tooltip tooltip-top" data-tip="Save Content">
            <button
              onClick={handleSaveButton}
              className={
                'rounded-md border-secondary p-2 text-3xl transition-transform hover:scale-110'
              }
            >
              {saveButtonClick ? (
                <AiFillCheckCircle className="text-green-500" />
              ) : (
                <AiFillSave className="text-blue-400" />
              )}
            </button>
          </div>
        </div>}
      </EditorContent>

      {editor && (
        <>
          <EditorFloatingMenu
            editor={editor}
            deleteLastCharacter={deleteLastCharacter}
          />
          <EditorBubbleMenu editor={editor} />
        </>
      )}
      <Toaster
        toastOptions={{
          className: '',
          style: {
            border: '2px solid #1f2937',
            borderBottom: '4px solid #1f2937',
            borderRightWidth: '4px'
          },
      }}/>
    </div>
  )
}

export default Editor
