import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

export default function ReportList() {
    return (
        <List>
            <ListItem button component={Link} href="#">
                <ListItemAvatar>
                    <Avatar>
                        J
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary='20210102231800-CI-20-60-10-N/A' secondary='Jan 2, 2021' />
            </ListItem>
            <ListItem button component={Link} href="#">
                <ListItemAvatar>
                    <Avatar>
                        <WorkIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Work' secondary='Jan 7, 2014' />
            </ListItem>
            <ListItem button component={Link} href="#">
                <ListItemAvatar>
                    <Avatar>
                        <BeachAccessIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Vacation' secondary='Jan 11, 2014' />
            </ListItem>
        </List>
    );
}
