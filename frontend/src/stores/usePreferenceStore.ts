import { create, StoreApi } from 'zustand'
import { persist } from 'zustand/middleware'

interface Preferences {
  theme: string
}

interface PreferenceStore extends Preferences {
  set: (prefs: Preferences) => void
}

export const usePreferenceStore = create<PreferenceStore>()(
  persist(
    (set: StoreApi<PreferenceStore>['setState']) => ({
      theme: '',
      set: (preferences: Preferences) => set(preferences),
    }),
    { name: 'mood-tracker-preferences' }
  )
)
