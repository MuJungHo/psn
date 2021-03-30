import axios from 'axios'

export const instance = axios.create({
    baseURL: process.env.REACT_APP_API_DOMAIN,
    timeout: 10000
})

//auth
export const loginUser = ({ accountID, password }) => instance.post('/pg.py', { accountID, password })

//billing
export const deposit = activateCode => instance.post('/licence/deposit', { activateCode })
export const getCostLogReports = () => instance.post('/costLog/getCostLogReports', {})

//company
export const getInfoCompany = comUUID => instance.post('/com/getInfoCompany', { comUUID })
export const createCompany = company => instance.post('/com/createCompany', company)
export const updateCompany = company => instance.post('/com/updateCompany', company)

//department
export const fetchAllDeps = () => instance.post('/dep/fetchAllDeps', {})
export const createDep = department => instance.post('/dep/createDep', department)
export const deleteDep = depUUID => instance.post('/dep/deleteDep', { depUUID })
export const updateDep = department => instance.post('/dep/updateDep', department)

//device
export const deviceLogout = deviceToken => instance.post('/clientDevice/deviceLogout', { deviceToken })
export const listDevices = () => instance.post('/clientDevice/listDevices', {})

//face
export const faceDetect = image => instance.post('/face/faceDetect', { image })
export const verifyImage = (visitorName, formImage) => instance.post('/face/verifyImage', { visitorName, formImage })


//form
export const fetchAllFormList = () => instance.post('/form/fetchAllFormList', {})
export const getFormInfo = uuid => instance.post('/form/getFormInfo', { uuid })
export const updateForm = form => instance.post('/form/updateForm', form)
export const deleteForm = uuid => instance.post('/form/deleteForm', { uuid })
export const createForm = form => instance.post('/form/createForm', form)

//layout
export const updateClientLayout = layout => instance.post('/clientLayout/updateClientLayout', layout)
export const getInfoClientLayout = () => instance.post('/clientLayout/getInfoClientLayout', {})

//license
export const faceFeature = activateCode => instance.post('/licence/faceFeature', { activateCode })

//review
export const createItem = review => instance.post('/reviewItem/createItem', review)
export const fetchFormRelatedItems = formUUID => instance.post('/reviewItem/fetchFormRelatedItems', { formUUID })
export const getItemInfo = itemUUID => instance.post('/reviewItem/getItemInfo', itemUUID)
export const updateReviewItem = reviewItem => instance.post('/reviewItem/updateReviewItem', reviewItem)

//user
export const fetchUserInfo = userUUID => instance.post('/user/fetchUserInfo', userUUID)
export const listUsers = () => instance.post('/user/listUsers', {})
export const create = user => instance.post('/user/create', user)
export const deleteUser = userUUID => instance.post('/user/deleteUser', { userUUID })
export const updateUser = user => instance.post('/user/updateUser', user)

//visitor
export const createVisitor = visitor => instance.post('/visitor/createVisitor', visitor)
export const getInfoVisitor = visitorUUID => instance.post('/visitor/getInfoVisitor', visitorUUID)
export const fetchFormRelatedVisitors = formUUID => instance.post('/visitor/fetchFormRelatedVisitors', { formUUID })
