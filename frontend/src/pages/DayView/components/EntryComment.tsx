import { useEffect, useRef, useState } from 'react'
import { EntryProps } from './DayEntry'
import { useJournalDayStore } from '../../../stores'
import { useResizeTextArea } from '../../../hooks'
import { AppStyle } from '../../../config/style'

export const EntryComment = ({ entry, jDay }: EntryProps) => {
  const [comment, setComment] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const updateJournalDay = useJournalDayStore((s) => s.updateJournalDay)

  useEffect(() => {
    setComment(entry.data.comment)
  }, [entry])

  const handleSaveComment = () => {
    const newEntry = {
      meta: {
        ...entry.meta,
        dateEdited: new Date().getTime(),
      },
      data: {
        ...entry.data,
        comment,
      },
    }
    const newEntries = [
      ...jDay.entries.filter((p) => p.data.id !== entry.data.id),
      newEntry,
    ].sort((a, b) => a.data.id - b.data.id)
    const newJDay = {
      ...jDay,
      entries: newEntries,
    }
    updateJournalDay(newJDay)
  }

  useResizeTextArea(textAreaRef.current, comment)

  return (
    <textarea
      className={`resize-none border-b-4 ${AppStyle.primaryBorder} ${AppStyle.whiteBg} rounded p-1`}
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      onBlur={handleSaveComment}
      placeholder="(optional) comment..."
      ref={textAreaRef}
      rows={1}
    />
  )
}
