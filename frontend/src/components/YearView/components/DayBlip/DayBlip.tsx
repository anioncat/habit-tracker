import { AppColor } from '../../../../config/style'

type DayBlipProps = {
  score?: number
  blank?: boolean
}

const Blip = ({ score, blank }: { score?: number; blank?: boolean }) => {
  const blanked = blank
    ? `${AppColor.disabledBg} border-0`
    : `hover:border-2 ${AppColor.borderHover}`
  return (
    <div
      className={`
    m-0 w-3 h-3 aspect-square
    border ${AppColor.borderColor} rounded-sm
    ${blanked}
    ${AppColor.getScore(score, 'bg')}
  `}></div>
  )
}

export const DayBlip = ({ score, blank }: DayBlipProps) => (
  <Blip blank={blank} score={score}></Blip>
)
