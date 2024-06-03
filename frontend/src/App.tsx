import dayjs from 'dayjs'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import * as Pages from './pages'
import { Footer } from './components'
import { useSelectionStore } from './stores'
import { DEFAULT_THEME } from './config'
import { applyTheme } from './config/styles/utils'
import { usePreferenceStore } from './stores/usePreferenceStore'

export const App = () => {
  const setSelection = useSelectionStore((s) => s.setSelection)
  const prefs = usePreferenceStore()
  const theme = prefs.theme.length > 0 ? prefs.theme : DEFAULT_THEME

  // Set default to now
  useEffect(() => {
    const t = new Date().getTime()
    const djs = dayjs(t)
    const year = djs.year()
    const month = djs.month() + 1
    const date = djs.date()
    setSelection(year, month, date)
  }, [setSelection])

  useEffect(() => {
    console.log(`Applying theme: "${theme}" DEFAULT_THEME is ${DEFAULT_THEME}`)
    applyTheme(theme)
  }, [theme])

  return (
    <div className="flex flex-col min-h-lvh">
      <Routes>
        <Route path="/" element={<Pages.Landing />} />
        <Route path="/entry/:year/:month/:date" element={<Pages.DayView />} />
        <Route path="*" element={<Pages.Landing />} />
      </Routes>
      <Footer />
    </div>
  )
}
