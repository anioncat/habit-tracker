import { create, StoreApi } from 'zustand'
import { persist } from 'zustand/middleware'

import { JournalDay, JournalYear } from '../types/ProjectTypes'

import { APP_VERSION, SCHEMA_VERSION } from '../config'

interface JournalsStore {
  journals: JournalYear[]
  setJournals: (journals: JournalYear[]) => void
  clearJournalYears: () => void
  upsertJournalYear: (journalYear: JournalYear) => void
  deleteJournalYear: (year: number) => void
}

export const createNewYear = (year: number): JournalYear => {
  console.log('New year entry created!')
  return {
    year,
    entries: [] as JournalDay[],
    meta: {
      dateCreated: new Date().getTime(),
      dateEdited: new Date().getTime(),
      appVersion: APP_VERSION,
      schemaVersion: SCHEMA_VERSION,
    },
  }
}

const useJournalsStore = create<JournalsStore>()(
  persist(
    (set: StoreApi<JournalsStore>['setState']) => ({
      journals: [] as JournalYear[],
      setJournals: (journals: JournalYear[]) => set({ journals }),
      clearJournalYears: () => set({ journals: [] }),
      upsertJournalYear: (journalYear) => {
        console.log('Journals updated')
        return set((s) => ({
          journals: s.journals.find((p) => p.year === journalYear.year)
            ? s.journals.map((j) =>
                j.year === journalYear.year ? journalYear : j
              )
            : [...s.journals, journalYear],
        }))
      },
      deleteJournalYear: (year) =>
        set((s) => ({ journals: s.journals.filter((j) => j.year !== year) })),
    }),
    {
      name: 'mood-tracker-journals',
    }
  )
)

export default useJournalsStore
