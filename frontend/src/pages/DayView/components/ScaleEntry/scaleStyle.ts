import { styled } from 'goober'

export const ScaleContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

export const ScaleButtonStyle = styled('button') <{ $order: number, $selected: boolean }>`
  margin: 0;
  border: 0;
  border-radius: 1em;

  ${p => p.$selected
    ? `background: var(--scale-${p.$order + 1});`
    : 'background: var(--scale-0);'
  }
`
