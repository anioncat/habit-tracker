import { styled } from "goober";

export const YearContainer = styled('div')`
  padding: 0 0.5em 0.5em 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.1em;

  overflow-x: scroll;
`

export const YearWeekColumn = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.1em;
`