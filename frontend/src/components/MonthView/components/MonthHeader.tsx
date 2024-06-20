import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../../Button'

type MonthHeaderProps = {
  handleNextMonth: () => void
  handlePrevMonth: () => void
  timeString: string
}

export const MonthHeader = ({
  handleNextMonth,
  handlePrevMonth,
  timeString,
}: MonthHeaderProps) => (
  <div className="flex flex-row justify-between">
    <Button onClick={handlePrevMonth}>
      <ChevronLeft />
    </Button>
    {timeString}
    <Button onClick={handleNextMonth}>
      <ChevronRight />
    </Button>
  </div>
)
