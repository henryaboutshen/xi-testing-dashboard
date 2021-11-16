/* eslint-disable max-len */
import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './title';

// Generate Order Data
function createData(id, label, samples, average, median, line90, line95, line99, min, max, error, throughput, received, sent) {
    return {
        id, label, samples, average, median, line90, line95, line99, min, max, error, throughput, received, sent,
    };
}

const rows = [
    createData(
        0,
        'hello',
        300,
        3,
        3,
        6,
        8,
        11,
        2,
        12,
        '0.00%',
        0.27164,
        0.07,
        0.03,
    ),
    createData(
        1,
        'hello',
        300,
        3,
        3,
        6,
        8,
        11,
        2,
        12,
        '0.00%',
        0.27164,
        0.07,
        0.03,
    ),
];

function preventDefault(event) {
    event.preventDefault();
}

export default function Orders() {
    return (
        <React.Fragment>
            <Title> Aggregate Report</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Label</TableCell>
                        <TableCell># Samples</TableCell>
                        <TableCell>Average</TableCell>
                        <TableCell>Median</TableCell>
                        <TableCell>90% Line</TableCell>
                        <TableCell>95% Line</TableCell>
                        <TableCell>99% Line</TableCell>
                        <TableCell>Min</TableCell>
                        <TableCell>Max</TableCell>
                        <TableCell>Error %</TableCell>
                        <TableCell>Throughput</TableCell>
                        <TableCell align="right">Received KB/sec</TableCell>
                        <TableCell align="right">Sent KB/sec</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.label}</TableCell>
                            <TableCell>{row.samples}</TableCell>
                            <TableCell>{row.average}</TableCell>
                            <TableCell>{row.median}</TableCell>
                            <TableCell>{row.line90}</TableCell>
                            <TableCell>{row.line95}</TableCell>
                            <TableCell>{row.line99}</TableCell>
                            <TableCell>{row.min}</TableCell>
                            <TableCell>{row.max}</TableCell>
                            <TableCell>{row.error}</TableCell>
                            <TableCell>{row.throughput}</TableCell>
                            <TableCell align="right">{`${row.received}`}</TableCell>
                            <TableCell align="right">{`${row.sent}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link>
        </React.Fragment>
    );
}
