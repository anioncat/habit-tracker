import { create, StoreApi } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Preferences {
  theme: string
  backupAddr: string
}

interface PreferenceStore extends Preferences {
  set: (prefs: Preferences) => void
}

export const usePreferenceStore = create<PreferenceStore>()(
  persist(
    (set: StoreApi<PreferenceStore>['setState']) => ({
      theme: '',
      backupAddr: '',
      set: (preferences: Preferences) => set(preferences),
    }),
    { name: 'mood-tracker-preferences' }
  )
)
