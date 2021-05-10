const defaultState = {
  status: true
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_DRAWER': {
      return {
        status: action.status
      }
    }
    default:
      return state
  }
}