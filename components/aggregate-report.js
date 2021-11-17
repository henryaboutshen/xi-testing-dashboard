/* eslint-disable max-len */
import * as React from 'react';
import PropTypes from 'prop-types';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { visuallyHidden } from '@mui/utils';
import Title from './title';

function createData(id, label, samples, average, median, line90, line95, line99, min, max, error, throughput, received, sent) {
    return {
        id, label, samples, average, median, line90, line95, line99, min, max, error, throughput, received, sent,
    };
}

const rows = [
    createData(0, 'hello', 300, 3, 3, 6, 8, 11, 2, 12, '0.00%', 0.27164, 0.07, 0.03),
    createData(1, 'hello-1', 400, 3, 3, 6, 8, 11, 2, 12, '1.10%', 0.27164, 0.07, 0.03),
    createData(2, 'hello-2', 500, 3, 3, 6, 8, 11, 2, 12, '11.00%', 0.27164, 0.07, 0.03),
];

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
        id: 'label',
        numeric: false,
        disablePadding: true,
        label: 'Label',
    },
    {
        id: 'samples',
        numeric: true,
        disablePadding: false,
        label: '# Samples',
    },
    {
        id: 'error',
        numeric: true,
        disablePadding: false,
        label: 'Error %',
    },
    {
        id: 'line90',
        numeric: true,
        disablePadding: false,
        label: '90% Line',
    },
    {
        id: 'line95',
        numeric: true,
        disablePadding: false,
        label: '95% Line',
    },
    {
        id: 'line99',
        numeric: true,
        disablePadding: false,
        label: '99% Line',
    },
    {
        id: 'average',
        numeric: true,
        disablePadding: false,
        label: 'Average',
    },
    {
        id: 'median',
        numeric: true,
        disablePadding: false,
        label: 'Median',
    },
    {
        id: 'min',
        numeric: true,
        disablePadding: false,
        label: 'Min',
    },
    {
        id: 'max',
        numeric: true,
        disablePadding: false,
        label: 'Max',
    },
    {
        id: 'throughput',
        numeric: true,
        disablePadding: false,
        label: 'Throughput',
    },
    {
        id: 'received',
        numeric: true,
        disablePadding: false,
        label: 'Received KB/sec',
    },
    {
        id: 'sent',
        numeric: true,
        disablePadding: false,
        label: 'Sent KB/sec',
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

export default function AggregateReport() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('label');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <React.Fragment>
            <Title> Aggregate Report</Title>
            <TableContainer>
                <Table size="small">
                    <AggregateReportTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {rows.slice().sort(getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow
                                    hover
                                    key={row.id}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        padding="none"
                                    >
                                        {row.label}
                                    </TableCell>
                                    <TableCell align="right">{row.samples}</TableCell>
                                    <TableCell align="right"><Chip label={row.error} color="success" variant="outlined" size="small" /></TableCell>
                                    <TableCell align="right">{row.line90}</TableCell>
                                    <TableCell align="right">{row.line95}</TableCell>
                                    <TableCell align="right">{row.line99}</TableCell>
                                    <TableCell align="right">{row.average}</TableCell>
                                    <TableCell align="right">{row.median}</TableCell>
                                    <TableCell align="right">{row.min}</TableCell>
                                    <TableCell align="right">{row.max}</TableCell>
                                    <TableCell align="right">{row.throughput}</TableCell>
                                    <TableCell align="right">{row.received}</TableCell>
                                    <TableCell align="right">{row.sent}</TableCell>
                                </TableRow>
                            ))}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 33 * emptyRows,
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </React.Fragment>
    );
}
