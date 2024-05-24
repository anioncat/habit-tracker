export const AppColor = {
  // Text
  blackText: 'text-slate-950',
  blackBg: 'bg-slate-950',
  whiteText: 'text-slate-100',

  // Toolbar
  toolbarText: 'text-slate-100',
  toolbarBg: 'bg-slate-100',

  // Border
  borderColor: 'border-slate-950',
  borderFocus: 'focus:border-violet-800',

  // Disabled
  disabledButtonBg: 'disabled:bg-zinc-800',
  disabledBg: 'bg-zinc-800',

  // Background
  backgroundColor: 'bg-white',

  // Primary
  primaryText: 'text-violet-800',
  primaryBg: 'bg-violet-800',
  primaryAnchorChildHover: '[&_a]:hover:text-violet-800',
  primaryHoverText: 'hover:text-violet-800',
  primaryBorder: 'border-violet-800',

  // Secondary
  secondaryBg: 'bg-red-100',

  // Scores
  score0Bg: 'bg-red-500',
  score1Bg: 'bg-orange-500',
  score2Bg: 'bg-yellow-500',
  score3Bg: 'bg-lime-500',
  score4Bg: 'bg-green-500',

  getScore: (score: number | undefined): string => {
    switch (score) {
      case 0:
        return AppColor.score0Bg
      case 1:
        return AppColor.score1Bg
      case 2:
        return AppColor.score2Bg
      case 3:
        return AppColor.score3Bg
      case 4:
        return AppColor.score4Bg
      default:
        return ''
    }
  },
}
