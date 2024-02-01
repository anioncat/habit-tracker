import { ReactNode } from 'react'

import { ScaleButtonStyle } from './scaleStyle'

type ScaleButtonProps = {
  order: number
  selected?: boolean
  onClick?: () => void
  children: ReactNode
}

export const ScaleButton = ({ order, onClick = () => null, children, selected = false } : ScaleButtonProps) => {
  return <ScaleButtonStyle onClick={onClick} $order={order} $selected={selected}>{children}</ScaleButtonStyle>
}
