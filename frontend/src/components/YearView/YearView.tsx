import dayjs, { Dayjs } from 'dayjs'
import { useJournalDayStore } from '../../stores'
import { useCallback, useEffect, useState } from 'react'
import { DayBlip } from './components/DayBlip/DayBlip'
import { Scale } from '../../types/ProjectTypes'
import { AppStyle } from '../../config/style'
import { useBackupSync } from '../../hooks'

type WeekEntry = {
  month: number
  date: number
  empty: boolean
}

const YearView = () => {
  const [moodData, setMoodData] = useState<Record<string, number | null>>({})

  const { entries, year } = useJournalDayStore((s) => s.journal)

  useBackupSync()

  useEffect(() => {
    if (entries) {
      const r = {} as Record<string, number | null>
      entries.forEach((d) => {
        r[`${d.month}-${d.date}`] = d.entries.find((p) => p.data.id === 0)?.data
          .data as Scale
      })
      setMoodData(r)
    }
  }, [entries])

  const generateFirstWeek = useCallback((): [WeekEntry[], Dayjs] => {
    const week: WeekEntry[] = []

    let d = dayjs().year(year).month(0).date(1)
    const firstDay = d.day()

    for (let i = 0; i < 7; ++i) {
      if (i < firstDay) {
        week.push({ month: -1, date: -1, empty: true })
      } else {
        week.push({ month: d.month() + 1, date: d.date(), empty: false })
        d = d.add(1, 'day')
      }
    }
    return [week, d]
  }, [year])

  const generateRestOfWeeks = useCallback(
    (dateTracker: Dayjs): WeekEntry[][] => {
      const weeks = []
      let week: WeekEntry[] = []
      let d = dateTracker

      while (d.isBefore(`${year}-12-31`)) {
        week.push({ month: d.month() + 1, date: d.date(), empty: false })
        d = d.add(1, 'day')
        if (d.day() === 0) {
          weeks.push(week)
          week = []
        }
      }
      while (week.length < 7) {
        week.push({ month: -1, date: -1, empty: true })
      }
      weeks.push(week)
      return weeks
    },
    [year]
  )

  const generateWeeks = useCallback(() => {
    const [week1, d] = generateFirstWeek()
    const rest = generateRestOfWeeks(d)
    return [week1, ...rest]
  }, [generateFirstWeek, generateRestOfWeeks])

  const YearContainer = ({ children }: { children: React.ReactNode }) => (
    <div
      className={`px-2 py-4 m-auto flex flex-row gap-1 overflow-scroll ${AppStyle.borderColor} border-2 rounded`}>
      {children}
    </div>
  )

  const YearWeekColumn = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col gap-1">{children}</div>
  )

  return (
    <YearContainer>
      {generateWeeks().map((w, i) => (
        <YearWeekColumn key={i}>
          {w.map((v, j) =>
            v.empty ? (
              <DayBlip key={`${i}-${j}-${v.month}-${v.date}`} blank></DayBlip>
            ) : (
              <DayBlip
                key={`${i}-${j}-${v.month}-${v.date}`}
                score={moodData[`${v.month}-${v.date}`] ?? undefined}
              />
            )
          )}
        </YearWeekColumn>
      ))}
    </YearContainer>
  )
}

export default YearView
