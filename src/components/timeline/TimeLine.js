import React from 'react'
import { useDrag, useDrop } from "react-dnd";
import LineAnchor from './LineAnchor'
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
        onDrop("local", {
          y: offset.y - dropTargetXy.top
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
  const ref = useLocalDrop(console.log, setCanDrop, setOver);
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
    width={750}
    height={1440}
    style={{ backgroundColor, margin: 'auto', marginBottom: 20, marginTop: 20 }}
    ref={ref}
  >
    <rect
      fill="transparent"
      height={1440}
      width={750}
      strokeWidth={strokeWidth}
      stroke="#bebebe"
      onClick={() => setActiveSlot({})}
    />
    {
      hours.map(hour =>
        <g key={hour} >
          <text x={0} y={60 * hour + 5} fill="#bebebe">{hour}</text>
          <line x1={20} y1={60 * hour} x2="700" y2={60 * hour} style={{ stroke: '#bebebe' }} />
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
            x={20}
            y={program.st}
            height={program.et - program.st}
            width={680}
            rx={5}
            ry={5}
          />
          {
            activeSlot.uuid === program.uuid
              ?
              <>
                <LineAnchor
                  y={Number(program.st) - 3}
                  element={document.getElementById('timeline')}
                  offset={dragStartLine}
                />
                <LineAnchor
                  y={Number(program.et) - 3}
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