import { Blip } from './dayBlipStyle'

type DayBlipProps = {
  score?: number | null
  blank?: boolean | null
}

export const DayBlip = ({ score, blank }: DayBlipProps) => (
  <Blip $blank={blank ?? true} $score={score ?? null}></Blip>
)
