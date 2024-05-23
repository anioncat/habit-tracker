import { HTMLAttributes } from 'react'

interface MainProps extends HTMLAttributes<HTMLElement> {
  wide?: boolean
}

const Main = ({ wide, ...props }: MainProps) => {
  const mWidth = wide ? 'max-w-screen-xl' : 'max-w-screen-sm'
  return (
    <main
      className={`${mWidth} w-full py-4 px-1 box-border my-0 mx-auto pb-12 min-w-[360px]`}
      {...props}>
      {props.children}
    </main>
  )
}

export default Main
