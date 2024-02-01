import { styled } from 'goober'

export const MonthTable = styled('table')`
  width: 100%;
`

export const MonthTableHead = styled('thead')`
  border: 0.2em solid var(--black);
`

export const MonthTableHeader = styled('th')``

export const MonthTableHeaderContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const MonthTableRow = styled('tr')``

export const MonthTableWeekHeaderRow = styled('tr')``

export const MonthTableWeekHeader = styled('td')`
  text-align: center;
`

export const WeekDay = styled('td')<{
  $blank?: boolean
  $today?: boolean
  $score?: number
}>`
  height: 2.5em;
  border: 0.2em ridge var(--black);

  ${(p) => (p.$blank ? 'background: var(--secondary);' : 'cursor: pointer;')}

  ${(p) => (p.$today ? 'border: 0.2em solid var(--primary-lite);' : undefined)}

  ${(p) =>
    p.$score !== 0 && !p.$score
      ? undefined
      : p.$score >= 0 && p.$score <= 4
      ? `background: var(--scale-${p.$score + 1});`
      : undefined}

  // Det. background colour
  

  &:hover {
    filter: brightness(0.94);
  }

  & > a {
    text-align: right;
    text-decoration: none;
    color: var(--black);
  }
`

export const WeekDayLink = styled('div')`
  width: 100%;
  height: 100%;
`
