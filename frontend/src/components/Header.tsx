import { Link, To } from 'react-router-dom'

const Header = ({ center, linkTo }: { center?: boolean; linkTo?: To }) => {
  const content = (
    <>
      {/* <Logo /> */}
      <h1 className="font-bold text-2xl">Mood Tracker</h1>
    </>
  )

  const HeaderContent = () =>
    linkTo ? <Link to={linkTo}>{content}</Link> : content

  const justify = center ? 'justify-center' : ''

  return (
    <header className={`${justify} flex items-center mb-4 gap-4 select-none`}>
      <HeaderContent></HeaderContent>
    </header>
  )
}

export default Header
