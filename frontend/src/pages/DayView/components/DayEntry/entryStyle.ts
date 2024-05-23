import { styled } from 'goober'

export const EntryContainer = styled('div')`
  display: flex;
  flex-direction: column;
`

export const EntryName = styled('h2')`
  
`

export const Spacer = styled('div')<{size?: number}>`
  height: ${p => p.size ?? 0.5}em;
`
