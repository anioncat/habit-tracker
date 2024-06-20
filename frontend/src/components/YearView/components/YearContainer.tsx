import { AppStyle } from '../../../config/style'

export const YearContainer = ({ children }: { children: React.ReactNode }) => (
  <div
    className={`px-2 py-4 m-auto flex flex-row gap-1 overflow-scroll ${AppStyle.borderColor} border-2 rounded`}>
    {children}
  </div>
)
