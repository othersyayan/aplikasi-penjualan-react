import React from 'react';

// Import Komponen Material UI
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/grid'
import Button from '@material-ui/core/Button';

// Import Styles
import useStyles from './styles';

// Import React Router Dom
import {Link} from 'react-router-dom';

function Registrasi() {
    const classes = useStyles();

    return <Container maxWidth="xs">
        <Paper className={classes.paper}>
            <Typography
                className={classes.title}
                variant="h5"
                component="h1">Buat Akun Baru</Typography>
            
            <form>
                <TextField
                    id="email"
                    type="email"
                    name="email"
                    margin="normal"
                    label="Alamat Email"
                    fullWidth
                    required
                />
                <TextField
                    id="password"
                    type="password"
                    name="password"
                    margin="normal"
                    label="Password"
                    fullWidth
                    required
                />
                <TextField
                    id="ulangi_password"
                    type="email"
                    name="ulangi_password"
                    margin="normal"
                    label="Ulangi Password"
                    fullWidth
                    required
                />
                <Grid container className={classes.buttons}>
                    <Grid item xs>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            size="large"
                        >Daftar</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            component={Link}
                            to="/login"
                        >Login</Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>

}

export default Registrasi;