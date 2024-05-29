import { AppStyle } from '../config/style'

const FooterItem = ({ children }: { children: React.ReactNode }) => (
  <span
    className={`text-sm ${AppStyle.blackText} [&_a]:underline [&_a]:text-inherit ${AppStyle.primaryAnchorChildHover}`}>
    {children}
  </span>
)

const Footer = () => (
  <footer
    className={`flex items-center gap-4 p-4 mt-auto bottom-0 left-0 w-full min-h-12 box-border ${AppStyle.toolbarBg}`}>
    <FooterItem>anioncat 2024.</FooterItem>
    <div className=" flex-1" />
    <FooterItem>
      <a
        href="https://github.com/anioncat/habit-tracker"
        target="_blank"
        rel="noreferrer nofollow">
        Source Code
      </a>
    </FooterItem>
  </footer>
)

export default Footer
