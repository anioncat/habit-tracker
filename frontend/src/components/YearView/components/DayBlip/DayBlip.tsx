import { AppStyle } from '../../../../config/style'

type DayBlipProps = {
  score?: number
  blank?: boolean
}

const Blip = ({ score, blank }: { score?: number; blank?: boolean }) => {
  const blanked = blank
    ? `${AppStyle.disabledBg} border-0`
    : `hover:border-2 ${AppStyle.borderHover}`
  return (
    <div
      className={`
    m-0 w-3 h-3 aspect-square
    border ${AppStyle.borderColor} rounded-sm
    ${blanked}
    ${AppStyle.getScore(score, 'bg')}
  `}></div>
  )
}

export const DayBlip = ({ score, blank }: DayBlipProps) => (
  <Blip blank={blank} score={score}></Blip>
)
