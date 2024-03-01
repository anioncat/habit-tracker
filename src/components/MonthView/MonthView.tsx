import { useCallback, useEffect, useMemo, useState } from 'react'

import dayjs, { Dayjs } from 'dayjs'
import {
  MonthTableWeekHeader,
  MonthTableWeekHeaderRow,
  MonthTable,
  MonthTableHeader,
  MonthTableRow,
  WeekDay,
  WeekDayLink,
  MonthTableHead,
  MonthTableHeaderContainer,
} from './monthViewStyle'
import Button from '../Button/Button'
import { useJournalDayStore } from '../../stores'
import { JournalDay, Scale } from '../../types/ProjectTypes'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type MonthViewProps = {
  initialTime: Dayjs
}

const MonthView = ({ initialTime: inTime }: MonthViewProps) => {
  const [moodType, setMoodType] = useState<number>(0)
  const [monthData, setMonthData] = useState<JournalDay[]>([])
  const [moodData, setMoodData] = useState<Record<number, number>>({})
  const [time, setTime] = useState(inTime)

  const { entries } = useJournalDayStore((s) => s.journal) ?? {}

  useEffect(() => {
    if (entries) {
      setMonthData(entries.filter((p) => p.month === time.month() + 1))
    }
  }, [entries, time])

  useEffect(() => {
    const r = {} as Record<number, number>
    monthData.forEach((d) => {
      r[d.date] = d.entries.find((p) => p.data.id === moodType).data
        .data as Scale
    })
    setMoodData(r)
  }, [moodType, monthData, time])

  const month = time.month()

  const now = useMemo(() => dayjs(new Date().getTime()), [])

  const generateFirstWeek = useCallback((): [number[], Dayjs] => {
    const week = []

    let d = time.date(1)
    const firstDayOfMonth = d.day()

    for (let i = 0; i < 7; ++i) {
      if (i < firstDayOfMonth) {
        week.push(-1)
      } else {
        week.push(d.date())
        d = d.add(1, 'day')
      }
    }
    return [week, d]
  }, [time])

  const generateRestOfWeeks = useCallback(
    (dateTracker: Dayjs): number[][] => {
      const weeks = []
      let week = []

      let d = dateTracker

      while (d.month() === month) {
        week.push(d.date())
        d = d.add(1, 'day')
        if (d.day() === 0) {
          weeks.push(week)
          week = []
        }
      }

      while (week.length < 7) {
        week.push(-1)
      }
      weeks.push(week)

      return weeks
    },
    [month]
  )

  const generateWeeks = useCallback((): number[][] => {
    const [week1, d] = generateFirstWeek()
    const rest = generateRestOfWeeks(d)
    return [week1, ...rest]
  }, [generateFirstWeek, generateRestOfWeeks])

  const previousMonth = () => {
    setTime(time.subtract(1, 'month'))
  }

  const nextMonth = () => {
    setTime(time.add(1, 'month'))
  }

  return (
    <>
      <MonthTable>
        <MonthTableHead>
          <MonthTableRow>
            <MonthTableHeader colSpan={7}>
              <MonthTableHeaderContainer>
                <Button onClick={previousMonth}>
                  <ChevronLeft />
                </Button>
                {time.format('MMM YYYY')}
                <Button onClick={nextMonth}>
                  <ChevronRight />
                </Button>
              </MonthTableHeaderContainer>
            </MonthTableHeader>
          </MonthTableRow>
          <MonthTableWeekHeaderRow>
            <MonthTableWeekHeader>SUN</MonthTableWeekHeader>
            <MonthTableWeekHeader>MON</MonthTableWeekHeader>
            <MonthTableWeekHeader>TUE</MonthTableWeekHeader>
            <MonthTableWeekHeader>WED</MonthTableWeekHeader>
            <MonthTableWeekHeader>THU</MonthTableWeekHeader>
            <MonthTableWeekHeader>FRI</MonthTableWeekHeader>
            <MonthTableWeekHeader>SAT</MonthTableWeekHeader>
          </MonthTableWeekHeaderRow>
        </MonthTableHead>
        <tbody>
          {generateWeeks().map((w: number[], i) => (
            <MonthTableRow key={i}>
              {w.map((d: number, j) =>
                d < 0 ? (
                  <WeekDay key={`${i}-${j}`} $blank></WeekDay>
                ) : (
                  <WeekDay
                    key={`${i}-${j}`}
                    $today={
                      d === now.date() &&
                      now.month() === time.month() &&
                      now.year() === time.year()
                    }
                    $score={moodData[d]}>
                    <a
                      href={`/entry/${time.year()}/${
                        month + 1
                      }/${d}?return=${month}`}>
                      <WeekDayLink>{d}</WeekDayLink>
                    </a>
                  </WeekDay>
                )
              )}
            </MonthTableRow>
          ))}
        </tbody>
      </MonthTable>
      <Button onClick={() => setMoodType((moodType + 1) % 2)}>
        {moodType === 0 ? 'Work' : 'General'}
      </Button>
    </>
  )
}

export default MonthView
