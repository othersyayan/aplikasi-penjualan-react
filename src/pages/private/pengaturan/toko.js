import React, { useState } from 'react';

// Import Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Import Styles
import useStyles from './toko.styles';

// Import Validator
import isURL from 'validator/lib/isURL';

// Firebase Hooks
import {useFirebase} from '../../../components/FirebaseProvider';
import { useSnackbar } from 'notistack';


function Toko() {
    const classes = useStyles();

    const {firestore, user} = useFirebase();

    const tokoDoc = firestore.doc(`toko/${user.uid}`)

    const {enqueueSnackbar} = useSnackbar();

    const [form, setForm] = useState({
        nama: '',
        alamat: '',
        telepon: '',
        website: ''
    })

    const [error, setError] = useState({
        nama: '',
        alamat: '',
        telepon: '',
        website: ''
    })

    const [isSubmitting, setSubmitting] = useState(false)

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const validate = () => {
        const newError = {...error};

        if (!form.nama) {
            newError.nama = 'Nama wajib diisi'
        }

        if (!form.alamat) {
            newError.alamat = 'Alamat wajib diisi'
        }

        if (!form.telepon) {
            newError.telepon = 'Telepon wajib diisi'
        }

        if (!form.website) {
            newError.website = 'Website anda wajib diisi'
        } else if(!isURL(form.website)) {
            newError.website = 'Website tidak valid'
        }

        return newError;
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const findErrors = validate();

        if (Object.values(findErrors).some(err => err !== '')) {
            setError(findErrors); 
        } else {

            setSubmitting(true);
            try {
                await tokoDoc.set(form, {merge:true});
                enqueueSnackbar('Data Toko berhasil disimpan', {variant:'success'})
            } catch (e) {
                enqueueSnackbar(e.message, {variant:'success'})
            }
            setSubmitting(false);
        }
    }

    return <div className={classes.pengaturanToko}>
        <form onSubmit={handleSubmit} noValidate>
            <TextField
                id="nama"
                name="nama"
                label="Nama Toko"
                margin="normal"
                required
                value={form.nama}
                fullWidth
                onChange={handleChange}
                error={error.nama?true:false}
                helperText={error.nama}
                disabled={isSubmitting}
            />
            <TextField
                id="alamat"
                name="alamat"
                label="Alamat Toko"
                margin="normal"
                required
                multiline
                rowsMax={3}
                fullWidth
                value={form.alamat}
                onChange={handleChange}
                error={error.alamat?true:false}
                helperText={error.alamat}
                disabled={isSubmitting}
            />
            <TextField
                id="telepon"
                name="telepon"
                label="Nomor Telepon Toko"
                margin="normal"
                required
                value={form.telepon}
                fullWidth
                onChange={handleChange}
                error={error.telepon?true:false}
                helperText={error.telepon}
                disabled={isSubmitting}
            />
            <TextField
                id="website"
                name="website"
                label="Website Toko"
                margin="normal"
                required
                value={form.website}
                fullWidth
                onChange={handleChange}
                error={error.website?true:false}
                helperText={error.website}
                disabled={isSubmitting}
            />
            <Button
                type="submit"
                className={classes.actionButton}
                variant="contained"
                color="primary"
                disabled={isSubmitting}
            >
            Simpan
            </Button>
        </form>
    </div>

}

export default Toko;