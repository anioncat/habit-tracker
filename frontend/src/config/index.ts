/// <reference types="node" />

const env = (process.env.NODE_ENV || 'development') as 'development' | 'production'

export * from './appInfo'

