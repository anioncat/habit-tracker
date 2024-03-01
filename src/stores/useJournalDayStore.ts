import { create, StoreApi } from 'zustand'
import { persist } from 'zustand/middleware'

import { JournalDay, JournalYear } from '../types/ProjectTypes'

import {
  APP_VERSION,
  SCHEMA_VERSION
} from '/src/config'
import { produce } from 'immer'

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
  const now = new Date().getTime()
  const metaData = {
    dateCreated: now,
    dateEdited: now,
    appVersion: APP_VERSION,
    schemaVersion: SCHEMA_VERSION
  }

  return {
    month,
    date,
    entries: [{
      data: {
        id: 0,
        name: 'General Mood',
        data: null,
        comment: '',
        isScale: true
      },
      meta: structuredClone(metaData)
    }, {
      data: {
        id: 1,
        name: 'Work Mood',
        data: null,
        comment: '',
        isScale: true
      },
      meta: structuredClone(metaData)
    }],
    meta: structuredClone(metaData)
  }
}

const useJournalDayStore = create<DayStore>()(persist((set: StoreApi<DayStore>['setState'], get: StoreApi<DayStore>['getState']) => ({
  journal: null as JournalYear,
  set: (journal: JournalYear) => { set({ journal }) },
  getMonthEntries: (month: number) => get().journal.entries.filter(p => p.month === month),
  addDayEntry: (month, date) => set(produce(({ journal }: { journal: JournalYear }) => {
    if (!journal.entries.some(p => p.month === month && p.date === date)) {
      journal.entries = [...journal.entries, createDayEntry(month, date)]
    }
  })),
  clearJournal: () => set({ journal: null }),
  deleteJournalDay: day => set(s => ({ journal: { ...s.journal, entries: s.journal.entries.filter(j => j.date !== day) } })),
  updateJournalDay: newJournalDay => set(produce(({ journal }: { journal: JournalYear }) => {
    const now = new Date().getTime()
    const dIdx = journal.entries.findIndex(p => p.month === newJournalDay.month && p.date === newJournalDay.date)
    journal.entries[dIdx] = { ...journal.entries[dIdx], ...newJournalDay }
    journal.meta.dateEdited = now
  }))
}), {
  name: 'mood-tracker-journal'
}))

export default useJournalDayStore
