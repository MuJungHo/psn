import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Divider,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  CardContent,
  CardMedia,
  CircularProgress,
  Tab,
  Tabs
} from '@material-ui/core'
import Select from '../components/Select'
import Card from '../components/material/Card'
import Paper from '../components/material/Paper'
// import Pagination from '../components/Pagination'
import convert from 'xml2js'
import moment from 'moment'
import { getdplist, GetAllDp, getDPHHistory, dispatch_sch, getNsList, getDPHState } from '../utils/apis'
import Actions from '../components/Actions'
import { getCookie } from '../utils/libs'
import ConfirmDialog from '../components/ConfirmDialog'
import { DatePicker } from 'rsuite'
import DateRangePicker from '../components/date-range-picker/DateRangePicker'
import DateTimePicker from '../components/date-range-picker/DateTimePicker'
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const EnhancedTableToolbar = props => {
  const { rows } = props;

  return (
    <></>);
};


function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, tab } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = tab === 0
    ?
    [
      { id: 'dpname', numeric: false, disablePadding: false, label: '設備名稱' },
      { id: 'nsname', numeric: false, disablePadding: false, label: '排程名稱' },
      { id: 'state', numeric: false, disablePadding: false, label: '派送進度' },
      { id: 'dph_uesr', numeric: false, disablePadding: false, label: '派送者' },
      { id: 'dph_time', numeric: false, disablePadding: false, label: '派送時間' },
    ]
    :
    [
      { id: 'dpname', numeric: false, disablePadding: false, label: '設備名稱' },
      { id: 'nsname', numeric: false, disablePadding: false, label: '排程名稱' },
      { id: 'state', numeric: false, disablePadding: false, label: '派送狀態' },
      { id: 'dph_uesr', numeric: false, disablePadding: false, label: '派送者' },
      { id: 'dph_time', numeric: false, disablePadding: false, label: '派送時間' },
    ];
  return (
    <TableHead>
      <TableRow style={{ background: 'linear-gradient(transparent 20px, #f4f6f8 0) 0 -10px' }}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              style={{ color: '#888' }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    margin: 20,
    height: 'calc(100vh - 200px)'
  },
  cardContainer: {
    display: 'flex',
    '& > *:not(:first-child)': {
      marginLeft: 20
    }
  },
  card: {
    flex: 1
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  spacer: {
    flex: '1 1 auto'
  },
  tableBody: {
    '& .MuiTableCell-body': {
      fontSize: '1rem'
    }
  }
}));
export default () => {

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('date');
  const [selected, setSelected] = React.useState([]);
  const [devices, setDevices] = React.useState([])
  const [device, setDevice] = React.useState('')
  const [schedule, setSchedule] = React.useState('')
  const [schedules, setSchedules] = React.useState([])
  const [dispatchDateTime, setDispatchDateTime] = React.useState('2021/6/7')
  const [page, setPage] = React.useState(1);
  const [tab, setTab] = React.useState(0)
  const rowsPerPage = Math.floor((window.innerHeight - 370) / 53)
  const [dispatches, setDispatches] = React.useState([])
  const [isDispatchDialogOpen, setDispatchDialogOpen] = React.useState(false)
  const [dateRange, setDateRange] = React.useState([])
  const { sel_udid } = useSelector(state => state.user)
  const uid = getCookie('login_uid') || 1
  const rows = [...dispatches]
  React.useEffect(() => {
    if (sel_udid) {
      if (tab === 1) {
        getDPHHistory({
          select_udid: sel_udid,
          uid,
          start_date: 20210301,
          end_date: 20210611,
          select_datatype: 0,
        })
          .then((response) => {
            convert.parseString(response.data, { explicitArray: false }, (err, result) => {
              if (!err) {
                if (result.root.dph_history === undefined) return setDispatches([])
                if (Object.keys(result.root.dph_history)[0] === '0') {
                  setDispatches([...result.root.dph_history])
                } else {
                  setDispatches([{ ...result.root.dph_history }])
                }
              }
            })
          })
      } else {
        getDPHState({
          uid,
          select_udid: sel_udid,
          select_datatype: 0,
        })
          .then(response => {
            convert.parseString(response.data, { explicitArray: false }, (err, result) => {
              if (!err) {
                if (result.root.dph_state === undefined) return setDispatches([])
                if (Object.keys(result.root.dph_state)[0] === '0') {
                  setDispatches([...result.root.dph_state])
                } else {
                  setDispatches([{ ...result.root.dph_state }])
                }
              }
            })
          })
      }
    }
  }, [sel_udid, tab])
  React.useEffect(() => {
    if (isDispatchDialogOpen) {
      getNsList({ sel_udid, sortType: 0 })
        .then((response) => {
          convert.parseString(response.data, { explicitArray: false }, (err, result) => {
            if (!err) {
              var schedules = result.root.nschedule.map(schedule => schedule.$)
              setSchedules([...schedules])
            }
          })
          getdplist()
            .then(response => {
              convert.parseString(response.data, { explicitArray: false }, (err, result) => {
                if (!err) {
                  var tempDevices = result.root.dp_info.map(dp => ({ dpid: dp.dpid, dpname: dp.dpname }))
                  setDevices([...tempDevices])
                }
              })
            })
        })
    }
  }, [isDispatchDialogOpen])
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleSetPage = e => {
    if (e.target.value === '') {
      return setPage(1)
    }
    if (!Number.isInteger(Number(e.target.value))) return

    setPage(e.target.value)
  }
  const handleDispatch = () => {
    var date = moment(dispatchDateTime).format('YYYYMMDD')
    var time = moment(dispatchDateTime).format('HHmm')
    dispatch_sch({
      dph_time: `${date}${time}`,
      start_time: '000101010000',
      dplst: device,
      uid,
      nsid: schedule,
    })
      .then(res => console.log(res))
  }

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <div className={classes.root}>
      <Card >
        <CardContent style={{ padding: 20, display: 'flex' }}>
          <DateRangePicker value={dateRange} onChange={e => setDateRange(e)} />
          <div className={classes.spacer} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setDispatchDialogOpen(true)}>新增派送</Button>
        </CardContent>
      </Card>
      <Divider />
      <Paper className={classes.paper}>
        <Tabs
          value={tab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="派送中" />
          <Tab label="派送完成" />
        </Tabs>
        <EnhancedTableToolbar rows={rows} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              tab={tab}
            />
            <TableBody className={classes.tableBody}>
              {stableSort(rows, getComparator(order, orderBy))
                .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.depUUID);
                  return (
                    <TableRow
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      hover
                    >
                      {
                        tab === 0
                          ?
                          <>
                            <TableCell align="left">{row.dpname}</TableCell>
                            <TableCell align="left">{row.nsname}</TableCell>
                            <TableCell align="left">{`${row.count} / ${row.total}`}</TableCell>
                            <TableCell align="left">{row.dph_usr}</TableCell>
                            <TableCell align="left">{row.dph_time}</TableCell>
                          </>
                          :
                          <>
                            <TableCell align="left">{row.dpname}</TableCell>
                            <TableCell align="left">{row.nsname}</TableCell>
                            <TableCell align="left">{row.state === '1' ? '派送成功' : '派送失敗'}</TableCell>
                            <TableCell align="left">{row.dph_uesr}</TableCell>
                            <TableCell align="left">{row.dph_time}</TableCell>
                          </>
                      }
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.spacer} />
        {
          //   rows.length / rowsPerPage > 1
          //     ?
          //     <Pagination
          //       count={Math.ceil(rows.length / rowsPerPage)}
          //       shape="rounded"
          //       page={page}
          //       onChange={handleChangePage}
          //       handleSetPage={handleSetPage}
          //     />
          //     : null
        }
      </Paper>
      <ConfirmDialog
        isDialogOpen={isDispatchDialogOpen}
        setDialogOpen={setDispatchDialogOpen}
        titleText={'派送排程'}
        content={<>
          <Select
            value={schedule}
            onChange={e => setSchedule(e.target.value)}
            options={schedules}
            emptyText={'請選擇排程'}
            val="nsid"
            name="nsname"
          />
          <Select
            value={device}
            onChange={e => setDevice(e.target.value)}
            options={devices}
            emptyText={'請選擇設備'}
            val="dpid"
            name="dpname"
          />
          <DateTimePicker value={dispatchDateTime} onChange={e => setDispatchDateTime(e)} />
        </>}
        confirmText={'派送'}
        confirm={handleDispatch}
      />
    </div>
  )
}