import { useState } from 'react'

import { Dayjs } from 'dayjs'
import Button from '../Button'
import { useBackupSync } from '../../hooks'
import { MonthTable } from './components/MonthTable'

type MonthViewProps = {
  initialTime: Dayjs
}

const MonthView = ({ initialTime: inTime }: MonthViewProps) => {
  const [moodType, setMoodType] = useState<number>(0)

  useBackupSync()

  return (
    <>
      <MonthTable inTime={inTime} moodType={moodType}></MonthTable>
      <div className="h-2"></div>
      <Button onClick={() => setMoodType((moodType + 1) % 2)}>
        {moodType === 0 ? 'Work' : 'General'}
      </Button>
      <div className="h-2"></div>
    </>
  )
}

export default MonthView
