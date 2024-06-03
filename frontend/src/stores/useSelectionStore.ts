import { create, StoreApi } from 'zustand'
import { persist } from 'zustand/middleware'

interface SelectionStore {
  year: number
  month: number
  date: number
  setSelection: (year: number, month: number, date: number) => void
}

const useSelectionStore = create<SelectionStore>()(
  persist(
    (set: StoreApi<SelectionStore>['setState']) => ({
      year: null as unknown as number,
      month: null as unknown as number,
      date: null as unknown as number,
      setSelection: (year: number, month: number, date: number) =>
        set({ year, month, date }),
    }),
    {
      name: 'mood-tracker-selection-store',
    }
  )
)

export default useSelectionStore
