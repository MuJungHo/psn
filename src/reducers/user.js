const defaultState = {
    users: [],
    user: {},
    userList: []
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
      default:
        return state
    }
  }