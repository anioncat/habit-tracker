import { ReactNode } from 'react'

export const PreferenceItem = ({
  label,
  children: pref,
}: {
  label: string
  children: ReactNode
}) => {
  return (
    <div className="flex flex-row justify-between w-full mt-2 mb-2">
      <span>{label}</span>
      {pref}
    </div>
  )
}
