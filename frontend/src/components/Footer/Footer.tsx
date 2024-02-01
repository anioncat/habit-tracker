import { Link } from 'react-router-dom'

import { Container, FooterItem } from './footerStyle'

const Footer = () =>
  <Container>
    <FooterItem>anioncat 2024.</FooterItem>
    <div style={{ flex: 1 }} />
    <FooterItem><a href="https://github.com/anioncat/habit-tracker" target="_blank" rel="noreferrer nofollow">Source Code</a></FooterItem>


  </Container>

export default Footer
