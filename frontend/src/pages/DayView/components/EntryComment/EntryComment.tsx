import { useEffect, useRef, useState } from "react"
import { EntryProps } from "../DayEntry/DayEntry"
import { CommentTextAreaClass } from "./entryCommentStyle"
import { useJournalDayStore } from "/src/stores"
import { useResizeTextArea } from "/src/hooks"

export const EntryComment = ({ entry, jDay }: EntryProps) => {
  const [comment, setComment] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const updateJournalDay = useJournalDayStore(s => s.updateJournalDay)

  useEffect(() => {
    setComment(entry.data.comment)
  }, [entry])

  const handleSaveComment = () => {
    const newEntry = {
      meta: {
        ...entry.meta,
        dateEdited: new Date().getTime()
      },
      data: {
        ...entry.data,
        comment: comment
      }
    }
    const newEntries = [...jDay.entries.filter(p => p.data.id !== entry.data.id), newEntry].sort((a, b) => a.data.id - b.data.id)
    const newJDay = {
      ...jDay,
      entries: newEntries
    }
    updateJournalDay(newJDay)
  }

  useResizeTextArea(textAreaRef.current, comment)

  return <textarea
    className={CommentTextAreaClass()}
    value={comment}
    onChange={e => setComment(e.target.value)}
    onBlur={handleSaveComment}
    placeholder='(optional) comment...'
    ref={textAreaRef}
    rows={1}
  />
}
