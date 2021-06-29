import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDrag, useDrop } from "react-dnd";

const useStyles = makeStyles({
  cell: {
    width: '14%',
    minHeight: 60
  },
  spacer: {
    flex: 1
  }
})

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
  const {
    date,
    isPicking,
    setPicking,
    pickingRange,
    setPickingRange,
    tempEndDate,
    setTempEndDate
  } = props
  const classes = useStyles()
  const [canDrop, setCanDrop] = React.useState(false)
  const [isOver, setOver] = React.useState(false)
  const ref = useLocalDrop(console.log, setCanDrop, setOver);
  let backgroundColor = '';
  let strokeWidth = 0
  const isActive = canDrop && isOver;
  if (isActive) {
    backgroundColor = 'darkkhaki'
  }
  else if (canDrop) {
    strokeWidth = 1
  }
  const isCellActive = isPicking
    && (
      (new Date(date) >= new Date(pickingRange[0]) && new Date(date) <= new Date(tempEndDate))
      || (new Date(date) <= new Date(pickingRange[0]) && new Date(date) >= new Date(tempEndDate))
    )
  const handleClickCell = () => {
    if (isPicking) {
      setPickingRange([...pickingRange, date])
      setTempEndDate('')
    } else {
      setPickingRange([date])
      setTempEndDate(date)
    }
    setPicking(!isPicking)
  }
  const handleHoverCell = () => {
    if (isPicking) {
      setTempEndDate(date)
    }
  }
  return (
    <div
      ref={ref}
      className={classes.cell}
      onClick={handleClickCell}
      onMouseEnter={handleHoverCell}
      style={{ backgroundColor }}
    >
      {date}
    </div>
  )
}