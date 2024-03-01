import { setup } from 'goober'
import { StrictMode, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App'

// Set up goober to use React
setup(
  createElement,
  undefined,
  undefined,
  // Remove transient props from the DOM
  (props) => Object.keys(props).forEach((p) => p[0] === '$' && delete props[p])
)

// Render the app
const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
