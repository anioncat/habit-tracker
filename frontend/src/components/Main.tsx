import { HTMLAttributes } from 'react'
import { AppStyle } from '../config/style'
import { Header } from '.'
import { To } from 'react-router-dom'

interface MainProps extends HTMLAttributes<HTMLElement> {
  backLink?: To
  wide?: boolean
}

const Main = ({ wide, backLink, ...props }: MainProps) => {
  const mWidth = wide ? 'max-w-screen-xl' : 'max-w-screen-md'
  return (
    <div>
      <Header center linkTo={backLink}></Header>
      <main
        className={`
          ${mWidth} w-full min-w-[360px]
          py-4 px-2 pb-12
          box-border 
          my-0 mx-auto 
          ${AppStyle.backgroundColor} text-text
        `}
        {...props}>
        {props.children}
      </main>
    </div>
  )
}

export default Main
