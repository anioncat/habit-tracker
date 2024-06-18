import { useJournalDayStore, useJournalsStore } from '../stores'
import { JournalDay } from '../types/ProjectTypes'

export interface SaveJournalActions {
  addDayEntry: (month: number, date: number) => void
  updateJournalDay: (newJournalDay: JournalDay) => void
}

// Wrapper hook to update both stores when updating the journal
export const useSaveJournals = (): SaveJournalActions => {
  const journalDayStore = useJournalDayStore((s) => s)
  const journalsStore = useJournalsStore((s) => s)

  return {
    addDayEntry: (month, date) => {
      journalDayStore.addDayEntry(month, date)
      journalsStore.upsertJournalYear(journalDayStore.journal)
    },
    updateJournalDay: (newJournalDay) => {
      journalDayStore.updateJournalDay(newJournalDay)
      journalsStore.upsertJournalYear(journalDayStore.journal)
    },
  }
}
