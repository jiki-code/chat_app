'use client'
import * as React from 'react'
import Picker, { EmojiClickData } from 'emoji-picker-react' // avoid name clash

type Props = { onEmojiClick: (emoji: string) => void }

const EmojiButton: React.FC<Props> = ({ onEmojiClick }) => {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const handlePick = (d: EmojiClickData) => {
    onEmojiClick(d.emoji)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative inline-block">
      <button type="button" className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-gray-100"
              onClick={() => setOpen(v => !v)}>
        <span className="text-xl">😊</span>
      </button>
      {open && (
        <div className="absolute bottom-full right-0 mb-2 z-50 shadow-lg">
          <Picker onEmojiClick={handlePick} />
        </div>
      )}
    </div>
  )
}

export default EmojiButton
