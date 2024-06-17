import { createRef, useState } from 'react'
import { Input } from '../Input'

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
    <Input
      ref={thisRef}
      value={backupAddrVal}
      onChange={(e) => {
        setBackupAddrVal(e.target.value)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          thisRef.current?.blur()
        }
      }}
      onBlur={() => commit(backupAddrVal)}
      alignRight></Input>
  )
}
