import dayjs from 'dayjs'
import { setup } from 'goober'
import { StrictMode, createElement, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import * as Pages from './pages'
import { Footer } from '/src/components'

import { useJournalDayStore, useJournalsStore, useSelectionStore } from './stores'
import { createNewYear } from './stores/useJournalsStore'

// Set up goober to use React
setup(
  createElement,
  undefined, undefined,
  // Remove transient props from the DOM
  props => Object.keys(props).forEach(p => p[0] === '$' && delete props[p])
)

const App = () => {
  const setSelection = useSelectionStore(s => s.setSelection)

  // Set default to now
  useEffect(() => {
    const t = new Date().getTime()
    const djs = dayjs(t)
    const year = djs.year()
    const month = djs.month() + 1
    const date = djs.date()
    setSelection(year, month, date)
  }, [])

  return <>
    <Routes>
      <Route path="/" element={<Pages.Landing />} />
      <Route path="/entry/:year/:month/:date" element={<Pages.DayView />} />
      <Route path="*" element={<Pages.Landing />} />
    </Routes>
    <Footer />
  </>
}

// Render the app
const container = document.getElementById('app')
const root = createRoot(container!)
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
