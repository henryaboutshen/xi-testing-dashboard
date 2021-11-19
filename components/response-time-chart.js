import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
    BarChart, Bar, Brush, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import Title from './title';

export default function ResponseTimeChart(props) {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>Response Time</Title>
            <ResponsiveContainer>
                <BarChart
                    width={500}
                    height={300}
                    data={props.data.sort((a, b) => parseInt(b['90% Line'], 10) - parseInt(a['90% Line'], 10))}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    barSize={20}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="Label"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                    <YAxis
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                    <Tooltip />
                    <Brush dataKey="Label" height={20} stroke={theme.palette.primary.main } />
                    <Bar
                        dataKey="90% Line"
                        fill={theme.palette.primary.main}
                    />
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
