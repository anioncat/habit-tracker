type AppColorTargets = 'bg' | 'text' | 'border'

type AppColorMods = 'focus' | 'disabled' | 'hover' | null

export const AppColor = {
  // Text
  blackText: 'text-text',
  blackBg: 'bg-text',
  whiteText: 'text-base',
  whiteTextHover: 'hover:text-base',
  whiteBg: 'bg-base',

  // Toolbar
  toolbarText: 'text-crust',
  toolbarBg: 'bg-crust',

  // Border
  borderColor: 'border-overlay-2',
  borderFocus: 'focus:border-primary',
  borderHover: 'hover:border-primary',

  // Disabled
  disabledButtonBg: 'disabled:bg-overlay-1',
  disabledBg: 'bg-overlay-1',

  // Background
  backgroundColor: 'bg-mantle',

  // Primary
  primaryText: 'text-primary',
  primaryBg: 'bg-primary',
  primaryAnchorChildHover: '[&_a]:hover:text-primary',
  primaryHoverText: 'hover:text-primary',
  primaryBorder: 'border-primary',

  // Secondary
  secondaryBg: 'bg-secondary',

  // Special
  monthHover: 'hover:bg-surface-0',

  // Scores
  score0Bg: 'bg-score0',
  score1Bg: 'bg-score1',
  score2Bg: 'bg-score2',
  score3Bg: 'bg-score3',
  score4Bg: 'bg-score4',

  getScore: (
    score: number | undefined,
    target: AppColorTargets,
    modifier: AppColorMods = null
  ): string => {
    if (score === undefined || score < 0 || score > 4) {
      return ''
    }
    const key = (
      modifier ? modifier + ':' : '' + 'score' + score + title(target)
    ) as keyof Omit<typeof AppColor, 'getScore' | 'monthHover'>
    return AppColor[key]
  },
}

function title(s: string): string {
  return s[0].toUpperCase() + s.slice(1)
}
