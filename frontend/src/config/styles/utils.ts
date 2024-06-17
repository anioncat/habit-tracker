import { DEFAULT_THEME, themes } from '.'
import { Theme } from './types'

export interface Themes {
  [key: string]: Theme
}

export interface MappedTheme {
  [key: string]: string | null
}

export const mapTheme = (variables: Theme): MappedTheme => {
  return {
    '--primary': variables.primary || '',
    '--secondary': variables.secondary || '',
    '--score0': variables.score0 || '',
    '--score1': variables.score1 || '',
    '--score2': variables.score2 || '',
    '--score3': variables.score3 || '',
    '--score4': variables.score4 || '',
    '--text': variables.text || '',
    '--subtext-1': variables['subtext-1'] || '',
    '--subtext-0': variables['subtext-0'] || '',
    '--overlay-2': variables['overlay-2'] || '',
    '--overlay-1': variables['overlay-1'] || '',
    '--overlay-0': variables['overlay-0'] || '',
    '--surface-2': variables['surface-2'] || '',
    '--surface-1': variables['surface-1'] || '',
    '--surface-0': variables['surface-0'] || '',
    '--base': variables.base || '',
    '--mantle': variables.mantle || '',
    '--crust': variables.crust || '',
  }
}

export const applyTheme = (theme: string) => {
  const themeVarables = mapTheme(themes[theme] ?? DEFAULT_THEME)
  if (!themeVarables) return

  const root = document.documentElement
  const themeProperties = Object.keys(themeVarables)
  for (const property of themeProperties) {
    if (property === 'name') return
    root.style.setProperty(property, themeVarables[property])
  }
}
