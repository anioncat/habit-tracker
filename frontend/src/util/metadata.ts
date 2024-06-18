import { APP_VERSION, SCHEMA_VERSION } from '../config'
import { MetaData } from '../types/ProjectTypes'

export const createMetaData = (): MetaData => {
  return {
    dateCreated: new Date().getTime(),
    dateEdited: new Date().getTime(),
    appVersion: APP_VERSION,
    schemaVersion: SCHEMA_VERSION,
  }
}

export const updateMetaData = (oldMeta: MetaData): MetaData => {
  return {
    ...createMetaData(),
    dateCreated: oldMeta.dateCreated,
  }
}
