import React from 'react'
import { useParams } from 'react-router-dom'
import Board from '../components/editor/Board'
import Button from '../components/material/Button'
import convert from 'xml2js'
import moment from 'moment'
import { getPgInfo, getPgPreviewInfoFromEdit, savePgInfo, saveLabelInfo, postScreenshot } from '../utils/apis'
import { useHistory } from "react-router-dom"
import html2canvas from 'html2canvas'
export default () => {
  const { pgid } = useParams()
  const history = useHistory();
  const [layers, setLayers] = React.useState([])
  const [zoom, setZoom] = React.useState(1)
  const [program, setProgram] = React.useState({})
  const [tempPgid, setTempPgid] = React.useState()
  const [tempFolderId, setTempFolderId] = React.useState()
  const boardWidth = 960
  const boardHeight = 540
  const boardTop = 0
  const boardLeft = 0
  const uid = localStorage.getItem('login_uid') || 1
  React.useEffect(() => {
    getPgInfo({ pgid, uid })
      .then(response => {
        convert.parseString(response.data, { explicitArray: false }, (err, result) => {
          if (!err) {
            var tempZoom = result.root.pginfo.w >= result.root.pginfo.h
              ? boardWidth / result.root.pginfo.w
              : boardHeight / result.root.pginfo.h
            var tempLayouts = result.root.pginfo.layout === '' ? [] : result.root.pginfo.layout.split('|')
            var tempLayers = tempLayouts.map(layout => ({
              left: layout.split(',')[0] * tempZoom,
              top: layout.split(',')[1] * tempZoom,
              width: layout.split(',')[2] * tempZoom,
              height: layout.split(',')[3] * tempZoom
            }))
            var preview_pgid_tmp = result.root.pginfo.pgid_tmp
            var labelInfoTemp = {}
            if (result.root.pginfo.lbl_info.label) {
              if (Object.keys(result.root.pginfo.lbl_info.label)[0] === '$') {
                labelInfoTemp = { '0': { ...result.root.pginfo.lbl_info.label } }
              } else {
                labelInfoTemp = result.root.pginfo.lbl_info.label.reduce(function (obj, label) {
                  obj[label.$.ptid] = { ...label, ptid: label.$.ptid }
                  return obj
                }, {})
              }
            }
            setProgram({ ...result.root.pginfo })
            setTempPgid(preview_pgid_tmp)
            setTempFolderId(result.root.pginfo.tempFolderId)
            setZoom(result.root.pginfo.w >= result.root.pginfo.h
              ? boardWidth / result.root.pginfo.w
              : boardHeight / result.root.pginfo.h)
            getPgPreviewInfoFromEdit({ preview_pgid_tmp }).then(response => {
              convert.parseString(response.data, { explicitArray: false }, (err, result) => {
                if (!err) {
                  tempLayers = tempLayers.map((layer, index) => {
                    var layerTemp = {}
                    var ptid = null
                    if (result.root.partitions.partition) {
                      if (Object.keys(result.root.partitions.partition)[0] === '$') {
                        layerTemp = { '1': { ...result.root.partitions.partition } }
                      }
                      else {
                        layerTemp = result.root.partitions.partition.reduce(function (obj, partition) {
                          obj[partition.$.ptid] = { ...partition, ptid: partition.$.ptid }
                          return obj
                        }, {})
                      }
                    }
                    ptid = layerTemp[index + 1].$.ptid

                    // var ptid = result.root.partitions.partition[index].$.ptid
                    return {
                      ...layer,
                      ...layerTemp[index + 1].$,
                      ...labelInfoTemp[ptid]
                    }
                  })
                  setLayers([...tempLayers])
                }
              })
            })
          }
        })
      })
  }, [])
  const handleSaveProgram = () => {
    var mtype = layers.map(layer => layer.type).join('|')
    var layout = layers.map(layer => `${layer.left / zoom},${layer.top / zoom},${layer.width / zoom},${layer.height / zoom}`).join('|')
    var ptid = layers.map(layer => layer.ptid).join('|')
    var params = {
      pgid: 17,
      uid: 1,
      select_udid: 1,
      pgid_tmp: tempPgid,
      pgname: 'IU Love Me',
      bgcolor: '#FF000000',
      bgimage: 0,
      bgmusic: 0,
      mtype,
      layout,
      volume: '|',
      x: program.x,
      y: program.y,
      w: program.w,
      h: program.h,
      offset_x: 0,
      offset_y: 0,
      moniarea: '0,0,1920,1080',
      use_moni: 0,
      auto_moni: true,
      scpid: 0,
      txtmid: '',
      ptid,
      delLblMid: '',
      tempFolderId,
      ptname: '|',
      interactionPtMajor: '|',
      btn_action: '|',
      btn_action2: '|',
      btn_action3: '|',
      btn_tgt_pgid: '|',
      btn_tgt_ptid: '|',
      btn_tgt_plid: '|',
      btn_api_url: '|',
      btn_exe_path: '|',
      btn_exe_args: '|',
      osflag: 0,
      shuffle: '0|0',
      tbl_argv: '',
    }
    savePgInfo({ ...params }).then(() => {
      handleCaptureScreen()
    })
  }
  const handleCaptureScreen = () => {
    html2canvas(document.getElementById('board'), {
      useCORS: true,
      allowTaint: true,
      proxy: 'http://127.0.0.1/mf'
    }).then(canvas => {
      var imgBase64 = canvas.toDataURL()
      postScreenshot({ previewPgid: pgid, previewPgname: 'IU Love Me', imgBase64, flag: 0 }).then(() => {
        postScreenshot({ previewPgid: pgid, previewPgname: 'IU Love Me', imgBase64, flag: 1 })
      })
    })
  }

  return (
    <>
      <Button variant="contained" color="primary" style={{ marginRight: '1rem' }} onClick={handleSaveProgram} >save</Button>
      <Button variant="contained" color="secondary" style={{ marginRight: '1rem' }} onClick={() => history.push(`/newui/programs`)}>back</Button>
      <Board
        layers={layers}
        setLayers={setLayers}
        boardWidth={boardWidth}
        boardHeight={boardHeight}
        boardTop={boardTop}
        boardLeft={boardLeft}
        program={program}
      />
    </>
  )
}