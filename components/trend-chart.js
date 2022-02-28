import * as React from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { Grid, TextField, Autocomplete } from '@mui/material';
import {
    ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Legend,
    Brush, ReferenceLine,
} from 'recharts';
import Title from './title';

const formatXAxis = (tickItem) => `${tickItem} ms`;

export default function ResponseTimeChart(props) {
    const [current, setCurrent] = React.useState(props.data.current);
    const [previous, setPrevious] = React.useState(props.data.previous);
    const [data, setData] = React.useState(
        props.data.data.sort((a, b) => b.Difference - a.Difference),
    );

    const getReport = async (newPrevious, newCurrent) => {
        const response = await axios.get(`http://localhost:3000/api/trend?previous=${newPrevious || previous}&current=${newCurrent || current}`);
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
            <Grid item xs={12}>
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
        </Grid>
    );
}
