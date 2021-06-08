const defaultState = {
  program: {
    bgcolor: "",
    bgimage: "0"
  }
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_PROGRAM': {
      return {
        program: {
          ...action.program
        }
      }
    }
    default:
      return state
  }
}