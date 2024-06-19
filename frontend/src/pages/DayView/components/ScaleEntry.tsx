import { useState, useEffect } from 'react'

import { Angry, Frown, Laugh, Meh, Smile } from 'lucide-react'

import { ScaleButton } from './ScaleButton'
import { Entry, JournalDay, Scale } from '../../../types/ProjectTypes'
import { useSaveJournals } from '../../../hooks/useSaveJournals'

type ScaleProps = {
  entry: Entry
  jDay: JournalDay
}

const ScaleEntry = ({ entry, jDay }: ScaleProps) => {
  const updateJournalDay = useSaveJournals().updateJournalDay

  const [selected, setSelected] = useState<number | null>()

  useEffect(() => {
    setSelected(entry.data.data as Scale)
  }, [entry, jDay])

  const selectButton = (newSelected: number) => {
    const newScale = newSelected === selected ? null : newSelected
    const newEntry = {
      data: {
        ...entry.data,
        data: newScale as Scale,
      },
    } as Entry
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

  const iconSize = '4em'

  const scaleIcons = [
    <Angry key="0" size={iconSize} />,
    <Frown key="1" size={iconSize} />,
    <Meh key="2" size={iconSize} />,
    <Smile key="3" size={iconSize} />,
    <Laugh key="4" size={iconSize} />,
  ]

  const ScaleContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-row items-center justify-around">{children}</div>
  )

  return (
    <ScaleContainer>
      {scaleIcons.map((s, i) => (
        <ScaleButton
          key={i}
          order={i}
          selected={selected === i}
          onClick={() => selectButton(i)}>
          {s}
        </ScaleButton>
      ))}
    </ScaleContainer>
  )
}

export default ScaleEntry
