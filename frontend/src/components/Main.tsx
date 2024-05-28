import { HTMLAttributes } from 'react'
import { AppColor } from '../config/style'

interface MainProps extends HTMLAttributes<HTMLElement> {
  wide?: boolean
}

const Main = ({ wide, ...props }: MainProps) => {
  const mWidth = wide ? 'max-w-screen-xl' : 'max-w-screen-md'
  return (
    <main
      className={`${mWidth} w-full py-4 px-2 box-border my-0 mx-auto pb-12 min-w-[360px] ${AppColor.backgroundColor}`}
      {...props}>
      {props.children}
    </main>
  )
}

export default Main
