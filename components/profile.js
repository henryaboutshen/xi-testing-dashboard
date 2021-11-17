import * as React from 'react';
import {
    Typography, Divider, Grid,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { LoadingButton } from '@mui/lab';

export default function Profile(props) {
    return (
        <Grid container item spacing={3} xs={12}>
            <Grid item xs>
                <Typography
                    component="h2"
                    variant="h5"
                    color="primary"
                    gutterBottom
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    {props.children}
                </Typography>
            </Grid>
            <Grid item>
                <LoadingButton
                    loadingPosition="start"
                    startIcon={<FileDownloadIcon />}
                    variant="outlined"
                >
                    DOWNLOAD
                </LoadingButton>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
        </Grid>
    );
}
