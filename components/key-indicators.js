import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Title from './title';

export default function KeyIndicators(props) {
    return (
        <Grid container item spacing={3} xs={12} md={4}>
            {/* Users */}
            <Grid item xs={12} md={6}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 150,
                    }}
                >
                    <Title>Users</Title>
                    <Typography component="p" variant="h4">
                        {props.indicator.users}
                    </Typography>
                </Paper>
            </Grid>
            {/* Iterations */}
            <Grid item xs={12} md={6}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 150,
                    }}
                >
                    <Title>Rampup (min)</Title>
                    <Typography component="p" variant="h4">
                        {props.indicator.rampup}
                    </Typography>
                </Paper>
            </Grid>
            {/* Iterations */}
            <Grid item xs={12} md={6}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 150,
                    }}
                >
                    <Title>Iterations</Title>
                    <Typography component="p" variant="h4">
                        {props.indicator.iterations}
                    </Typography>
                </Paper>
            </Grid>
            {/* Duration */}
            <Grid item xs={12} md={6}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 150,
                    }}
                >
                    <Title>Duration (hr)</Title>
                    <Typography component="p" variant="h4">
                        {props.indicator.duration}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}
