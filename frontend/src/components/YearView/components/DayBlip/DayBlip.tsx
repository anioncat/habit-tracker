import { Blip } from './dayBlipStyle'

type DayBlipProps = {
  score?: number
  blank?: boolean
}

export const DayBlip = ({ score, blank }: DayBlipProps) =>
  <Blip $blank={blank} $score={score}></Blip>
