import { Link, LinkProps, To } from 'react-router-dom'

import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { AppColor } from '../config/style'

type BaseButtonProps = {
  children?: ReactNode
  icon?: JSX.Element
  secondary?: boolean
}

type AnchorButtonProps = {
  href: string
} & BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement>

type LinkButtonProps = {
  to: To
} & BaseButtonProps &
  LinkProps

type ButtonButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>

type ButtonProps = AnchorButtonProps | ButtonButtonProps | LinkButtonProps

const Button = ({
  type = 'button',
  children,
  icon,
  secondary,
  ...props
}: ButtonProps) => {
  const colors = `${secondary ? AppColor.secondaryBg : AppColor.primaryBg} ${
    AppColor.whiteText
  }`
  const spacing = `m-0 border-0 rounded inline-flex gap-2 ${
    icon ? 'p-1' : 'py-2 px-5'
  }`
  const text = 'font-semibold text-sm'
  const alignment = 'justify-center items-center'
  const active = 'active:brightness-90 hover:brightness-110'
  const disabled = `disabled:filter-none ${AppColor.disabledButtonBg} disabled:opacity-80 disabled:cursor-default`
  const buttonStyle = `appearance-none cursor-pointer ${spacing} ${colors} ${text} ${alignment} ${active} ${disabled}`

  // Select which element to use.
  // This is done because the `as` prop didn't work well with goober
  if ('href' in props) {
    return (
      <a
        className={buttonStyle}
        type={type as ButtonHTMLAttributes<HTMLButtonElement>['type']}
        {...props}>
        {icon}
        {children}
      </a>
    )
  } else if ('to' in props) {
    return (
      <Link
        className={buttonStyle}
        type={type as ButtonHTMLAttributes<HTMLButtonElement>['type']}
        {...props}>
        {icon}
        {children}
      </Link>
    )
  } else {
    return (
      <button
        className={buttonStyle}
        type={type as ButtonHTMLAttributes<HTMLButtonElement>['type']}
        {...props}>
        {icon}
        {children}
      </button>
    )
  }
}

export default Button
