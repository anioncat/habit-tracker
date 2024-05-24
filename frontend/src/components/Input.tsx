import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react'
import { AppColor } from '../config/style'

type InputProps = {
  type?: string
}

const Input = forwardRef(
  (
    { type, ...props }: InputProps & InputHTMLAttributes<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <input
      className={`
          border
          border-solid
          ${AppColor.borderColor}
          ${AppColor.backgroundColor}
          rounded
          py-3
          px-4
          w-full
          box-border
          ${type === 'textarea' && 'resize-y'}
          transition-shadow
          ${AppColor.blackText}
          m-0
          focus:outline-0
          focus:shadow-inner
          ${AppColor.borderFocus}
        `}
      id={props.id ?? props.name}
      {...props}
      type={type}
      ref={ref}
    />
  )
)

export default Input
