import * as React from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import {
    Grid, TextField, Autocomplete, TablePagination,
} from '@mui/material';
import PropTypes from 'prop-types';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import {
    ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Legend,
    Brush, ReferenceLine,
} from 'recharts';
import Title from './title';

const formatXAxis = (tickItem) => `${tickItem} ms`;

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

const headCells = [
    {
        id: 'Label',
        numeric: false,
        disablePadding: true,
        label: 'Label',
    },
    {
        id: 'Difference',
        numeric: true,
        disablePadding: false,
        label: 'Difference (ms)',
    },
    {
        id: 'Current',
        numeric: true,
        disablePadding: false,
        label: 'Current (ms)',
    },
    {
        id: 'Previous',
        numeric: true,
        disablePadding: false,
        label: 'Previous (ms)',
    },
];

function AggregateReportTableHead(props) {
    const {
        order, orderBy, onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            sx={{ whiteSpace: 'nowrap' }}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

AggregateReportTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default function ResponseTimeChart(props) {
    const [current, setCurrent] = React.useState(props.data.current);
    const [previous, setPrevious] = React.useState(props.data.previous);
    const [data, setData] = React.useState(
        props.data.data.sort((a, b) => b.Difference - a.Difference),
    );
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('difference');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const getReport = async (newPrevious, newCurrent) => {
        const response = await axios.get(`/api/trend?previous=${newPrevious || previous}&current=${newCurrent || current}`);
        if (response.status === 200) {
            if (response.data) {
                setData(response.data.data.sort((a, b) => b.Difference - a.Difference));
            }
        }
    };

    const theme = useTheme();

    const reports = [];

    props.report.forEach((row) => {
        reports.push(row.report);
    });

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    return (
        <Grid container item spacing={3} xs={12}>
            <Grid item xs>
                <Title>Trend (90% Line)</Title>
            </Grid>
            <Grid item>
                <Autocomplete
                    disablePortal
                    size="small"
                    options={reports}
                    value={previous}
                    sx={{ width: 280 }}
                    renderInput={(params) => <TextField {...params} label="Previous" />}
                    onChange={(event, value) => {
                        setPrevious(value);
                        getReport(value, null);
                    }}
                />
            </Grid>
            <Grid item>
                <Autocomplete
                    disablePortal
                    size="small"
                    options={reports}
                    value={current}
                    sx={{ width: 280 }}
                    renderInput={(params) => <TextField {...params} label="Current" />}
                    onChange={(event, value) => {
                        setCurrent(value);
                        getReport(null, value);
                    }}
                />
            </Grid>
            <Grid item xs={12} height={500}>
                <ResponsiveContainer>
                    <ComposedChart
                        width={500}
                        height={500}
                        data={data}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 5,
                        }}
                        barSize={20}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="Label"
                            stroke={theme.palette.text.secondary}
                            style={theme.typography.body2}
                            height={10}
                            tick={false}
                        />
                        <YAxis
                            stroke={theme.palette.text.secondary}
                            style={theme.typography.body2}
                            width={80}
                            tickFormatter={formatXAxis}
                        />
                        <Tooltip />
                        <Legend />
                        <Brush
                            dataKey="Label"
                            height={20}
                            stroke={theme.palette.primary.main}
                        />
                        <ReferenceLine
                            y={3000}
                            stroke="red"
                            strokeDasharray="3 3"
                            label="Page Benchmark"
                        >
                        </ReferenceLine>
                        <ReferenceLine
                            y={1000}
                            stroke="red"
                            strokeDasharray="3 3"
                            label="API Benchmark"
                        >
                        </ReferenceLine>
                        <Bar
                            dataKey="Current"
                            fill={theme.palette.primary.main}
                        />
                        <Bar
                            dataKey="Previous"
                            fill="#e0e0e0"
                        />
                        <Line
                            dataKey="Difference"
                            type="monotone"
                            fill={theme.palette.secondary.main}
                            stroke={theme.palette.secondary.main}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </Grid>
            <Grid item xs={12}>
                <TableContainer>
                    <Table size="small">
                        <AggregateReportTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {data.slice().sort(getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow
                                        hover
                                        key={row.Label}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            padding="none"
                                            sx={{ whiteSpace: 'nowrap' }}
                                        >
                                            {row.Label}
                                        </TableCell>
                                        <TableCell align="right">{row.Difference}</TableCell>
                                        <TableCell align="right">{row.Current}</TableCell>
                                        <TableCell align="right">{row.Previous}</TableCell>
                                    </TableRow>
                                ))}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 37 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 50, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
        </Grid>
    );
}
