import * as React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    CssBaseline, Box, Toolbar, Container, Grid, Paper,
} from '@mui/material';
import Header from '../components/header';
import ResponseTimeChart from '../components/response-time-chart';
import AggregateReport from '../components/aggregate-report';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import KeyIndicators from '../components/key-indicators';
import Profile from '../components/profile';

const mdTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#029AE1',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#f4f3f3',
        },
    },
});

function DashboardContent(props) {
    const [open, setOpen] = React.useState(true);

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header open={open} setOpen={setOpen} />
                <Navigation open={open} setOpen={setOpen} />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) => (theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900]),
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* Profile */}
                            <Profile>
                                CI 2021-01-02 23:18:00
                            </Profile>
                            {/* Key Indicators */}
                            < KeyIndicators />
                            {/* Response Time Chart */}
                            <Grid item xs={12} md={8}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 324,
                                    }}
                                >
                                    <ResponseTimeChart data={props.data} />
                                </Paper>
                            </Grid>
                            {/* Aggregate Report */}
                            <Grid item xs={12}>
                                <Paper sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                    <AggregateReport data={props.data} />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Footer sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

function Dashboard({ data }) {
    return <DashboardContent data={data} />;
}

async function getReport(file) {
    const response = file ? await axios.get(`http://127.0.0.1:3000/api/jmeter?file=${file}`) : await axios.get('http://127.0.0.1:3000/api/jmeter');
    if (response.status !== 200) {
        return {};
    }
    const report = response.data;
    if (!report) {
        return {};
    }
    return report;
}

Dashboard.getInitialProps = async ({ query }) => {
    const { file } = query;
    const data = await getReport(file);
    return { data };
};

Dashboard.prototype = {
    data: PropTypes.array,
};

export default Dashboard;
