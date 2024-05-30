import dayjs from 'dayjs'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Button, Main, MonthView, YearView } from '../../components'
import { randomGreeting } from '../../util/greetings'
// import { useJournalDayStore } from '/src/stores'

const Landing = () => {
  const [greet, setGreet] = useState('Hello')
  const [time, setTime] = useState(0)
  const [monthView, setMonthView] = useState(true)

  const [searchParams] = useSearchParams()

  // const clearData = useJournalDayStore(s => s.clearJournal)

  useEffect(() => {
    setTime(new Date().getTime())
    setGreet(randomGreeting())
  }, [])

  setInterval(() => setTime(new Date().getTime()), 60000)

  const switchViewType = () => {
    setMonthView(!monthView)
  }

  const SectionsContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col gap-4">{children}</div>
  )

  return (
    <Main>
      <SectionsContainer>
        <div className="container text-lg">
          <p>{greet}!</p>
          <p>
            <a
              href={`/entry/${dayjs(time).year()}/${
                dayjs(time).month() + 1
              }/${dayjs(time).date()}`}
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
                !isNaN(Number(searchParams.get('month')))
                  ? dayjs(new Date().getTime()).month(
                      Number(searchParams.get('month'))
                    )
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
      <Section>
        <Button onClick={() => {
          clearData()
          setTimeout(() => window.location.reload(), 500)
        }}>Clear data</Button>
      </Section> */}
      </SectionsContainer>
    </Main>
  )
}

export default Landing
