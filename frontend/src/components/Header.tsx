import { Link, To } from 'react-router-dom'
import { AppStyle } from '../config/style'
import { ChevronLeft, Cog } from 'lucide-react'
import Button from './Button'

const Header = ({ center, linkTo }: { center?: boolean; linkTo?: To }) => {
  const content = (
    <>
      {/* <Logo /> */}
      <h1>Mood Tracker</h1>
    </>
  )

  const HeaderContent = () =>
    linkTo ? (
      <Link className="text-text" to={linkTo}>
        {content}
      </Link>
    ) : (
      content
    )

  const justify = center ? 'justify-center' : ''

  return (
    <>
      <header
        className={`
          ${justify} flex items-center gap-4 flex-row
          mb-2 pt-8 pb-4
          select-none
          bg-surface-0 text-text
          border-b-2 ${AppStyle.borderColor} drop-shadow-md
          [&_a]:no-underline [&_a]:flex [&_a]:items-center [&_a]:gap-4
          [&_h1]:font-bold [&_h1]:text-3xl [&_h1]:pr-2 [&_h1]:mb-2
        `}>
        <div
          className={`${AppStyle.mainSize} grid grid-cols-3 items-center mx-auto justify-items-center`}>
          {linkTo ? (
            <Button to={linkTo}>
              <ChevronLeft />
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <HeaderContent></HeaderContent>
          <Button onClick={() => {}} clear>
            <Cog></Cog>
          </Button>
        </div>
      </header>
    </>
  )
}

export default Header
