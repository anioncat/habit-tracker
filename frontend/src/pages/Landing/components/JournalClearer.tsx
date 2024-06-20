import { Button } from '../../../components'
import { useJournalDayStore } from '../../../stores'

import { SectionsContainer } from './SectionsContainer'

export const JournalClearer = () => {
  const clearData = useJournalDayStore((s) => s.clearJournal)
  return (
    <SectionsContainer>
      <Button
        onClick={() => {
          clearData()
          setTimeout(() => window.location.reload(), 500)
        }}>
        Clear data
      </Button>
    </SectionsContainer>
  )
}
