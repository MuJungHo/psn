import axios from 'axios'
const baseURL = process.env.REACT_APP_DOMAIN || 'http://127.0.0.1'

export const instance = axios.create({
  baseURL: baseURL + '/psn/psn_mod',
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
export const delpg = params => postFormData('/pg.py', { cmd: 'delpg', ...params })


//daily
export const getScList = params => postFormData('/schedule.py', { cmd: 'getScList', ...params })
export const loadSc = params => postFormData('/schedule.py', { cmd: 'loadSc', ...params })
export const saveSc = params => postFormData('/schedule.py', { cmd: 'saveSc', ...params })

//schedule
export const getNsList = params => postFormData('/schedule.py', { cmd: 'getNsList', ...params })
export const loadNs = params => postFormData('/schedule.py', { cmd: 'loadNs', ...params })
export const saveNs = params => postFormData('/schedule.py', { cmd: 'saveNs', ...params })

//dp
export const getdplist = params => postFormData('/dp.py', { cmd: 'getdplist', ...params })
export const GetAllDp = params => postFormData('/dp.py', { cmd: 'GetAllDp', ...params })
export const getDpDetail = params => postFormData('/dp.py', { cmd: 'getDpDetail', ...params })
export const getDpHardware = params => postFormData('/dp.py', { cmd: 'getDpHardware', ...params })
export const getDpSoftware = params => postFormData('/dp.py', { cmd: 'getDpSoftware', ...params })
export const GetRecentClientLog = params => postFormData('/dp.py', { cmd: 'GetRecentClientLog', ...params })

//screen_download
export const screen_download = params => postFormData('/screen_download.py', { ...params })

//dispatch
export const dispatch_sch = params => postFormData('/dispatch.py', { cmd: 'dispatch_sch', ...params })
export const getDPHHistory = params => postFormData('/dispatch.py', { cmd: 'getDPHHistory', ...params })
export const getDPHState = params => postFormData('/dispatch.py', { cmd: 'getDPHState', ...params })