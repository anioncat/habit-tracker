import BadgeEntry from './BadgeEntry'
import { EntryComment } from './EntryComment'
import ScaleEntry from './ScaleEntry'
import { Entry, JournalDay } from '../../../types/ProjectTypes'

export type EntryProps = {
  entry: Entry
  jDay: JournalDay
}

const EntryContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col">{children}</div>
)

const EntryName = ({ eName }: { eName: string }) => (
  <h3 className="text-xl font-semibold">{eName}</h3>
)

const Spacer = () => <div className="h-2"></div>

const DayEntry = ({ entry, jDay }: EntryProps) => {
  return (
    <EntryContainer>
      <EntryName eName={entry.data.name}></EntryName>
      {entry.data.isScale ? (
        <ScaleEntry entry={entry} jDay={jDay} />
      ) : (
        <BadgeEntry />
      )}
      <Spacer />
      {/* Comment section */}
      <EntryComment entry={entry} jDay={jDay} />
    </EntryContainer>
  )
}

export default DayEntry
