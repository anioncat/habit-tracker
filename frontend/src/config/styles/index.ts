import CatppuccinLatte from './catppuccin-latte'
import { applyTheme, IThemes } from './utils'

export const DEFAULT_THEME: string = 'catppuccin-latte'

export const themes: IThemes = {
  'catppuccin-latte': CatppuccinLatte,
}

export { applyTheme }
