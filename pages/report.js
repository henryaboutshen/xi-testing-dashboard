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
import ReportList from '../components/report-list';

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

function ReportContent(props) {
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
                            <ReportList />
                        </Paper>
                        <Footer sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

function Report({ data }) {
    return <ReportContent data={data} />;
}

async function getReport() {
    const response = await axios.get('http://127.0.0.1:3000/api/jmeter?file=2021');
    if (response.status !== 200) {
        return {};
    }
    const report = response.data;
    if (!report) {
        return {};
    }
    return report;
}

Report.getInitialProps = async () => {
    const data = await getReport();
    return { data };
};

Report.prototype = {
    data: PropTypes.array,
};

export default Report;
