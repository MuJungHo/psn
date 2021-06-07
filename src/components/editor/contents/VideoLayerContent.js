import React from 'react'
const baseURL = process.env.REACT_APP_DOMAIN || 'http://127.0.0.1'
const psn = baseURL + '/psn'
const mf = baseURL + '/mf'

export default props => {
    const { activeLayer, layers, setLayers } = props
    return (
      <div>
        {
          activeLayer.layerInfos.map(layerInfo =>
            <div key={layerInfo.uuid}>
              <img src={`${mf}/_preview/${layerInfo.mname.split('.')[0]}.jpg`} style={{ height: 30 }} />
              {layerInfo.mtitle}
              {layerInfo.t}
              {/* <TextField
                key={layerInfo.uuid}
                type="text"
                variant="outlined"
                value={layerInfo.t || ''}
                onChange={e => handleUpdateLayer(e, layerInfo.uuid)}
              /> */}
            </div>)
        }
      </div>
    )
  }
  