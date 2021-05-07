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