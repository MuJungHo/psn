import Media from '../views/Media'
import Program from '../views/Program'
import DailySchedule from '../views/DailySchedule'
import MonthlySchedule from '../views/MonthlySchedule'
import Event from '../views/Event'
import Interaction from '../views/Interaction'
import Dispatch from '../views/Dispatch'
import DispatchStatus from '../views/DispatchStatus'
import History from '../views/History'
import Device from '../views/Device'
const routes = [
  {
    path: '/media',
    component: Media
  },
  {
    path: '/program',
    component: Program
  },
  {
    path: '/daily',
    component: DailySchedule
  },
  {
    path: '/monthly',
    component: MonthlySchedule
  },
  {
    path: '/event',
    component: Event
  },
  {
    path: '/interaction',
    component: Interaction
  },
  {
    path: '/dispatch',
    component: Dispatch
  },
  {
    path: '/status',
    component: DispatchStatus
  },
  {
    path: '/history',
    component: History
  },
  {
    path: '/device',
    component: Device
  },
]

export default routes