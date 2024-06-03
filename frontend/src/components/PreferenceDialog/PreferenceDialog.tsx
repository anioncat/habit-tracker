import { useMemo } from 'react'
import { DEFAULT_THEME, themes } from '../../config'
import { applyTheme } from '../../config/styles/utils'
import { usePreferenceStore } from '../../stores/usePreferenceStore'
import { dekebabName, dekebabNames } from '../../util/dekebabName'
import Dialog from '../Dialog'
import Dropdown, { DropdownItem } from '../Dropdown'
import { PreferenceItem } from './PreferenceItem'

const PreferenceDialog = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean
  setOpen: (x: boolean) => void
}) => {
  const prefs = usePreferenceStore()

  const currentTheme = prefs.theme ? prefs.theme : DEFAULT_THEME
  const themeNames = Object.keys(themes).filter((t) => t !== currentTheme)
  const readableNames = useMemo(() => dekebabNames(themeNames), [themeNames])

  const themeDropdownItems: DropdownItem[] = useMemo(() => {
    const dropdownItems = Array.from({
      length: readableNames.length,
    }) as DropdownItem[]
    for (let i = 0; i < readableNames.length; i++) {
      dropdownItems[i] = {
        label: readableNames[i],
        action: () => {
          const selectedTheme = themeNames[i]
          applyTheme(selectedTheme)
          prefs.set({ ...prefs, theme: selectedTheme })
        },
      }
    }
    return dropdownItems
  }, [prefs, themeNames, readableNames])

  return (
    <Dialog
      title="Preferences"
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      closeLabel="Done">
      <PreferenceItem label="Theme:">
        <Dropdown
          label={dekebabName(currentTheme)}
          items={themeDropdownItems}></Dropdown>
      </PreferenceItem>
    </Dialog>
  )
}

export default PreferenceDialog
