const USER_ACTIONS = {
    GET: 'GET_USER_INFO',
    SET: 'SET_USER_INFO',
    UPDATESELUDID: 'UPDATE_SELUDID'
}

export const setUserInfo = user => ({
    type: USER_ACTIONS.SET,
    user
})

export const getUserInfo = user => ({
    type: USER_ACTIONS.GET,
    user
})

export const updateUserSelUdid = udid => {
    document.cookie = `sel_udid=${udid}`
    return {
        type: USER_ACTIONS.UPDATESELUDID,
        udid
    }
}