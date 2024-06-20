import dayjs from 'dayjs'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Main } from '../../components'
import { Greeter } from './components/Greeter'
import { MoodView } from './components/MoodView'
import { SectionsContainer } from './components/SectionsContainer'

const Landing = () => {
  const [time, setTime] = useState(new Date().getTime())

  const [searchParams] = useSearchParams()

  // Time updater
  useEffect(() => {
    const oldDate = dayjs(time).date()
    const id = setInterval(() => {
      const newTime = new Date().getTime()
      if (oldDate !== dayjs(newTime).date()) {
        setTime(newTime)
      }
    }, 30000)
    return () => clearInterval(id)
  }, [time])

  const initialTimeCalc = useMemo(() => {
    const monthValid =
      searchParams.get('month') && !isNaN(Number(searchParams.get('month')))
    const yearValid =
      searchParams.get('year') && !isNaN(Number(searchParams.get('year')))

    return monthValid && yearValid
      ? dayjs(new Date().getTime())
          .month(Number(searchParams.get('month')))
          .year(Number(searchParams.get('year')))
      : dayjs(new Date().getTime())
  }, [searchParams])

  return (
    <Main>
      <SectionsContainer>
        <Greeter time={dayjs(time)}></Greeter>
        <MoodView initialTime={initialTimeCalc}></MoodView>
        {/* <hr />
        <JournalClearer></JournalClearer> */}
      </SectionsContainer>
    </Main>
  )
}

export default Landing
