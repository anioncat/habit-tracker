import { ReactNode } from 'react'

export const PreferenceItem = ({
  label,
  children: pref,
}: {
  label: string
  children: ReactNode
}) => {
  return (
    <div className="flex flex-row justify-between w-full mt-4">
      <span>{label}</span>
      {pref}
    </div>
  )
}
