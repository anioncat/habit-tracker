import { create, StoreApi } from 'zustand'
import { persist } from 'zustand/middleware'

import {
  JournalDay,
  JournalsData,
  JournalYear,
  MetaData,
} from '../types/ProjectTypes'
import { createMetaData, updateMetaData } from '../util/metadata'

interface JournalsStore {
  journals: JournalYear[]
  meta: MetaData
  setJournals: (journals: JournalYear[]) => void
  clearJournalYears: () => void
  upsertJournalYear: (journalYear: JournalYear) => void
  deleteJournalYear: (year: number) => void
  getJournalData: () => JournalsData
}

export const createNewYear = (year: number): JournalYear => {
  console.log('New year entry created!')
  return {
    year,
    entries: [] as JournalDay[],
    meta: createMetaData(),
  }
}

const useJournalsStore = create<JournalsStore>()(
  persist(
    (
      set: StoreApi<JournalsStore>['setState'],
      get: StoreApi<JournalsStore>['getState']
    ) => ({
      journals: [] as JournalYear[],
      meta: {} as MetaData,
      setJournals: (journals: JournalYear[]) =>
        set({ journals, meta: createMetaData() }),
      clearJournalYears: () => set({ journals: [], meta: createMetaData() }),
      upsertJournalYear: (journalYear) =>
        set((s) => ({
          journals: s.journals.find((p) => p.year === journalYear.year)
            ? s.journals.map((j) =>
                j.year === journalYear.year ? journalYear : j
              )
            : [...s.journals, journalYear],
          meta: updateMetaData(s.meta),
        })),
      deleteJournalYear: (year) =>
        set((s) => ({
          journals: s.journals.filter((j) => j.year !== year),
          meta: updateMetaData(s.meta),
        })),
      getJournalData: () => {
        const dataState = get()
        return { journals: dataState.journals, meta: dataState.meta }
      },
    }),
    {
      name: 'mood-tracker-journals',
    }
  )
)

export default useJournalsStore
