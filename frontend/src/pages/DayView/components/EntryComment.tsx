import { useEffect, useRef, useState } from 'react'
import { EntryProps } from './DayEntry'
import { useResizeTextArea } from '../../../hooks'
import { AppStyle } from '../../../config/style'
import { useSaveJournals } from '../../../hooks/useSaveJournals'
import { Entry, JournalDay } from '../../../types/ProjectTypes'

export const EntryComment = ({ entry, jDay }: EntryProps) => {
  const [comment, setComment] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const updateJournalDay = useSaveJournals().updateJournalDay

  useEffect(() => {
    setComment(entry.data.comment)
  }, [entry])

  const handleSaveComment = () => {
    const newEntry = {
      data: {
        ...entry.data,
        comment,
      },
    } as Entry
    const newEntries = [
      ...jDay.entries.filter((p) => p.data.id !== entry.data.id),
      newEntry,
    ].sort((a, b) => a.data.id - b.data.id)
    const newJDay = {
      ...jDay,
      entries: newEntries,
    } as JournalDay
    updateJournalDay(newJDay)
  }

  useResizeTextArea(textAreaRef.current, comment)

  return (
    <textarea
      className={AppStyle.inputStyle}
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      onBlur={handleSaveComment}
      placeholder="(optional) comment..."
      ref={textAreaRef}
      rows={1}
    />
  )
}
