import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
    BarChart, Bar, Brush, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import Title from './title';

const formatYAxis = (tickItem) => `${tickItem} ms`;

export default function ResponseTimeChart(props) {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>Response Time</Title>
            <ResponsiveContainer>
                <BarChart
                    width={500}
                    height={300}
                    data={props.data.sort((a, b) => b['90% Line'] - a['90% Line'])}
                    margin={{
                        top: 5,
                        right: 10,
                        left: 5,
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
                        tickFormatter={formatYAxis}
                        width={70}
                    />
                    <Tooltip />
                    {/* <ReferenceLine
                        y={200}
                        label="Ref"
                        stroke="#d32f2f"
                        strokeDasharray="3 3"
                    /> */}
                    <Brush
                        dataKey="Label"
                        height={20}
                        stroke={theme.palette.primary.main}
                    />
                    <Bar
                        dataKey="90% Line"
                        fill={theme.palette.primary.main}
                    />
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
