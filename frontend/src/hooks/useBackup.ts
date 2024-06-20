import _ from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useJournalDayStore, useJournalsStore } from '../stores'
import { usePreferenceStore } from '../stores/usePreferenceStore'
import { JournalsData, JournalYear, MetaData } from '../types/ProjectTypes'

interface V1Api {
  syncBackup: () => Promise<JournalYear[]>
  postJournal: (jd: JournalsData) => void
}

interface V2Api {
  syncBackup: () => Promise<JournalYear[]>
  postJournal: (meta: MetaData, jy: JournalYear[]) => void
}

type ApiVersion = 'v1' | 'v2'

type NotImplementedError = Error

const NotImplementedError = (message = 'function not implemented') => {
  return { name: 'NotImplementedError', message }
}

const useBackup = (version: ApiVersion) => {
  const backupAddr = usePreferenceStore((s) => s.backupAddr)
  const upstream = backupAddr.split('/').join('/')
  const journalsStore = useJournalsStore((s) => s)
  const { journal, set: setUpdatedJournal } = useJournalDayStore((s) => s)

  const [upstreamOnline, setUpstreamOnline] = useState(false)

  const checkConnection = useCallback(() => {
    console.log('Checking for connection to', upstream)
    let statusCode = 400
    fetch(`${upstream}/ping`, { mode: 'cors' })
      .then((res) => {
        res.json().then(() => {
          setUpstreamOnline(true)
        })
        statusCode = res.status
      })
      .catch((err) => {
        setUpstreamOnline(false)
        console.log(err)
      })
    return statusCode
  }, [upstream])

  // Generic ping to endpoint
  useEffect(() => {
    if (upstream === '') {
      console.log('No upstream store')
      setUpstreamOnline(false)
    } else {
      checkConnection()
      const int = setInterval(checkConnection, 30_000)
      return () => clearInterval(int)
    }
  }, [upstream])

  const updateRemote = (jd: JournalsData) => {
    return fetch(`${upstream}/journal`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jd),
    })
  }

  const updateLocal = (resultJournals: JournalYear[]) => {
    console.log('Updating local')
    for (const j of resultJournals) {
      const storeJ = journalsStore.journals.find((p) => p.year === j.year)
      if (!storeJ) {
        // Remote has new year entry
        console.log('Added', j.year)
        journalsStore.upsertJournalYear(j)
      } else {
        if (
          !_.isEqual(storeJ.meta, j.meta) &&
          storeJ.meta.dateEdited < j.meta.dateEdited
        ) {
          console.log('Updated', j.year)
          journalsStore.upsertJournalYear(j)
          if (j.year === journal.year) {
            setUpdatedJournal(j)
          }
        }
      }
    }
  }

  const pullJournalRecords = async (result: JournalsData) => {
    const metaData = journalsStore.meta
    if (!_.isEqual(metaData, result.meta)) {
      if (metaData.dateEdited < result.meta.dateEdited) {
        updateLocal(result.journals)
      } else {
        console.log('Updating remote')
        await updateRemote(journalsStore.getJournalData())
      }
    }
  }

  const v1BackupActions: V1Api = {
    syncBackup: async () => {
      const res = await fetch(`${upstream}/journal`)
      const result = (await res.json().catch(() => undefined)) as JournalsData
      if (!result) {
        console.log('Updating remote')
        const jd = journalsStore.getJournalData()
        await updateRemote(jd)
        return jd.journals
      } else {
        await pullJournalRecords(result)
      }
      return result.journals
    },
    postJournal: (jd) => updateRemote(jd),
  }

  const v2BackupActions: V2Api = {
    syncBackup: async () => {
      // const res = await fetch(`${upstream}/journal`)
      throw NotImplementedError()
    },
    postJournal: (jy, meta) => {
      console.log(meta, jy)
      throw NotImplementedError()
    },
  }

  const getVersionedApi = () => {
    switch (version) {
      case 'v1':
        return v1BackupActions
      case 'v2':
        return v2BackupActions
      default:
        return null
    }
  }

  return useMemo(
    () => (!upstreamOnline ? null : getVersionedApi()),
    [upstreamOnline]
  )
}

export default useBackup
