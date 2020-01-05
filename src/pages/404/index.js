import React from 'react';

// Import Material UI
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Import React Router DOM
import { Link } from "react-router-dom";

// Import Style
import useStyles from './styles'

function NotFound() {

    const classes = useStyles();

    return (
        <Container maxWidth="xs">
            <Paper className={classes.paper}>
                <Typography variant="subtitle1">
                    Halaman Tidak Ditemukan
                </Typography>
                <Typography variant="h3">
                    404
                </Typography>
                <Typography component={Link} to="/">Kembali ke Beranda</Typography>
            </Paper>
        </Container>
    )

}

export default NotFound;