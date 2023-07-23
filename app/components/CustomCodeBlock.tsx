import { FiCopy } from 'react-icons/fi'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createRoot } from 'react-dom/client'
import toast from 'react-hot-toast'

export const CustomCodeBlock = CodeBlockLowlight.extend({
  addKeyboardShortcuts() {
    return {
      'Shift-Alt-c': () => this.editor.commands.toggleCodeBlock(),
    }
  },

  addNodeView() {
    return () => {
      const container = document.createElement('div')
      container.style.position = 'relative'

      const codeContent = document.createElement('pre')
      const content = document.createElement('code')
      content.className = 'language-ts'
      codeContent.appendChild(content)

      const copyButtonContainer = document.createElement('div')
      copyButtonContainer.style.position = 'absolute'
      copyButtonContainer.style.top = '5px'
      copyButtonContainer.style.right = '10px'
      copyButtonContainer.style.marginTop = '7px'
      container.append(codeContent)
      container.append(copyButtonContainer)

      const root = createRoot(copyButtonContainer)
      root.render(
        
        <button
          onClick={(event) => {
              event.stopPropagation()
              const codeText = content.textContent || ''
              navigator.clipboard.writeText(codeText)
              toast.success("Copied!",{
                position: 'bottom-center'
              })
            }}
            style={{
              color: 'white',
              backgroundColor: 'transparent',
              border: 'none',
            }}
          >
          <FiCopy size={18} />
        </button>
      )
      
      return {
        dom: container,
        contentDOM: content,
        destroy() {
          root.unmount()
        },
      }
    }
  },
})
