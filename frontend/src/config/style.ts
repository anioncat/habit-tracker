type AppColorTargets = 'bg' | 'text' | 'border'

type AppColorMods = 'focus' | 'disabled' | 'hover' | null

export const AppColor = {
  // Text
  blackText: 'text-latte-text',
  blackBg: 'bg-latte-text',
  whiteText: 'text-latte-base',

  // Toolbar
  toolbarText: 'text-latte-crust',
  toolbarBg: 'bg-latte-crust',

  // Border
  borderColor: 'border-latte-overlay-2',
  borderFocus: 'focus:border-latte-mauve',

  // Disabled
  disabledButtonBg: 'disabled:bg-latte-overlay-1',
  disabledBg: 'bg-latte-overlay-1',

  // Background
  backgroundColor: 'bg-latte-base',

  // Primary
  primaryText: 'text-latte-mauve',
  primaryBg: 'bg-latte-mauve',
  primaryAnchorChildHover: '[&_a]:hover:text-latte-mauve',
  primaryHoverText: 'hover:text-latte-mauve',
  primaryBorder: 'border-latte-mauve',

  // Secondary
  secondaryBg: 'bg-latte-rosewater',

  // Scores
  score0Bg: 'bg-latte-red',
  score1Bg: 'bg-latte-yellow',
  score2Bg: 'bg-latte-peach',
  score3Bg: 'bg-latte-green',
  score4Bg: 'bg-latte-sky',

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
    ) as keyof Omit<typeof AppColor, 'getScore'>
    return AppColor[key]
  },
}

function title(s: string): string {
  return s[0].toUpperCase() + s.slice(1)
}
