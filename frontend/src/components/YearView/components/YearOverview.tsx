import { useCallback, useEffect, useState } from 'react'
import { useJournalDayStore } from '../../../stores'
import { Scale } from '../../../types/ProjectTypes'
import { weeksGenerator } from '../utils/weeksGenerator'
import { DayBlip } from './DayBlip/DayBlip'
import { YearContainer } from './YearContainer'
import { YearWeekColumn } from './YearWeekColumn'

export const YearOverview = () => {
  const [moodData, setMoodData] = useState<Record<string, number | null>>({})

  const { entries, year } = useJournalDayStore((s) => s.journal)

  useEffect(() => {
    if (entries) {
      const r = {} as Record<string, number | null>
      entries.forEach((d) => {
        r[`${d.month}-${d.date}`] = d.entries.find((p) => p.data.id === 0)?.data
          .data as Scale
      })
      setMoodData(r)
    }
  }, [entries])

  const generateWeeks = useCallback(() => weeksGenerator(year), [year])

  return (
    <YearContainer>
      {generateWeeks().map((w, i) => (
        <YearWeekColumn key={i}>
          {w.map((v, j) =>
            v.empty ? (
              <DayBlip key={`${i}-${j}-${v.month}-${v.date}`} blank></DayBlip>
            ) : (
              <DayBlip
                key={`${i}-${j}-${v.month}-${v.date}`}
                score={moodData[`${v.month}-${v.date}`] ?? undefined}
              />
            )
          )}
        </YearWeekColumn>
      ))}
    </YearContainer>
  )
}
