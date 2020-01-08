import React, { useRef, useState } from 'react';

// Import Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Import Firebase Hooks
import {useFirebase} from '../../../components/FirebaseProvider'
import { useSnackbar } from 'notistack';

// Import IsEmail
import isEmail from 'validator/lib/isEmail'
import useStyles from './pengguna.styles';

function Pengguna() {
    
    const {user} = useFirebase();
    const [error, setError] = useState({
        displayName: '',
        email: '',
        password: ''
    })

    const classes = useStyles();

    const {enqueueSnackbar} = useSnackbar();
    const [isSubmitting, setSubmitting] = useState(false);
    const displayNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const saveDisplayName = async (e) => {

        const displayName = displayNameRef.current.value;
        console.log(displayName);

        if (!displayName) {
            setError({
                displayName: 'Nama Wajib Diisi'
            })
        } else if (displayName !== user.displayName) {
            setError({
                displayName: ''
            })
            setSubmitting(true);
            await user.updateProfile({
                displayName
            })
            setSubmitting(false);
            enqueueSnackbar('Data Pengguna Berhasil di Perbaharui', {variant: 'success'})
        }
    }

    const updateEmail = async (e) => {
        const email = emailRef.current.value

        if (!email) {
            setError({
                email: 'Email Wajib Diisi'
            })
        } else if (!isEmail(email)) {
            setError({
                email: 'Email tidak Valid'
            })
        } else if (email !== user.email) {
            setError({
                email: ''
            })
            setSubmitting(true)
            try {
                await user.updateEmail(email);

                enqueueSnackbar('Email berhasil diperbarui', {variant:'success'});
            } catch (e) {
                let emailError = ''

                switch (e.code) {
                    case 'auth/email-already-in-use':
                        emailError = 'Email sudah digunakan oleh pengguna lain';
                        break;
                    case
                        'auth/invalid-email':
                        emailError = 'Email tidak valid';
                        break;
                    case
                        'auth/requires-recent-login':
                        emailError = 'Silahkan Logout, kemudian login kembali untuk memperbarui email';
                        break;
                    default:
                        emailError = 'Terjadi kesalahan, silahkan coba lagi'
                        break;
                }
                setError({
                    email: emailError
                })
            }
        }
    }

    const sendEmailVerification = async (e) => {
        const actionCodeSetting = {
            url: `${window.location.origin}/login`
        }

        setSubmitting(true);
        await user.sendEmailVerification(actionCodeSetting);
        enqueueSnackbar(`Email verifikasi telah dikirim ke ${emailRef.current.value}`, {variant:'succes'})
        setSubmitting(false);
    }

    const updatePassword = async (e) => {
        const password = passwordRef.current.value;

        if (!password) {
            setError({
                password: 'Password Wajib Diisi'
            })
        } else {
            setSubmitting(true);
            try {
                await user.updatePassword(password);
                enqueueSnackbar('Password berhasil diperbaharui', {variant: 'success'})
            } catch (e) {
                let errorPassword = '';
                switch (e.code) {
                    case 'auth/weak-password':
                        errorPassword = 'Password terlalu lemah';
                        break;
                    case
                        'auth/requires-recent-login':
                        errorPassword = 'Silahkan Logout, kemudian login kembali untuk memperbarui email';
                        break;
                    default:
                        errorPassword = 'Terjadi kesalahan silahkan coba lagi'
                        break;
                }
                setError({
                    password:errorPassword
                })
            }
            setSubmitting(false)
        }
    }

    return <div className={classes.pengaturanPengguna}>
        <TextField 
            id="displayName"
            name="displayName"
            label="Nama"
            margin="normal"
            defaultValue={user.displayName}
            inputProps={{
                ref: displayNameRef,
                onBlur: saveDisplayName
            }}
            disabled={isSubmitting}
            helperText={error.displayName}
            error={error.displayName?true:false}
        />
        <TextField
            id="email"
            name="email"
            label="email"
            type="email"
            margin="normal"
            defaultValue={user.email}
            inputProps={{
                ref: emailRef,
                onBlur: updateEmail
            }}
            helperText={error.email}
            error={error.email?true:false}
        />

        {
            user.emailVerified ?
            <Typography
                variant="subtitle1"
                color="primary"
            >Email Sudah terverifikasi</Typography>
            :
            <Button
                variant="outlined"
                onClick={sendEmailVerification}
                disabled={isSubmitting}
            >
                Kirim Email Verifikasi
            </Button>
        }
        <TextField
            id="password"
            name="password"
            label="Password Baru"
            type="password"
            inputProps={{
                ref: passwordRef,
                onBlur: updatePassword
            }}
            auto-complete="new-password"
            disabled={isSubmitting}
            helperText={error.password}
            error={error.password?true:false}
        />
    </div>

}

export default Pengguna;