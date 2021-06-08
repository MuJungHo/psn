import { getCookie } from '../utils/libs'
const defaultState = {
  user: {},
  sel_udid: ''
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_USER_INFO': {
      return {
        ...state,
        user: action.user
      }
    }
    case 'GET_USER_INFO': {
      return {
        ...state,
        user: action.user
      }
    }
    case 'UPDATE_SELUDID': {
      return {
        ...state,
        sel_udid: action.udid
      }
    }
    default:
      return state
  }
}