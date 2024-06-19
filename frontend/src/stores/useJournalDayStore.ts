import { create, StoreApi } from 'zustand'
import { persist } from 'zustand/middleware'

import { JournalDay, JournalYear } from '../types/ProjectTypes'

import { produce } from 'immer'
import { updateMetaData } from '../util/metadata'

interface DayStore {
  journal: JournalYear
  set: (journal: JournalYear) => void
  getMonthEntries: (month: number) => JournalDay[]
  addDayEntry: (month: number, date: number) => void
  clearJournal: () => void
  deleteJournalDay: (day: number) => void
  updateJournalDay: (newJournalDay: JournalDay) => void
}

export const createDayEntry = (month: number, date: number): JournalDay => {
  console.log('New day entry created!')
  return {
    month,
    date,
    entries: [
      {
        data: {
          id: 0,
          name: 'General Mood',
          data: null,
          comment: '',
          isScale: true,
        },
      },
      {
        data: {
          id: 1,
          name: 'Work Mood',
          data: null,
          comment: '',
          isScale: true,
        },
      },
    ],
  }
}

const useJournalDayStore = create<DayStore>()(
  persist(
    (
      set: StoreApi<DayStore>['setState'],
      get: StoreApi<DayStore>['getState']
    ) => ({
      journal: {} as JournalYear,
      set: (journal: JournalYear) => {
        set({ journal })
      },
      getMonthEntries: (month: number) =>
        get().journal.entries.filter((p) => p.month === month),
      addDayEntry: (month, date) =>
        set(
          produce(({ journal }: { journal: JournalYear }) => {
            if (
              !journal.entries.some((p) => p.month === month && p.date === date)
            ) {
              journal.entries = [
                ...journal.entries,
                createDayEntry(month, date),
              ]
              journal.meta.dateEdited = new Date().getTime()
            }
          })
        ),
      clearJournal: () => set({ journal: {} as JournalYear }),
      deleteJournalDay: (day) =>
        set((s) => ({
          journal: {
            ...s.journal,
            entries: s.journal.entries.filter((j) => j.date !== day),
            meta: updateMetaData(s.journal.meta),
          },
        })),
      updateJournalDay: (newJournalDay) =>
        set(
          produce(({ journal }: { journal: JournalYear }) => {
            const dIdx = journal.entries.findIndex(
              (p) =>
                p.month === newJournalDay.month && p.date === newJournalDay.date
            )
            journal.entries[dIdx] = {
              ...journal.entries[dIdx],
              ...newJournalDay,
            }
            journal.meta.dateEdited = new Date().getTime()
          })
        ),
    }),
    {
      name: 'mood-tracker-journal',
    }
  )
)

export default useJournalDayStore
