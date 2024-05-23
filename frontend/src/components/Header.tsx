import { Link, To } from 'react-router-dom'

const Header = ({ center, linkTo }: { center?: boolean; linkTo?: To }) => {
  const content = (
    <>
      {/* <Logo /> */}
      <h1>Mood Tracker</h1>
    </>
  )

  const HeaderContent = () =>
    linkTo ? <Link to={linkTo}>{content}</Link> : content

  const justify = center ? 'justify-center' : ''

  return (
    <header
      className={`${justify} flex items-center mb-4 gap-4 select-none [&_a]:text-inherit [&_a]:no-underline [&_a]:flex [&_a]:items-center [&_a]:gap-4 [&_h1]:font-bold [&_h1]:text-2xl [&_h1]:pr-2 [&_h1]:mb-2`}>
      <HeaderContent></HeaderContent>
    </header>
  )
}

export default Header
