import Program from '../views/Program'
import Programs from '../views/Programs'
import Medias from '../views/Medias'
import Daily from '../views/Daily'
import Dailys from '../views/Dailys'
import Schedule from '../views/Schedule'
import Schedules from '../views/Schedules'
import Interaction from '../views/Interaction'
import Event from '../views/Event'
import Dispatch from '../views/Dispatch'
import Status from '../views/Status'
import History from '../views/History'
import Device from '../views/Device'

const routes = [
  {
    path: '/newui/program/:pgid',
    component: Program
  },
  {
    path: '/newui/programs',
    component: Programs
  },
  {
    path: '/newui/medias',
    component: Medias
  },
  {
    path: '/newui/daily',
    component: Daily
  },
  {
    path: '/newui/dailys',
    component: Dailys
  },
  {
    path: '/newui/schedule',
    component: Schedule
  },
  {
    path: '/newui/schedules',
    component: Schedules
  },
  {
    path: '/newui/interaction',
    component: Interaction
  },
  {
    path: '/newui/event',
    component: Event
  },
  {
    path: '/newui/dispatch',
    component: Dispatch
  },
  {
    path: '/newui/status',
    component: Status
  },
  {
    path: '/newui/history',
    component: History
  },
  {
    path: '/newui/device',
    component: Device
  },
]

export default routes