import { useEffect } from 'react'
import useBackup from './useBackup'

export const useBackupSync = () => {
  const backupApi = useBackup('v1')

  useEffect(() => {
    backupApi?.syncBackup().catch((e) => {
      if (e instanceof TypeError) {
        if (e.message.includes('NetworkError')) {
          console.error('No connection')
        } else {
          console.error(e)
        }
      } else if (e instanceof SyntaxError) {
        if (e.message.includes('JSON.parse')) {
          console.log('Failed to parse JSON')
        } else {
          console.error(e)
        }
      } else {
        console.error(e)
      }
    })
  }, [backupApi])
}
