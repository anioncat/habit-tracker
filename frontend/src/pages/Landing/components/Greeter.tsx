import { Dayjs } from 'dayjs'
import { randomGreeting } from '../../../util/greetings'

export const Greeter = ({ time }: { time: Dayjs }) => {
  return (
    <div className="container text-lg">
      <p>{randomGreeting()}!</p>
      <p>
        <a
          href={`${import.meta.env.BASE_URL}entry/${time.format('YYYY/M/D')}`}
          className="text-primary hover:underline">
          Today
        </a>{' '}
        is {time.format('dddd D MMM YYYY')}
      </p>
      <hr />
    </div>
  )
}
