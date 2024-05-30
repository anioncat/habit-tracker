import { dekebabNames } from '../../util/dekebabName'
import { themes } from '../../config'
import { usePreferenceStore } from '../../stores/usePreferenceStore'
import Dialog from '../Dialog'
import { PreferenceItem } from './PreferenceItem'

const PreferenceDialog = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean
  setOpen: (x: boolean) => void
}) => {
  const prefs = usePreferenceStore()

  const themeNames = Object.keys(themes)
  const readableNames = dekebabNames(themeNames)

  return (
    <Dialog
      title="Preferences"
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      closeLabel="Done">
      <PreferenceItem label="Theme:">
        <div>{prefs.theme}</div>
      </PreferenceItem>
      {readableNames}
    </Dialog>
  )
}

export default PreferenceDialog
