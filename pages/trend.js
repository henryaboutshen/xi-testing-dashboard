import * as React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    CssBaseline, Box, Toolbar, Container, Paper,
} from '@mui/material';
import Header from '../components/header';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import TrendChart from '../components/trend-chart';

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

function TrendContent(props) {
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
                        <Paper sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <TrendChart data={props.data} report={props.report} />
                        </Paper>
                        <Footer sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

function Trend({ data, report }) {
    return <TrendContent data={data} report={report}/>;
}

async function getData() {
    const response = await axios.get('http://localhost:3000/api/trend');
    if (response.status !== 200) {
        return {};
    }
    const { data } = response;
    if (!data) {
        return {};
    }
    return data;
}

async function getReport() {
    const response = await axios.get('http://localhost:3000/api/report');
    if (response.status !== 200) {
        return {};
    }
    const report = response.data;
    if (!report) {
        return {};
    }
    return report;
}

Trend.getInitialProps = async () => {
    const data = await getData();
    const report = await getReport();
    return { data, report };
};

Trend.prototype = {
    data: PropTypes.array.isRequired,
    report: PropTypes.array.isRequired,
};

export default Trend;
