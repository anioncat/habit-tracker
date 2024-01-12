import { useState, useEffect } from 'react'

import { Angry, Frown, Laugh, Meh, Smile } from "lucide-react"

import { ScaleButton } from "./ScaleButton"
import { ScaleContainer } from "./scaleStyle"
import { useJournalDayStore } from '/src/stores'
import { Entry, JournalDay, Scale } from "/src/types/ProjectTypes"

type ScaleProps = {
  entry: Entry
  jDay: JournalDay
}

const ScaleEntry = ({ entry, jDay }: ScaleProps) => {
  const updateJournalDay = useJournalDayStore(s => s.updateJournalDay)

  const [selected, setSelected] = useState<number>()

  useEffect(() => {
    setSelected(entry.data.data as Scale)
  }, [entry, jDay])

  const selectButton = (newSelected: number) => {
    const newScale = newSelected === selected ? null : newSelected
    const newEntry = {
      meta: {
        ...entry.meta,
        dateEdited: new Date().getTime()
      },
      data: {
        ...entry.data,
        data: newScale as Scale,
      }
    }
    const newEntries = [...jDay.entries.filter(p => p.data.id !== entry.data.id), newEntry].sort((a, b) => a.data.id - b.data.id)
    const newJDay = {
      ...jDay,
      entries: newEntries
    }
    updateJournalDay(newJDay)
  }

  const iconSize = '4em'

  const scaleIcons = [
    <Angry size={iconSize} />,
    <Frown size={iconSize} />,
    <Meh size={iconSize} />,
    <Smile size={iconSize} />,
    <Laugh size={iconSize} />
  ]

  return <ScaleContainer>
    {scaleIcons.map((s, i) => <ScaleButton
      key={i}
      order={i}
      selected={selected === i}
      onClick={() => selectButton(i)}
    >{s}</ScaleButton>)}
  </ScaleContainer>
}

export default ScaleEntry
