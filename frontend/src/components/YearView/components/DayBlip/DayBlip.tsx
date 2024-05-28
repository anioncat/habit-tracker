import { AppColor } from '../../../../config/style'

type DayBlipProps = {
  score?: number
  blank?: boolean
}

const Blip = ({ score, blank }: { score?: number; blank?: boolean }) => {
  const blanked = blank ? `${AppColor.disabledBg} border-0` : ''
  return (
    <div
      className={`
    m-0 w-3 h-3 aspect-square
    border ${AppColor.borderColor} rounded-sm
    ${blanked}
    ${AppColor.getScore(score, 'bg')}
    hover:border-2 ${AppColor.borderHover}
  `}></div>
  )
}

export const DayBlip = ({ score, blank }: DayBlipProps) => (
  <Blip blank={blank} score={score}></Blip>
)
