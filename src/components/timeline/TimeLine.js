import React from 'react'
import { useDrag, useDrop } from "react-dnd";
import LineAnchor from './LineAnchor'
import { v4 as uuid } from 'uuid'
const color = ['#6589e1', '#b2fcff', '#5edfff', '#3d64ff']
const hours = [...Array(24).keys()]
function useLocalDrop(onDrop, setCanDrop, setOver) {
  const ref = React.useRef();

  const [{ canDrop, isOver }, dropTarget] = useDrop({
    accept: "Card",
    drop(item, monitor) {
      const offset = monitor.getClientOffset();
      if (offset && ref.current) {
        const dropTargetXy = ref.current.getBoundingClientRect();
        onDrop({
          item,
          x: offset.x - dropTargetXy.left
        });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return elem => {
    setOver(isOver)
    setCanDrop(canDrop)
    ref.current = elem;
    dropTarget(ref);
  };
}
export default props => {
  const { param, setParam } = props
  const [activeSlot, setActiveSlot] = React.useState({})
  const [programs, setPrograms] = React.useState([])
  const [canDrop, setCanDrop] = React.useState(false)
  const [isOver, setOver] = React.useState(false)
  const tops = programs.map(p => Number(p.st))
  const bottoms = programs.map(p => Number(p.et))
  let backgroundColor = '';
  let strokeWidth = 0
  const isActive = canDrop && isOver;
  if (isActive) {
    backgroundColor = 'darkkhaki'
  }
  else if (canDrop) {
    strokeWidth = 1
  }
  const spaceWidth = window.innerWidth - 260
  const zoom = spaceWidth / 1440
  const addSlot = card => {
    const { item, x } = card
    console.log(param)
    setParam({
      ...param,
      programs: [
        ...param.programs,
        { uuid: uuid(),pgid: item.pgid, st: x, et: x + 100 }
      ]
    })
  }
  const ref = useLocalDrop(addSlot, setCanDrop, setOver);
  const dragStartLine = offsetY => {
    const st = Math.round(offsetY)
    if (st < 0) st = 0
    if (st >= activeSlot.minSt) {
      setParam({
        ...param,
        programs: programs.map(program => {
          if (program.uuid === activeSlot.uuid) return { ...program, st }
          else return { ...program }
        })
      })
    }
  }
  const dragEndLine = offsetY => {
    let et = Math.round(offsetY)
    if (et > 1440) et = 1440
    if (et <= activeSlot.maxEt) {
      setParam({
        ...param,
        programs: programs.map(program => {
          if (program.uuid === activeSlot.uuid) return { ...program, et }
          else return { ...program }
        })
      })
    }
  }
  const handleActiveSlot = program => {
    setPrograms([
      ...programs.filter(pg => pg.uuid !== program.uuid),
      { ...program }
    ])
    setActiveSlot({ ...program })
  }
  React.useEffect(() => {
    if (param.programs) {
      const sts = param.programs.map(p => Number(p.st)).sort((a, b) => a - b)
      const ets = param.programs.map(p => Number(p.et)).sort((a, b) => a - b)

      setPrograms([...param.programs.map(pg => {
        const stIndex = sts.findIndex((st) => st === Number(pg.st))
        const etIndex = ets.findIndex((et) => et === Number(pg.et))
        const minSt = Number(pg.st) === Math.min(...sts) ? 0 : ets[stIndex - 1]
        const maxEt = Number(pg.et) === Math.max(...ets) ? 1440 : sts[etIndex + 1]
        return { ...pg, minSt, maxEt }
      })])
    }
  }, [param.programs])
  return <svg
    id="timeline" xmlns="http://www.w3.org/2000/svg" version="1.1"
    width={1440}
    height={190}
    style={{ backgroundColor, margin: 'auto', marginBottom: 20, marginTop: 20 }}
    ref={ref}
  >
    <rect
      fill="transparent"
      height={190}
      width={1440}
      strokeWidth={strokeWidth}
      stroke="#bebebe"
      onClick={() => setActiveSlot({})}
    />
    {
      hours.map(hour =>
        <g key={hour} >
          <text x={60 * hour + 5} y={20} fill="#bebebe">{hour}</text>
          <line x1={60 * hour} y1={20} x2={60 * hour} y2={170} style={{ stroke: '#bebebe' }} />
        </g>)
    }
    {
      programs.map(program =>
        <g
          key={program.uuid}
          onFocus={() => handleActiveSlot(program)}
          tabIndex="-1">
          <rect
            stroke="#bebebe"
            strokeWidth={activeSlot.uuid === program.uuid ? 5 : 0}
            style={{
              fill: color[program.pgid % 4],
              fillOpacity: .5
            }}
            x={program.st}
            y={20}
            height={150}
            width={program.et - program.st}
            rx={5}
            ry={5}
          />
          {
            activeSlot.uuid === program.uuid
              ?
              <>
                <LineAnchor
                  x={Number(program.st) - 3}
                  element={document.getElementById('timeline')}
                  offset={dragStartLine}
                />
                <LineAnchor
                  x={Number(program.et) - 3}
                  element={document.getElementById('timeline')}
                  offset={dragEndLine}
                />
              </>
              : null
          }
        </g>)
    }
  </svg >
}