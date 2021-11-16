import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import Title from './title';

const data = [
    {
        name: 'Page A',
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        pv: 4300,
        amt: 2100,
    },
];

export default function Chart() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>Response Time</Title>
            <ResponsiveContainer>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
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
                        dataKey="name"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                    <YAxis
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="pv"
                        fill={theme.palette.primary.main}
                        background={{ fill: '#eee' }}
                        isAnimationActive={false}
                    />
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
