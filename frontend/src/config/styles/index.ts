import CatppucinFrappe from './catppuccin-frappe'
import CatppuccinLatte from './catppuccin-latte'
import CatppucinMacchiato from './catppuccin-macchiato'
import CatppucinMocha from './catppuccin-mocha'
import { applyTheme, Themes } from './utils'

export const DEFAULT_THEME: string = 'catppuccin-latte'

export const themes: Themes = {
  'catppuccin-latte': CatppuccinLatte,
  'catppuccin-frappé': CatppucinFrappe,
  'catppuccin-macchiato': CatppucinMacchiato,
  'catppuccin-mocha': CatppucinMocha,
}

export { applyTheme }
