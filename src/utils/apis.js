import axios from 'axios'
const baseURL = process.env.REACT_APP_DOMAIN || 'http://127.0.0.1'

export const instance = axios.create({
  baseURL:  baseURL  + '/psn/psn_mod',
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
export const getmedialist = params => postFormData('/media.py', { cmd: 'getmedialist', ...params })
export const saveLabelInfo = params => postFormData('/media.py', { cmd: 'saveLabelInfo', ...params })

//program
export const savePgInfo = params => postFormData('/pg.py', { cmd: 'savePgInfo', ...params })
export const getPgInfo = params => postFormData('/pg.py', { cmd: 'getPgInfo', ...params })
export const getPgPreviewInfoFromEdit = params => postFormData('/pg.py', { cmd: 'getPgPreviewInfoFromEdit', ...params })
export const getPgLstByUdid = params => postFormData('/pg.py', { cmd: 'getPgLstByUdid', ...params })
export const postScreenshot = params => postFormData('/pg.py', { cmd: 'postScreenshot', ...params })
export const getPgctInfo = params => postFormData('/pg.py', { cmd: 'getPgctInfo', ...params })
export const updatePgct = data => instance({
  method: "post",
  url: '/pg.py',
  data
})
export const getscriptlist = params => postFormData('/pg.py', { cmd: 'getscriptlist', ...params })


//daily
export const getScList = params => postFormData('/schedule.py', { cmd: 'getScList', ...params })

//schedule
export const getNsList = params => postFormData('/schedule.py', { cmd: 'getNsList', ...params })

//device
export const getdplist = params => postFormData('/dp.py', { cmd: 'getdplist', ...params })
export const GetAllDp = params => postFormData('/dp.py', { cmd: 'GetAllDp', ...params })

//dispatch
export const dispatchSch = params => postFormData('/dispatch.py', { cmd: 'dispatch_sch', ...params })