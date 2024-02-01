import BadgeEntry from '../BadgeEntry/BadgeEntry'
import { EntryComment } from '../EntryComment/EntryComment'
import ScaleEntry from '../ScaleEntry/ScaleEntry'
import { EntryContainer, EntryName, Spacer } from './entryStyle'
import { Entry, JournalDay } from '/src/types/ProjectTypes'

export type EntryProps = {
  entry: Entry
  jDay: JournalDay
}

const DayEntry = ({ entry, jDay }: EntryProps) => {
  return <EntryContainer>
    <EntryName>{entry.data.name}</EntryName>
    {entry.data.isScale
      ? <ScaleEntry entry={entry} jDay={jDay} />
      : <BadgeEntry />
    }
    <Spacer />
    {/* Comment section */}
    <EntryComment entry={entry} jDay={jDay}/>
  </EntryContainer>
}

export default DayEntry
