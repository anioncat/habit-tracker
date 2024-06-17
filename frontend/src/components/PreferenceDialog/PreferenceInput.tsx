import { useState } from 'react'
import { AppStyle } from '../../config/style'

export const PreferenceInput = ({
  value,
  commit,
}: {
  value: string
  commit: (newBackupAddr: string) => void
}) => {
  const [backupAddrVal, setBackupAddrVal] = useState(value)

  return (
    <input
      key={'pref-backup'}
      className={`resize-none border-b-4 ${AppStyle.primaryBorder} ${AppStyle.whiteBg} rounded p-1 text-right`}
      value={backupAddrVal}
      onChange={(e) => {
        setBackupAddrVal(e.target.value)
      }}
      onBlur={() => commit(backupAddrVal)}></input>
  )
}
