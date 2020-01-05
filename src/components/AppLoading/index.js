import React from 'react';

// Material UI
import Container from '@material-ui/core/Container';
import LinearProggress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

// Import Style
import useStyle from './styles';

function AppLoading() {
    
    const classes = useStyle();

    return (
        <Container maxWidth="xs">
            <div className={classes.loadingBox}>
                <Typography
                    variant="h6"
                    component="h2"
                    className={classes.title}
                >
                    Aplikasi Penjualan
                </Typography>
                <LinearProggress />
            </div>
        </Container>
    )
}

export default AppLoading;