import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react'
import { AppStyle } from '../config/style'

export const Input = forwardRef(
  (
    {
      alignRight = false,
      ...props
    }: { alignRight?: boolean } & InputHTMLAttributes<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <input
      {...(props as InputHTMLAttributes<HTMLInputElement>)}
      ref={ref as ForwardedRef<HTMLInputElement>}
      className={
        AppStyle.inputStyle + (alignRight ? ' text-right' : '')
      }></input>
  )
)
