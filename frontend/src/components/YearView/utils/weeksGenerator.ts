import dayjs, { Dayjs } from 'dayjs'

type WeekEntry = {
  month: number
  date: number
  empty: boolean
}

export const weeksGenerator = (year: number) => {
  const generateFirstWeek = (): [WeekEntry[], Dayjs] => {
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
  }

  const generateRestOfWeeks = (dateTracker: Dayjs): WeekEntry[][] => {
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
  }

  const [week1, d] = generateFirstWeek()
  const rest = generateRestOfWeeks(d)
  return [week1, ...rest]
}
