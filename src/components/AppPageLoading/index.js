import React from 'react';

// Material UI
import CircularProggress from '@material-ui/core/CircularProgress';

// Import Style
import useStyle from './styles';

function AppLoading() {
    
    const classes = useStyle();

    return (
            <div className={classes.loadingBox}>
                <CircularProggress />
            </div>
    )
}

export default AppLoading;