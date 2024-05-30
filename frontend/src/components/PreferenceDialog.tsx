import Dialog from './Dialog'

const PreferenceDialog = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean
  setOpen: (x: boolean) => void
}) => {
  return (
    <Dialog
      title="Preferences"
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      closeLabel="Done">
      <div>Myon</div>
    </Dialog>
  )
}

export default PreferenceDialog
