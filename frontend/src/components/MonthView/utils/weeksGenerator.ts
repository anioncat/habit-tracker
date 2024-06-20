import { Dayjs } from 'dayjs'

export const weeksGenerator = (time: Dayjs) => {
  const generateFirstWeek = (): [number[], Dayjs] => {
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
  }

  const generateRestOfWeeks = (dateTracker: Dayjs): number[][] => {
    const weeks = []
    let week = []

    let d = dateTracker
    const month = time.month()

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
  }

  const [week1, d] = generateFirstWeek()
  const rest = generateRestOfWeeks(d)

  return [week1, ...rest]
}
