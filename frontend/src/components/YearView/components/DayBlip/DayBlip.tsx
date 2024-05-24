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
    m-0 w-2 h-2
    border-2 rounded-sm
    ${blanked}
    ${AppColor.getScore(score)}
  `}></div>
  )
}

export const DayBlip = ({ score, blank }: DayBlipProps) => (
  <Blip blank={blank} score={score}></Blip>
)
