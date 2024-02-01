import dayjs from 'dayjs'

import { useEffect, useState } from 'react'

import { Section, SectionsContainer } from './landingStyle'
import { Button, Header, Main, MonthView, YearView } from '/src/components'
import { useJournalDayStore } from '/src/stores'
import { randomGreeting } from '/src/util/greetings'

const Landing = () => {
  const [greet, setGreet] = useState('Hello')
  const [time, setTime] = useState(0)
  const [monthView, setMonthView] = useState(true)

  const clearData = useJournalDayStore(s => s.clearJournal)

  useEffect(() => {
    setTime(new Date().getTime())
    setGreet(randomGreeting())
  }, [])

  setInterval(() => setTime(new Date().getTime()), 60000)

  const switchViewType = () => {
    setMonthView(!monthView)
  }

  return <Main>
    <Header center linkTo={'/'} />
    <SectionsContainer>
      <Section>
        <p>{greet}!</p>
        <p><a href={`/entry/${dayjs(time).year()}/${dayjs(time).month() + 1}/${dayjs(time).date()}`}>Today</a> is {dayjs(time).format('dddd D MMM YYYY')}</p>
        <hr />
      </Section>
      <Section>
        {monthView ? <MonthView initialTime={dayjs(new Date().getTime())} /> : <YearView /> }
        <hr />
      </Section>
      <Section>
        {monthView ? <Button onClick={switchViewType}>Year View</Button> : <Button onClick={switchViewType}>Month View</Button>}
      </Section>
      <hr />
      <Section>
        <Button onClick={() => {
          clearData()
          setTimeout(() => window.location.reload(), 500)
        }}>Clear data</Button>
      </Section>
    </SectionsContainer>
  </Main>
}

export default Landing
