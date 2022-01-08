import * as React from 'react';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import BarChartIcon from '@mui/icons-material/BarChart';
import FormatListBulleted from '@mui/icons-material/FormatListBulleted';
import SettingsApplications from '@mui/icons-material/SettingsApplications';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export default function Navigation(props) {
    const toggleDrawer = () => {
        props.setOpen(!props.open);
    };

    return (
        <Drawer variant="permanent" open={props.open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List>
                <ListItem button component={Link} href="/">
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Recent" />
                </ListItem>
                <ListItem button component={Link} href="/report">
                    <ListItemIcon>
                        <FormatListBulleted />
                    </ListItemIcon>
                    <ListItemText primary="Report" />
                </ListItem>
                <ListItem button component={Link} href="/trend">
                    <ListItemIcon>
                        <TrendingDownIcon />
                    </ListItemIcon>
                    <ListItemText primary="Trend" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <SettingsApplications />
                    </ListItemIcon>
                    <ListItemText primary="Setting" />
                </ListItem>
            </List>
        </Drawer>
    );
}
