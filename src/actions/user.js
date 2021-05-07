const USER_ACTIONS = {
    GET: 'GET_USER_INFO',
    SET: 'SET_USER_INFO',
}

export const setUserInfo = user => ({
    type: USER_ACTIONS.SET,
    user
})

export const getUserInfo = user => ({
    type: USER_ACTIONS.GET,
    user
})