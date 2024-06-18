import _ from 'lodash'
import { useEffect } from 'react'
import { useJournalsStore } from '../stores'
import { usePreferenceStore } from '../stores/usePreferenceStore'
import { PingStatus } from '../types/BackupTypes'
import { JournalsData, JournalYear, MetaData } from '../types/ProjectTypes'

interface V1Api {
  syncBackup: () => Promise<JournalYear[]>
  postJournal: (jd: JournalsData) => void
}

interface V2Api {
  syncBackup: () => Promise<JournalYear[]>
  postJournal: (meta: MetaData, jy: JournalYear[]) => void
}

interface BackupApi {
  v1: V1Api
  v2: V2Api
}

const useBackup = (): BackupApi | null => {
  const prefs = usePreferenceStore()
  const upstream = prefs.backupAddr.split('/').join('/')
  const journalsStore = useJournalsStore((s) => s)

  // Generic ping to endpoint
  useEffect(() => {
    if (upstream === '') {
      console.log('No upstream store')
    } else {
      console.log('Checking for connection to', upstream)
      fetch(`${upstream}/ping`, { mode: 'cors' })
        .then((res) => {
          res.json().then((v: PingStatus) => console.log('Hello', v.where))
        })
        .catch((err) => console.log(err))
    }
  }, [upstream])

  const updateRemote = (jd: JournalsData) => {
    fetch(`${upstream}/journal`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jd),
    }).then((res) => res.json().then((v) => console.log(res.status, v)))
  }

  return upstream === ''
    ? null
    : {
        v1: {
          syncBackup: async () => {
            const res = await fetch(`${upstream}/journal`)
            const result = (await res.json()) as JournalsData
            const metaData = journalsStore.meta
            if (!_.isEqual(metaData, result.meta)) {
              if (metaData.dateEdited < result.meta.dateEdited) {
                console.log('Updating local')
                for (const j of result.journals) {
                  const storeJ = journalsStore.journals.find(
                    (p) => p.year === j.year
                  )
                  if (storeJ && storeJ.meta.dateEdited < j.meta.dateEdited) {
                    console.log('Updated', j.year)
                    journalsStore.upsertJournalYear(j)
                  }
                }
              } else {
                console.log('Updating remote')
                updateRemote(journalsStore.getJournalData())
              }
            }
            return result.journals
          },
          postJournal: (jd) => updateRemote(jd),
        },
        v2: {
          syncBackup: async () => {
            const res = await fetch(`${upstream}/journal`)
            return await res.json()
          },
          postJournal: (jy, meta) => {
            console.log(meta, jy)
          },
        },
      }
}

export default useBackup
