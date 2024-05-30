import { dekebabNames } from '../../util/dekebabName'
import { applyTheme, themes } from '../../config'
import { usePreferenceStore } from '../../stores/usePreferenceStore'
import Dialog from '../Dialog'
import { PreferenceItem } from './PreferenceItem'
import Dropdown, { DropdownItem } from '../Dropdown'

const PreferenceDialog = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean
  setOpen: (x: boolean) => void
}) => {
  const prefs = usePreferenceStore()

  const currentTheme = prefs.theme
  const themeNames = Object.keys(themes).filter((t) => t !== currentTheme)
  const readableNames = dekebabNames(themeNames)

  const themeDropdownItems: DropdownItem[] = Array.from({
    length: readableNames.length,
  })
  for (let i = 0; i < readableNames.length; i++) {
    themeDropdownItems[i] = {
      label: readableNames[i],
      action: () => {
        const selectedTheme = themeNames[i]
        applyTheme(selectedTheme)
        prefs.set({ ...prefs, theme: selectedTheme })
      },
    }
  }

  return (
    <Dialog
      title="Preferences"
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      closeLabel="Done">
      <PreferenceItem label="Theme:">
        <Dropdown
          label={dekebabNames([prefs.theme])[0]}
          items={themeDropdownItems}></Dropdown>
      </PreferenceItem>
    </Dialog>
  )
}

export default PreferenceDialog
