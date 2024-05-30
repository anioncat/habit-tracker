import CatppucinFrappe from './catppuccin-frappe'
import CatppuccinLatte from './catppuccin-latte'
import { applyTheme, Themes } from './utils'

export const DEFAULT_THEME: string = 'catppuccin-latte'

export const themes: Themes = {
  'catppuccin-latte': CatppuccinLatte,
  'catppuccin-frappé': CatppucinFrappe,
}

export { applyTheme }
