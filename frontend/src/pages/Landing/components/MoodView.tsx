import { Dayjs } from 'dayjs'
import { Button, MonthView, YearView } from '../../../components'
import { useState } from 'react'

type MoodViewProps = {
  initialTime: Dayjs
}

export const MoodView = ({ initialTime }: MoodViewProps) => {
  const [monthView, setMonthView] = useState(true)

  const switchViewType = () => {
    setMonthView(!monthView)
  }
  return (
    <>
      <div>
        {monthView ? <MonthView initialTime={initialTime} /> : <YearView />}
        <hr />
      </div>
      <div>
        {monthView ? (
          <Button onClick={switchViewType}>Year View</Button>
        ) : (
          <Button onClick={switchViewType}>Month View</Button>
        )}
      </div>
    </>
  )
}
