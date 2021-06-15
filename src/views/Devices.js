import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
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
} from '@material-ui/core'
import Card from '../components/material/Card'
import Paper from '../components/material/Paper'
// import Pagination from '../components/Pagination'
import convert from 'xml2js'
import moment from 'moment'
import { getdplist, GetAllDp } from '../utils/apis'
import Actions from '../components/Actions'
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
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    { id: 'dpname', numeric: false, disablePadding: false, label: '設備名稱' },
    { id: 'edition', numeric: false, disablePadding: false, label: '設備狀態' },
    { id: 'udname', numeric: false, disablePadding: false, label: '部門名稱' },
    { id: 'dpver', numeric: false, disablePadding: false, label: '設備版本' },
    { id: 'dpos', numeric: false, disablePadding: false, label: '作業系統' },
    { id: 'actions', numeric: false, disablePadding: false, label: '操作' }
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
    padding: '0 20px 20px 20px',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    height: 'calc(100vh - 130px)'
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
  const [rows, setRows] = React.useState([])
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('date');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = Math.floor((window.innerHeight - 370) / 53)
  const [devices, setDevices] = React.useState([])
  const history = useHistory();
  const { sel_udid } = useSelector(state => state.user)


  React.useEffect(() => {
    getdplist({ sel_udid })
      .then(dpRes => {
        var tempDpinfo = []
        convert.parseString(dpRes.data, { explicitArray: false }, (err, dpResult) => {
          if (!err) {
            if (dpResult.root.dp_info === undefined) return tempDpinfo = []
            if (Object.keys(dpResult.root.dp_info)[0] === '0') {
              tempDpinfo = [...dpResult.root.dp_info]
            } else {
              tempDpinfo = [{ ...dpResult.root.dp_info }]
            }
          }
        })
        GetAllDp()
          .then(response => {
            convert.parseString(response.data, { explicitArray: false }, (err, result) => {
              tempDpinfo = tempDpinfo.map(dp_info => ({
                ...result.root.dpinfo.find(dpinfo => dpinfo.dpid === dp_info.dpid),
                ...dp_info
              }))
            })
            setRows([...tempDpinfo])
          })
      })
  }, [sel_udid])

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

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
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
                      key={row.dpid}
                      hover
                    >
                      <TableCell align="left">{row.dpname}</TableCell>
                      <TableCell align="left">{row.edition || '未啟用'}</TableCell>
                      <TableCell align="left">{row.udname}</TableCell>
                      <TableCell align="left">{row.dpver}</TableCell>
                      <TableCell align="left">{row.dpos}</TableCell>
                      <TableCell align="left"><Actions items={[
                        { name: '調整音量', onClick: () => { } },
                        { name: '詳細資料', onClick: () => history.push(`/newui/device/${row.dpid}`) },
                      ]} /></TableCell>
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
    </div>
  )
}