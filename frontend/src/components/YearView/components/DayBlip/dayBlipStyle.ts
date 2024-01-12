import { styled } from "goober";

export const Blip = styled('div')<{$score: number, $blank: boolean}>`
  margin: 0;
  border: 0.1em solid var(--secondary);
  border-radius: 0.15em;
  width: 0.45em;
  height: 0.45em;

  ${p => p.$blank ? 'background: var(--secondary);' : undefined}

  ${p => p.$score >= 0 && p.$score <= 4 ? `background: var(--scale-${p.$score + 1});` : undefined}
`
