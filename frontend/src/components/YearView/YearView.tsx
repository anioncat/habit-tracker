import { useBackupSync } from '../../hooks'
import { YearOverview } from './components/YearOverview'

const YearView = () => {
  useBackupSync()

  return <YearOverview></YearOverview>
}

export default YearView
