import { AppStyle } from '../../../config/style'

export const WeekDay = ({
  children,
  today = false,
  blank = false,
  score,
}: {
  children?: React.ReactNode
  today?: boolean
  blank?: boolean
  score?: number
}) => {
  const borderStyle = `border-2 border-solid ${AppStyle.borderColor}`
  const todayBorderStyle = `border-2 border-double ${AppStyle.primaryBorder} ${AppStyle.primaryText} font-bold`

  const weekDayHoverStyle =
    score !== undefined
      ? 'active:brightness-90 hover:brightness-125 ' +
        AppStyle.getScore(score, 'bg')
      : AppStyle.monthHover

  const cellStyle = `
      h-10
      ${today ? todayBorderStyle : borderStyle}
      [&_a]:text-right
      ${blank ? AppStyle.disabledBg : 'cursor-pointer ' + weekDayHoverStyle}
    `
  return <td className={cellStyle}>{children}</td>
}
