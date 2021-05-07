const DRAWER_ACTIONS = {
    GET: 'GET_DRAWER',
    SET: 'SET_DRAWER',
}

export const setDrawerStatus = status => ({
    type: DRAWER_ACTIONS.SET,
    status
})
