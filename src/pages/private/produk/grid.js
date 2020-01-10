import React, { useState } from 'react';

// Import Material UI
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

// Import Styles
import useStyles from './grid.styles';

// Import Page Component
import AddDialog from './add';

function GridProduk() {
    const classes = useStyles();

    const [openAddDialog, setOpenAddDialog] = useState(false);
    return <>
        <h1>Halaman GridProduk</h1>
        <Fab
            className={classes.fab}
            color="primary"
            onClick={(e)=>{
                setOpenAddDialog(true);
            }}
        >
            <AddIcon/>
        </Fab>
        <AddDialog
            open={openAddDialog}
            handleClose={()=>{
                setOpenAddDialog(false);
            }}
        />
    </>

}

export default GridProduk;