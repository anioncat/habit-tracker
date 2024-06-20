import dayjs, { Dayjs } from 'dayjs'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useJournalDayStore, useJournalsStore } from '../../../stores'
import { JournalDay, JournalYear, Scale } from '../../../types/ProjectTypes'
import { MonthTableWeekHeader } from './MonthTableWeekHeader'
import { WeekDay } from './WeekDay'
import { WeekDayLink } from './WeekDayLink'
import { MonthHeader } from './MonthHeader'
import { weeksGenerator } from '../utils/weeksGenerator'

type MonthTableProps = {
  inTime: Dayjs
  moodType: number
}

export const MonthTable = ({ inTime, moodType }: MonthTableProps) => {
  const [time, setTime] = useState(inTime)
  const [monthData, setMonthData] = useState<JournalDay[]>([])
  const [moodData, setMoodData] = useState<Record<number, number | null>>({})

  const { entries, year: jYear } = useJournalDayStore((s) => s.journal) ?? {}
  const journals = useJournalsStore((s) => s.journals)

  useEffect(() => {
    if (entries) {
      setMonthData(entries.filter((p) => p.month === time.month() + 1))
    }
  }, [entries, time])

  useEffect(() => {
    const r = {} as Record<number, number | null>
    monthData.forEach((d) => {
      r[d.date] = d.entries.find((p) => p.data.id === moodType)?.data
        .data as Scale
    })
    setMoodData(r)
  }, [moodType, monthData, time])
  const setJournalYear = useJournalDayStore((s) => s.set)

  const now = useMemo(() => dayjs(new Date().getTime()), [])

  const generateWeeks = useCallback(() => weeksGenerator(time), [time])

  const switchYear = (newYear: number) => {
    if (newYear !== jYear) {
      setJournalYear(
        journals.find((p) => p.year === newYear) ??
          ({ year: newYear } as JournalYear)
      )
    }
  }

  const previousMonth = () => {
    const newTime = time.subtract(1, 'month')
    setTime(newTime)
    switchYear(newTime.year())
  }

  const nextMonth = () => {
    const newTime = time.add(1, 'month')
    setTime(newTime)
    switchYear(newTime.year())
  }

  return (
    <table className={`table-fixed w-full`}>
      <thead>
        <tr>
          <th colSpan={7}>
            <MonthHeader
              handleNextMonth={nextMonth}
              handlePrevMonth={previousMonth}
              timeString={time.format('MMM YYYY')}></MonthHeader>
          </th>
        </tr>
        <tr>
          <MonthTableWeekHeader>SUN</MonthTableWeekHeader>
          <MonthTableWeekHeader>MON</MonthTableWeekHeader>
          <MonthTableWeekHeader>TUE</MonthTableWeekHeader>
          <MonthTableWeekHeader>WED</MonthTableWeekHeader>
          <MonthTableWeekHeader>THU</MonthTableWeekHeader>
          <MonthTableWeekHeader>FRI</MonthTableWeekHeader>
          <MonthTableWeekHeader>SAT</MonthTableWeekHeader>
        </tr>
      </thead>
      <tbody>
        {generateWeeks().map((w: number[], i) => (
          <tr key={i}>
            {w.map((d: number, j) =>
              d < 0 ? (
                <WeekDay key={`${i}-${j}`} blank></WeekDay>
              ) : (
                <WeekDay
                  key={`${i}-${j}`}
                  today={
                    d === now.date() &&
                    now.month() === time.month() &&
                    now.year() === time.year()
                  }
                  score={moodData[d] ?? undefined}>
                  <WeekDayLink
                    linkto={`${import.meta.env.BASE_URL}entry/${time.year()}/${
                      time.month() + 1
                    }/${d}`}>
                    {d}
                  </WeekDayLink>
                </WeekDay>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
