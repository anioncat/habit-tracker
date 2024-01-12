import { create, StoreApi } from 'zustand'
import { persist } from 'zustand/middleware'

interface SelectionStore {
  year: number
  month: number
  date: number
  setSelection: (year: number, month: number, date: number) => void
}

const useSelectionStore = create<SelectionStore>()(persist((set: StoreApi<SelectionStore>['setState']) => ({
  year: null as number,
  month: null as number,
  date: null as number,
  setSelection: (year: number, month: number, date: number) => set({ year, month, date })
}), {
  name: 'mood-tracker-selection-store'
}))

export default useSelectionStore
