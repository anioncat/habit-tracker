import { createRef, useState } from 'react'
import { AppStyle } from '../../config/style'

export const PreferenceInput = ({
  value,
  commit,
}: {
  value: string
  commit: (newBackupAddr: string) => void
}) => {
  const [backupAddrVal, setBackupAddrVal] = useState(value)
  const thisRef = createRef<HTMLInputElement>()

  return (
    <input
      ref={thisRef}
      className={`resize-none border-b-4 ${AppStyle.primaryBorder} ${AppStyle.whiteBg} rounded p-1 text-right`}
      value={backupAddrVal}
      onChange={(e) => {
        setBackupAddrVal(e.target.value)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          thisRef.current?.blur()
        }
      }}
      onBlur={() => commit(backupAddrVal)}></input>
  )
}
