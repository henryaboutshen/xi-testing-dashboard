import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Title from './title';

export default function KeyIndicators() {
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
                        10
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
                    <Title>Rampup (sec)</Title>
                    <Typography component="p" variant="h4">
                        60
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
                        10
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
                    <Title>Duration (sec)</Title>
                    <Typography component="p" variant="h4">
                        N/A
                    </Typography>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                        on 15 March, 2019
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}
