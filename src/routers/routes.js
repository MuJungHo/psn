import Program from '../views/Program'
import Programs from '../views/Programs'
import Medias from '../views/Medias'

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
]

export default routes