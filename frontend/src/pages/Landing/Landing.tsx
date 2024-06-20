import dayjs from 'dayjs'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Button, Main, MonthView, YearView } from '../../components'
import { useBackup } from '../../hooks'
import { randomGreeting } from '../../util/greetings'
// import { useJournalDayStore } from '../../stores'

const Landing = () => {
  const [time, setTime] = useState(new Date().getTime())
  const [monthView, setMonthView] = useState(true)
  const apiVersion = 'v1'

  const [searchParams] = useSearchParams()

  // const clearData = useJournalDayStore((s) => s.clearJournal)
  const backupHook = useBackup()
  const backupApi = backupHook ? backupHook[apiVersion] : null

  useEffect(() => {
    backupApi?.syncBackup().catch((e) => {
      if (e instanceof TypeError) {
        if (e.message.includes('NetworkError')) {
          console.error('No connection')
        } else {
          console.error(e)
        }
      } else if (e instanceof SyntaxError) {
        if (e.message.includes('JSON.parse')) {
          console.log('Failed to parse JSON')
        } else {
          console.error(e)
        }
      } else {
        console.error(e)
      }
    })
  }, [backupApi])

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

  const switchViewType = () => {
    setMonthView(!monthView)
  }

  const SectionsContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col gap-4">{children}</div>
  )

  console.log('landing rerendere4d')

  return (
    <Main>
      <SectionsContainer>
        <div className="container text-lg">
          <p>{randomGreeting()}!</p>
          <p>
            <a
              href={`${import.meta.env.BASE_URL}entry/${dayjs(time).format(
                'YYYY/M/D'
              )}`}
              className="text-primary hover:underline">
              Today
            </a>{' '}
            is {dayjs(time).format('dddd D MMM YYYY')}
          </p>
          <hr />
        </div>
        <div>
          {monthView ? (
            <MonthView
              initialTime={
                searchParams.get('month') &&
                !isNaN(Number(searchParams.get('month'))) &&
                searchParams.get('year') &&
                !isNaN(Number(searchParams.get('month')))
                  ? dayjs(new Date().getTime())
                      .month(Number(searchParams.get('month')))
                      .year(Number(searchParams.get('year')))
                  : dayjs(new Date().getTime())
              }
            />
          ) : (
            <YearView />
          )}
          <hr />
        </div>
        <div>
          {monthView ? (
            <Button onClick={switchViewType}>Year View</Button>
          ) : (
            <Button onClick={switchViewType}>Month View</Button>
          )}
        </div>
        {/* <hr />
        <SectionsContainer>
          <Button
            onClick={() => {
              clearData()
              setTimeout(() => window.location.reload(), 500)
            }}>
            Clear data
          </Button>
        </SectionsContainer> */}
      </SectionsContainer>
    </Main>
  )
}

export default Landing
