import { ReactNode } from 'react'
import { AppColor } from '../../../config/style'

type ScaleButtonProps = {
  order: number
  selected?: boolean
  onClick?: () => void
  children: ReactNode
}

export const ScaleButton = ({
  order,
  onClick = () => null,
  children,
  selected = false,
}: ScaleButtonProps) => {
  const selection = selected ? `${AppColor.getScore(order)}` : ''
  return (
    <button
      className={`m-0 border-0 rounded-2xl ${selection}`}
      onClick={onClick}>
      {children}
    </button>
  )
}
