/* eslint-disable no-param-reassign */
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
import Link from '@mui/material/Link';
import { TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';

function createData(id, report, date, env, users, rampup, iterations, duration) {
    return {
        id, report, date, env, users, rampup, iterations, duration,
    };
}
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
        id: 'report',
        numeric: false,
        disablePadding: true,
        label: 'Report',
    },
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'env',
        numeric: false,
        disablePadding: false,
        label: 'Environment',
    },
    {
        id: 'users',
        numeric: true,
        disablePadding: false,
        label: 'Users',
    },
    {
        id: 'rampup',
        numeric: true,
        disablePadding: false,
        label: 'Rampup',
    },
    {
        id: 'iterations',
        numeric: true,
        disablePadding: false,
        label: 'Iterations',
    },
    {
        id: 'duration',
        numeric: true,
        disablePadding: false,
        label: 'duration',
    },
];

function ReportListTableHead(props) {
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

ReportListTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

function ReportList(props) {
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

    const rows = [];

    props.data.forEach((row) => {
        rows.push(createData(
            props.data.indexOf(row),
            row.report,
            row.date,
            row.env,
            row.users,
            row.rampup,
            row.iterations,
            row.duration,
        ));
    });

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <React.Fragment>
            <TableContainer>
                <Table size="medium">
                    <ReportListTableHead
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
                                        sx={{ whiteSpace: 'nowrap' }}
                                    >
                                        <Link href={`/?file=${row.report}`}>
                                            {row.report}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">{row.date}</TableCell>
                                    <TableCell align="left">{row.env}</TableCell>
                                    <TableCell align="right">{row.users}</TableCell>
                                    <TableCell align="right">{row.rampup}</TableCell>
                                    <TableCell align="right">{row.iterations}</TableCell>
                                    <TableCell align="right">{row.duration}</TableCell>
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </React.Fragment>
    );
}

ReportList.prototype = {
    data: PropTypes.array.isRequired,
};

export default ReportList;
