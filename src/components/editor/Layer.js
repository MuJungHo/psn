import React from 'react'
import Anchor from './Anchor'
import Guide from './Guide'
export default ({
  layer,
  board,
  setLayers,
  layers,
  program,
  activeLayer,
  setActiveLayer,
  workSpace
}) => {
  const baseURL = process.env.REACT_APP_DOMAIN || 'http://127.0.0.1'
  const psn = baseURL + '/psn'
  const mf = baseURL + '/mf'
  const [start, setStart] = React.useState(null)
  const tops = layers.filter(l => l.ptid !== layer.ptid).map(l => l.top)
  const bottoms = layers.filter(l => l.ptid !== layer.ptid).map(l => l.top + l.height)
  const lefts = layers.filter(l => l.ptid !== layer.ptid).map(l => l.left)
  const rights = layers.filter(l => l.ptid !== layer.ptid).map(l => l.left + l.width)
  const layerXs = tops.concat(bottoms)
  const layerYs = lefts.concat(rights)
  const [layerImage, setLayerImage] = React.useState('')

  React.useEffect(() => {
    if (activeLayer.file) {
      toDataURL(filePath(), (dataUrl) => {
        setLayerImage(dataUrl)
      })
    }
  }, [activeLayer.file])
  React.useEffect(() => {
    toDataURL(filePath(), (dataUrl) => {
      setLayerImage(dataUrl)
    })
  }, [])
  React.useEffect(() => {
    if (JSON.stringify(start) !== JSON.stringify({}) && start !== null) {
      board.current.addEventListener('mousemove', drag)
      board.current.addEventListener('mouseup', endDrag)
    }
  }, [start])
  const handleUpdateLayer = updatedLayer => {
    setLayers(layers.map(layer => {
      if (layer.ptid === updatedLayer.ptid) return { ...updatedLayer }
      else return { ...layer }
    }))
  }
  const offset = ({ position, x, y }) => {
    if (position === 'left-top')
      handleUpdateLayer({
        ...layer,
        left: layer.left + x,
        top: layer.top + y,
        width: layer.width - x,
        height: layer.height - y
      })
    if (position === 'right-top')
      handleUpdateLayer({
        ...layer,
        top: layer.top + y,
        width: layer.width + x,
        height: layer.height - y
      })
    if (position === 'left-bottom')
      handleUpdateLayer({
        ...layer,
        left: layer.left + x,
        width: layer.width - x,
        height: layer.height + y
      })
    if (position === 'right-bottom')
      handleUpdateLayer({
        ...layer,
        width: layer.width + x,
        height: layer.height + y
      })
  }
  const startDrag = e => {
    setStart({ left: e.clientX, top: e.clientY })
  }
  const endDrag = () => {
    setStart({})
    board.current.removeEventListener('mousemove', drag)
  }
  const drag = e => {
    var newLeft = Math.round(layer.left + e.x - start.left)
    var newTop = Math.round(layer.top + e.y - start.top)
    var newRight = Math.round(layer.left + e.x - start.left + layer.width)
    var newBottom = Math.round(layer.top + e.y - start.top + layer.height)
    if (newLeft < 0) newLeft = 0
    if (newTop < 0) newTop = 0
    if (newRight > workSpace.width) newLeft = workSpace.width - layer.width
    if (newBottom > workSpace.height) newTop = workSpace.height - layer.height
    if (layerYs.some(layerY => Math.abs(layerY - newLeft) < 10)) {
      newLeft = layerYs.find(layerY => Math.abs(layerY - newLeft) < 10)
    }
    if (layerXs.some(layerX => Math.abs(layerX - newTop) < 10)) {
      newTop = layerXs.find(layerX => Math.abs(layerX - newTop) < 10)
    }
    if (layerYs.some(layerY => Math.abs(layerY - newRight) < 10)) {
      newLeft = layerYs.find(layerY => Math.abs(layerY - newRight) < 10) - layer.width
    }
    if (layerXs.some(layerX => Math.abs(layerX - newBottom) < 10)) {
      newTop = layerXs.find(layerX => Math.abs(layerX - newBottom) < 10) - layer.height
    }
    handleUpdateLayer({
      ...layer,
      left: newLeft,
      top: newTop
    })
  }
  const isGuideShow = (name) => {
    if (name === 'top') {
      return layerXs.some(layerX => Math.abs(layerX - layer.top) < 10)
    }
    if (name === 'bottom') {
      return layerXs.some(layerX => Math.abs(layerX - layer.top - layer.height) < 10)
    }
    if (name === 'left') {
      return layerYs.some(layerY => Math.abs(layerY - layer.left) < 10)
    }
    if (name === 'right') {
      return layerYs.some(layerY => Math.abs(layerY - layer.left - layer.width) < 10)
    }
  }
  function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  const filePath = () => {
    if (layer.mtype === 'btn') {
      return layer.btn_bg_mid === '0'
        ? `${mf}/pg/temp/${program.tempFolderId}/${program.targetFolder}_${layer.ptid}_0.png`
        : `${mf}/_preview/${layer.btn_bg_mname.split('.')[0]}.jpg`
    }
    if (layer.file) {
      return `${mf}/_preview/${layer.file.split('.')[0]}.jpg`
    } else {
      return `${psn}/images/module/ico-${{
        'image': 'pix',
        'video': 'film',
        'stream': 'stream',
        'url': 'ie',
        'time': 'clock',
        'pdf': 'pdf',
        'ppt': 'ppt',
        'youtube': 'youtube'
      }[layer.mtype]}.svg`
    }
  }
  const focus = () => {
    setActiveLayer({ ...layer })
  }
  const blur = () => {
    setActiveLayer({})
  }
  return (
    <g
      onFocus={focus}
      // onBlur={blur}
      tabIndex="-1"
    >
      <rect
        style={{
          fill: 'white',
          stroke: layer.ptid === activeLayer.ptid ? 'red' : '',
          strokeWidth: 1,
          fillOpacity: '.5'
        }}
        x={layer.left}
        y={layer.top}
        width={layer.width}
        height={layer.height}
      />
      <image
        xlinkHref={layerImage}
        x={layer.left}
        y={layer.top}
        width={layer.width}
        height={layer.height}
        onMouseDown={startDrag}
      />
      {
        layer.ptid === activeLayer.ptid
          ?
          <>
            <Anchor
              position="left-top"
              board={board}
              cx={layer.left}
              cy={layer.top}
              layer={layer}
              offset={offset}
            />
            <Anchor
              position="right-top"
              board={board}
              cx={layer.left + layer.width}
              cy={layer.top}
              layer={layer}
              offset={offset}
            />
            <Anchor
              position="left-bottom"
              board={board}
              cx={layer.left}
              cy={layer.top + layer.height}
              layer={layer}
              offset={offset}
            />
            <Anchor
              position="right-bottom"
              board={board}
              cx={layer.left + layer.width}
              cy={layer.top + layer.height}
              layer={layer}
              offset={offset}
            />
          </>
          : null
      }

      {/* <Guide x1={layer.left - 100} y1={layer.top} x2={layer.left + layer.width + 100} y2={layer.top} show={isGuideShow('top')} />
      <Guide x1={layer.left - 100} y1={layer.top + layer.height} x2={layer.left + layer.width + 100} y2={layer.top + layer.height} show={isGuideShow('bottom')} />
      <Guide x1={layer.left} y1={layer.top - 100} x2={layer.left} y2={layer.top + layer.height + 100} show={isGuideShow('left')} />
      <Guide x1={layer.left + layer.width} y1={layer.top - 100} x2={layer.left + layer.width} y2={layer.top + layer.height + 100} show={isGuideShow('right')} /> */}
    </g>
  )
}