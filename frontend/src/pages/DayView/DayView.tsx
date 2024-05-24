import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

import { ChevronLeft } from 'lucide-react'
import DayEntry from './components/DayEntry'
import { Button, Header, Main } from '../../components'
import { useJournalDayStore, useJournalsStore } from '../../stores'
import { createNewYear } from '../../stores/useJournalsStore'
import { JournalDay } from '../../types/ProjectTypes'

const DayView = () => {
  const { year: yearParam, month: monthParam, date: dateParam } = useParams()

  const journals = useJournalsStore((s) => s.journals)
  const upsertJournalYear = useJournalsStore((s) => s.upsertJournalYear)

  const { year: jYear, entries } = useJournalDayStore((s) => s.journal) ?? {}
  const addDayEntry = useJournalDayStore((s) => s.addDayEntry)
  const setJournal = useJournalDayStore((s) => s.set)

  const [view, setView] = useState<JournalDay>()
  const [searchParams] = useSearchParams()

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
    <Main>
      <Header center linkTo={'/'} />
      <Link to={`/?month=${searchParams.get('return')}`}>
        <Button>
          <ChevronLeft />
          Home
        </Button>
      </Link>
      {view ? (
        <>
          <p>
            Looking at {view.date}/{view.month}/{yearParam}
          </p>
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
