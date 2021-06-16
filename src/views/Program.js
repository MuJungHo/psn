import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Editor from '../components/editor/Editor'
import Button from '../components/material/Button'
import convert from 'xml2js'
import moment from 'moment'
import { getPgInfo, getPgPreviewInfoFromEdit, savePgInfo, saveLabelInfo, postScreenshot, getPgctInfo, updatePgct } from '../utils/apis'
import { useHistory } from "react-router-dom"
import html2canvas from 'html2canvas'
import { v4 as uuid } from 'uuid'
import canvg from 'canvg'
import { getCookie } from '../utils/libs'
import { setProgram } from '../actions/program'
export default () => {
  const { pgid } = useParams()
  const history = useHistory();
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(true)
  const [layers, setLayers] = React.useState([])
  const [monitors, setMonitors] = React.useState([])
  const [zoom, setZoom] = React.useState(1)
  const [pgid_tmp, setTempPgid] = React.useState()
  const [tempFolderId, setTempFolderId] = React.useState()
  const [targetFolder, setTargetFolderId] = React.useState()
  const { status } = useSelector(state => state.drawer)
  const { program } = useSelector(state => state.program)
  const { sel_udid } = useSelector(state => state.user)
  const space = {
    width: window.innerWidth - 260 - 300 - 150,
    height: window.innerHeight - 80 - 200,
    top: 0,
    left: 0
  }
  const [board, setBoard] = React.useState({})
  const uid = getCookie('login_uid') || 1
  React.useEffect(() => {
    getPgInfo({ pgid, uid })
      .then(response => {
        convert.parseString(response.data, { explicitArray: false }, (err, result) => {
          if (!err) {
            var tempZoom = result.root.pginfo.w >= result.root.pginfo.h
              ? space.width / result.root.pginfo.w
              : space.height / result.root.pginfo.h
            var tempLayouts = result.root.pginfo.layout === '' ? [] : result.root.pginfo.layout.split('|')
            var tempTypes = result.root.pginfo.mtype === '' ? [] : result.root.pginfo.mtype.split('|')
            var tempLayers = tempLayouts.map((layout, index) => ({
              left: Math.round(layout.split(',')[0] * tempZoom),
              top: Math.round(layout.split(',')[1] * tempZoom),
              width: Math.round(layout.split(',')[2] * tempZoom),
              height: Math.round(layout.split(',')[3] * tempZoom),
              mtype: tempTypes[index],
              ptid: (index + 1).toString()
            }))
            var preview_pgid_tmp = result.root.pginfo.pgid_tmp
            dispatch(setProgram({ ...result.root.pginfo }))
            setMonitors(
              result.root.pginfo.moniarea
                ? result.root.pginfo.moniarea.split('|')
                : []
            )
            setBoard({
              width: Math.round(result.root.pginfo.w * tempZoom),
              height: Math.round(result.root.pginfo.h * tempZoom),
              left: Math.round(result.root.pginfo.x * tempZoom),
              top: Math.round(result.root.pginfo.y * tempZoom),
            })
            setTempPgid(preview_pgid_tmp)
            setTempFolderId(result.root.pginfo.tempFolderId)
            setTargetFolderId(result.root.pginfo.targetFolder)
            setZoom(result.root.pginfo.w >= result.root.pginfo.h
              ? space.width / result.root.pginfo.w
              : space.height / result.root.pginfo.h)
            if (result.root.pginfo.lbl_info) {
              if (Object.keys(result.root.pginfo.lbl_info)[0] === 'label') {
                tempLayers = tempLayers.map(layer => {
                  return result.root.pginfo.lbl_info.label.$.ptid === layer.ptid
                    ? { ...layer, ...result.root.pginfo.lbl_info.label }
                    : { ...layer }
                })
              }
            }
            getPgPreviewInfoFromEdit({ preview_pgid_tmp }).then(response => {
              convert.parseString(response.data, { explicitArray: false }, async (err, result) => {
                if (!err) {
                  tempLayers = tempLayers.map(layer => {
                    var layerTemp = {}
                    if (result.root.partitions.partition) {
                      if (Object.keys(result.root.partitions.partition)[0] === '$') {
                        if (layer.ptid === result.root.partitions.partition.$.ptid) layerTemp = {
                          mtype: result.root.partitions.partition.$.type || '',
                          argv: result.root.partitions.partition.$.argv || '',
                          file: result.root.partitions.partition.$.file || '',
                          time: result.root.partitions.partition.$.time || '',
                        }
                      }
                      else {
                        var layerTemps = result.root.partitions.partition.map(layer => layer.$)
                        layerTemp = { ...layerTemps.find(l => l.ptid == layer.ptid) }
                      }
                    }
                    return {
                      ...layerTemp,
                      ...layer,
                    }
                  })
                  var getPgctInfos = tempLayers.map(layer => getPgctInfo({ pgid, pgid_tmp: preview_pgid_tmp, ptid: layer.ptid, mtype: layer.mtype }))

                  await Promise.all(getPgctInfos).then(resXMLs => {
                    setLoading(false)
                    var mappingPgctInfos = resXMLs.map(xml => {
                      var pgctInfo = {}
                      convert.parseString(xml.data, { explicitArray: false }, (err, result) => {
                        if (!err) {
                          pgctInfo = result.root
                        }
                      })
                      return pgctInfo
                    })
                    tempLayers = tempLayers.map(layer => {
                      var tempLayer = mappingPgctInfos.find(pgct => pgct.ptid === layer.ptid)
                      var layerInfos = []
                      if (tempLayer.pgct_info) {
                        if (Object.keys(tempLayer.pgct_info)[0] === '0') {

                          var tempLayerPgctInfos = tempLayer.pgct_info.filter(info => info.mid !== '0')
                          layerInfos = [...tempLayerPgctInfos.map(pgct => ({ ...pgct, uuid: uuid(), thumbnail_mid: `../mf/_preview/${pgct.mname.split('.')[0]}.jpg` }))]
                        } else {
                          layerInfos = [{ ...tempLayer.pgct_info, uuid: uuid(), thumbnail_mid: `../mf/_preview/${tempLayer.pgct_info.mname.split('.')[0]}.jpg` }]
                        }
                      }
                      //後端bug，待釐清
                      if (layer.mtype === 'btn' && layerInfos.length > 2) {
                        layerInfos = layerInfos.filter(layer => layer.mid !== '0')
                      }

                      return {
                        ...layer,
                        layerInfos
                      }
                    })
                  })
                  setLayers([...tempLayers])
                  console.log([...tempLayers])
                }
              })
            })
          }
        })
      })
  }, [])

  const handleSaveProgram = async () => {
    var mtype = layers.map(layer => layer.mtype).join('|')
    var layout = layers.map(layer => `${Math.floor(layer.left / zoom)},${Math.floor(layer.top / zoom)},${Math.floor(layer.width / zoom)},${Math.floor(layer.height / zoom)}`).join('|')
    var ptid = layers.map(layer => layer.ptid).join('|')
    var volume = layers.map(() => '').join('|')
    var ptname = layers.map(() => '').join('|')
    var interactionPtMajor = layers.map(() => '').join('|')
    var btn_action = layers.map(() => '').join('|')
    var btn_action2 = layers.map(() => '').join('|')
    var btn_action3 = layers.map(() => '').join('|')
    var btn_tgt_pgid = layers.map(() => '').join('|')
    var btn_tgt_ptid = layers.map(() => '').join('|')
    var btn_tgt_plid = layers.map(() => '').join('|')
    var btn_api_url = layers.map(() => '').join('|')
    var btn_exe_path = layers.map(() => '').join('|')
    var btn_exe_args = layers.map(() => '').join('|')
    var shuffle = layers.map(() => '').join('|')
    var moniarea = monitors.join('|')
    var params = {
      pgid: String(pgid),
      uid,
      select_udid: sel_udid,
      pgid_tmp,
      pgname: program.pgname,
      bgcolor: program.bgcolor,
      bgimage: program.bgimage,
      bgmusic: program.bgmusic,
      mtype,
      layout,
      volume,
      x: program.x,
      y: program.y,
      w: program.w,
      h: program.h,
      offset_x: 0,
      offset_y: 0,
      moniarea,
      use_moni: 0,
      auto_moni: true,
      scpid: 0,
      txtmid: '99',
      ptid,
      delLblMid: '',
      tempFolderId,
      ptname,
      interactionPtMajor,
      btn_action,
      btn_action2,
      btn_action3,
      btn_tgt_pgid,
      btn_tgt_ptid,
      btn_tgt_plid,
      btn_api_url,
      btn_exe_path,
      btn_exe_args,
      osflag: 0,
      shuffle,
      tbl_argv: '',
    }
    const labelLayers = layers.filter(layer => layer.mtype === 'btn')
    var info = new FormData()
    info.append('cmd', 'saveLabelInfo')
    info.append('jIndex', ptid)
    labelLayers.forEach(layer => {
      info.append(`info[]`, '')
      info.append(`info[${layer.ptid}][mid]`, layer.mid)
      info.append(`info[${layer.ptid}][udid]`, sel_udid)
      info.append(`info[${layer.ptid}][mtype]`, layer.mtype)
      info.append(`info[${layer.ptid}][mdesc]`, layer.mdesc)
      info.append(`info[${layer.ptid}][mtitle]`, layer.mtitle)
      info.append(`info[${layer.ptid}][argv]`, layer.margv)
      // info.append(`info[${layer.ptid}][flag]`, 1)
      // info.append(`info[${layer.ptid}][mid_BtnPs]`, layer.mid_1)
      // info.append(`info[${layer.ptid}][mdesc_BtnPs]`, layer.mdesc_1)
      // info.append(`info[${layer.ptid}][mtitle_BtnPs]`, layer.mtitle_1)
      // info.append(`info[${layer.ptid}][argv_BtnPs]`, layer.margv_1)
    })
    await saveLabelInfo(info).then(response => {
      convert.parseString(response.data, { explicitArray: false }, async (err, result) => {
      })
    })

    const pgctLayers = layers.filter(layer => layer.mtype !== 'btn')
    pgctLayers.forEach(async (layer, i) => {
      var formData = new FormData()
      layer.layerInfos.forEach((info, index) => {
        formData.append('pgct_chk', index + 1)
        formData.append(`mid_${index + 1}`, info.mid)
        formData.append(`odr_${index + 1}`, index + 1)
        formData.append(`thumbnail_mid_${index + 1}`, info.thumbnail_mid)
        formData.append(`argv_${index + 1}`, info.argv)
        formData.append(`rpt_${index + 1}`, info.rpt)
        formData.append(`t_${index + 1}`, info.t)
      })
      formData.append('cmd', 'updatePgct')
      formData.append('pgid_tmp', pgid_tmp)
      formData.append('pgid', pgid)
      formData.append('targetFolder', targetFolder)
      formData.append('tempFolderId', tempFolderId)
      formData.append('ptid', i + 1)
      formData.append('mtype', layer.mtype)
      formData.append('idx', i + 1)
      await updatePgct(formData)
    })

    savePgInfo({ ...params }).then(response => {
      convert.parseString(response.data, { explicitArray: false }, (err, result) => {
        if (!err) {
          handleCaptureScreen(result.root.pgid)
        }
      })
    })
  }

  const handleCaptureScreen = async previewPgid => {
    const svgElement = document.getElementById('board')
    const svgString = new XMLSerializer().serializeToString(svgElement)
    const svg64 = btoa(unescape(encodeURIComponent(svgString)))
    const svgBase64 = `data:image/svg+xml;base64,${svg64}`

    const canvas = document.createElement('canvas')
    canvas.width = svgElement.clientWidth
    canvas.height = svgElement.clientHeight
    const ctx = canvas.getContext('2d')
    const image = new Image()
    image.onload = function () { // async (happens later)
      // clear canvas
      ctx.clearRect(0, 0, svgElement.clientWidth, svgElement.clientHeight);
      // draw image with SVG data to canvas
      ctx.drawImage(image, 0, 0, svgElement.clientWidth, svgElement.clientHeight);
      // snapshot canvas as png
      var imgBase64 = canvas.toDataURL('image/png');
      // pass png data URL to callback

      postScreenshot({ previewPgid, previewPgname: program.pgname, imgBase64, flag: 0 }).then(() => {
        postScreenshot({ previewPgid, previewPgname: program.pgname, imgBase64, flag: 1 }).then(() => { })
      })
    };
    image.src = svgBase64;
  }

  return (
    <Editor
      layers={layers}
      setLayers={setLayers}
      monitors={monitors}
      setMonitors={setMonitors}
      board={board}
      zoom={zoom}
      setZoom={setZoom}
      save={handleSaveProgram}
      loading={loading}
    />
  )
}