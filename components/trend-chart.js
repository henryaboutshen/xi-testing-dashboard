import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
    ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Legend,
    Brush, ReferenceLine,
} from 'recharts';
import Title from './title';

const formatXAxis = (tickItem) => `${tickItem} ms`;

export default function ResponseTimeChart(props) {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>Trend (90% Line)</Title>
            <ResponsiveContainer>
                <ComposedChart
                    width={500}
                    height={500}
                    data={props.data.sort((a, b) => b.Difference - a.Difference)}
                    margin={{
                        top: 5,
                        right: 20,
                        left: 10,
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
        </React.Fragment>
    );
}
