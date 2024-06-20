import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import DayEntry from './components/DayEntry'
import { Main } from '../../components'
import { useJournalDayStore, useJournalsStore } from '../../stores'
import { createNewYear } from '../../stores/useJournalsStore'
import { JournalDay } from '../../types/ProjectTypes'
import { useSaveJournals } from '../../hooks/useSaveJournals'

const DayView = () => {
  const { year: yearParam, month: monthParam, date: dateParam } = useParams()

  const journals = useJournalsStore((s) => s.journals)
  const saveActions = useSaveJournals()
  const upsertJournalYear = useJournalsStore((s) => s.upsertJournalYear)

  const { year: jYear, entries } = useJournalDayStore((s) => s.journal) ?? {}
  const addDayEntry = saveActions.addDayEntry
  const setJournal = useJournalDayStore((s) => s.set)

  const [view, setView] = useState<JournalDay>()

  useEffect(() => {
    if (yearParam) {
      const y = parseInt(yearParam)
      if (y !== jYear) {
        const j = journals.find((p) => p.year === y) ?? createNewYear(y)
        upsertJournalYear(j)
        setJournal(j)
        console.log(`New journal set ${y}`)
      }
    }
  }, [jYear, journals, setJournal, upsertJournalYear, yearParam])

  useEffect(() => {
    if (entries && monthParam && dateParam) {
      const [m, d] = [parseInt(monthParam), parseInt(dateParam)]
      const dayEntry = entries.find((p) => p.month === m && p.date === d)
      if (!dayEntry) {
        console.log('Day not found, adding day entry')
        addDayEntry(m, d)
      }
    }
  }, [monthParam, dateParam, jYear, entries, addDayEntry])

  useEffect(() => {
    if (entries && monthParam && dateParam) {
      const [m, d] = [parseInt(monthParam), parseInt(dateParam)]
      setView(entries.find((p) => p.month === m && p.date === d))
    }
  }, [dateParam, entries, monthParam])

  return (
    <Main
      backLink={`${import.meta.env.BASE_URL}?month=${
        parseInt(monthParam ?? '0') - 1
      }&year=${jYear}`}>
      {view ? (
        <>
          <h2 className="font-bold text-2xl">
            {view.date}/{view.month}/{yearParam}
          </h2>
          {view.entries.map((e) => (
            <DayEntry key={e.data.id} entry={e} jDay={view} />
          ))}
        </>
      ) : (
        <p>None found</p>
      )}
    </Main>
  )
}

export default DayView
