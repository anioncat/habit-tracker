export const WeekDayLink = ({
  linkto,
  children,
}: {
  linkto: string
  children: React.ReactNode
}) => (
  <a href={linkto} draggable="false">
    <div
      className={`w-full h-full select-none text-inherit drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold text-lg`}>
      {children}
    </div>
  </a>
)
