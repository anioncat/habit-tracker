export type AppTheme = 'system' | 'light' | 'dark'

export type AppPreferences = {
  theme: AppTheme
}

/**
 * Add to all subcategories so a sync can update to the latest version as denoted by the parent's higher edit date
 */
export type MetaData = {
  dateCreated: number
  dateEdited: number
  schemaVersion: string
  appVersion: string
}

export type Scale = null | 1 | 2 | 3 | 4 | 5

export type Badge = boolean

export type EntryData = {
  id: number
  name: string
  data: Scale | Badge[]
  comment: string
  isScale: boolean
}

export type Entry = {
  meta: MetaData
  data: EntryData
}

export type JournalDay = {
  month: number
  date: number
  entries: Entry[]
  meta: MetaData
}

export type JournalYear = {
  year: number
  entries: JournalDay[]
  meta: MetaData
}
