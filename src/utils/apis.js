import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  timeout: 10000
})

const postFormData = (uri, data) => {
  const formData = new FormData()
  Object.keys(data).forEach(key => {
    formData.append(key, data[key])
  })
  return instance.post(uri, formData)
}


//media
export const getmedialist = params => postFormData('/psn/psn_mod/media.py', { cmd: 'getmedialist', ...params })
export const saveLabelInfo = params => postFormData('/psn/psn_mod/media.py', { cmd: 'saveLabelInfo', ...params })

//program
export const savePgInfo = params => postFormData('/psn/psn_mod/pg.py', { cmd: 'savePgInfo', ...params })
export const getPgInfo = params => postFormData('/psn/psn_mod/pg.py', { cmd: 'getPgInfo', ...params })
export const getPgPreviewInfoFromEdit = params => postFormData('/psn/psn_mod/pg.py', { cmd: 'getPgPreviewInfoFromEdit', ...params })
export const getPgLstByUdid = params => postFormData('/psn/psn_mod/pg.py', { cmd: 'getPgLstByUdid', ...params })
export const postScreenshot = params => postFormData('/psn/psn_mod/pg.py', { cmd: 'postScreenshot', ...params })
export const getPgctInfo = params => postFormData('/psn/psn_mod/pg.py', { cmd: 'getPgctInfo', ...params })
export const updatePgct = data => instance({
  method: "post",
  url: '/psn/psn_mod/pg.py',
  data
})


//daily
export const getScList = params => postFormData('/psn/psn_mod/schedule.py', { cmd: 'getScList', ...params })

//schedule
export const getNsList = params => postFormData('/psn/psn_mod/schedule.py', { cmd: 'getNsList', ...params })

//device
export const getdplist = params => postFormData('/psn/psn_mod/dp.py', { cmd: 'getdplist', ...params })
export const GetAllDp = params => postFormData('/psn/psn_mod/dp.py', { cmd: 'GetAllDp', ...params })

//dispatch
export const dispatchSch = params => postFormData('/psn/psn_mod/dispatch.py', { cmd: 'dispatch_sch', ...params })