import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react'
import { StyledInput } from './inputStyle'

type InputProps = {
  type?: string
}

const Input = forwardRef(({ type, ...props }: InputProps & InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) => <StyledInput
    id={props.id ?? props.name}
    {...props}
    as={type === 'select' ? 'select' : 'input'}
    type={type}
    ref={ref}
  / >
)

export default Input
