import React from 'react'
import convert from 'xml2js'
import { getmedialist } from '../utils/apis'
export default () => {
  React.useEffect(() => {
    getmedialist({ udid: 1, foid: 0, mtype: '' })
      .then((response) => {
        convert.parseString(response.data, { explicitArray : false }, (err, result) => {
          console.log(result);
        })
      })
  }, [])

  return (
    <div>medias</div>
  )
}