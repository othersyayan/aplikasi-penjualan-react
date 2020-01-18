import React, { useState } from 'react';

// Import Komponen Material UI
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// Import Styles
import useStyles from './styles';

// Import React Router Dom
import { Link, Redirect } from 'react-router-dom';

// Import Validator
import isEmail from 'validator/lib/isEmail';

// Import Firebase Hooks
import {useFirebase} from '../../components/FirebaseProvider';

// Import AppLoading
import AppLoading from '../../components/AppLoading';

// Import Notistack Hook
import { useSnackbar } from "notistack";

function LupaPassword() {
    const classes = useStyles();

    const [ form, setForm ] = useState({
        email: ''
    });

    const [error, setError] = useState({
        email: ''
    })

    const [isSubmitting, setSubmitting] = useState(false);

    const {auth, user, loading} = useFirebase();

    const {enqueueSnackbar} = useSnackbar();

    const handleChange = e => {
        
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });

        setError({
            ...error,
            [e.target.name]:''
        })
    }

    const validate = () => {

        const newError = { ...error };

        if (!form.email) {
            newError.email = 'Email Wajib Diisi';
        } else if (!isEmail(form.email)) {
            newError.email = 'Email tidak valid';
        }

        return newError;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const findErrors = validate();

        if (Object.values(findErrors).some(err => err !== '')) {
            setError(findErrors);
        } else {
            try {
                setSubmitting(true);
                
                const actionResetSetting = {
                    url: `${window.location.origin}/login`
                };
                
                await auth.sendPasswordResetEmail(form.email, actionResetSetting);

                enqueueSnackbar(`Cek Kotak Masuk email: ${form.email}, sebuah tautan untuk me-reset password telah dikirim`,
                {
                    variant: 'success'
                })
                setSubmitting(false);
            } catch(e) {
                const newError = {};

                switch (e.code) {
                    case 'auth/user-not-found':
                        newError.email = 'Email Tidak Ditemukan'
                    break;
                    case 'auth/invalid-email':
                        newError.email = 'Email Tidak Valid'
                    break;
                
                    default:
                        newError.email = 'Terjadi kesalahan, silahkan coba lagi'
                        break;
                }

                setError(newError);
                setSubmitting(false);
            }
        }
    }

    if(loading) {
        return  <AppLoading />
    }

    if(user) {
        return <Redirect to="/" />
    }

    return <Container maxWidth="xs">
        <Paper className={classes.paper}>
            <Typography
                className={classes.title}
                variant="h5"
                component="h1">Lupa Password</Typography>
            
            <form onSubmit={handleSubmit} noValidate>
                <TextField
                    id="email"
                    type="email"
                    name="email"
                    margin="normal"
                    label="Alamat Email"
                    fullWidth
                    required
                    value={form.email}
                    onChange={handleChange}
                    helperText={error.email}
                    error={error.email ? true : false}
                />
                <Grid container className={classes.buttons}>
                    <Grid item xs>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            size="large"
                            disabled={isSubmitting}
                        >Kirim</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            component={Link}
                            to="/login"
                            disabled={isSubmitting}
                        >Login</Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>

}

export default LupaPassword;