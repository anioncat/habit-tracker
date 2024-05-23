import { AppColors } from '../config/style'

const FooterItem = ({ children }: { children: React.ReactNode }) => (
  <span className={`text-sm ${AppColors.textBlack}`}>{children}</span>
)

const Footer = () => (
  <footer
    className={`flex items-center gap-4 p-4 mt-auto bottom-0 left-0 w-full min-h-12 box-border ${AppColors.bgToolbar}`}>
    <FooterItem>anioncat 2024.</FooterItem>
    <div className=" flex-1" />
    <FooterItem>
      <a
        href="https://github.com/anioncat/habit-tracker"
        target="_blank"
        rel="noreferrer nofollow"
        className={`underline text-inherit ${AppColors.hoverTextPrimary}`}>
        Source Code
      </a>
    </FooterItem>
  </footer>
)

export default Footer
