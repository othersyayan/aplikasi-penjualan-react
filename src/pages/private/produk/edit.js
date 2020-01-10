import React, { useState, useEffect } from 'react';

// IMport Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Import Firebase
import {useFirebase} from '../../../components/FirebaseProvider';
import {useDocument} from 'react-firebase-hooks/firestore';

// Import Page Loading
import AppPageLoading from '../../../components/AppPageLoading';

function EditProduk({match}) {
    const {firestore, user} = useFirebase();

    const produkDoc = firestore.doc(`toko/${user.uid}/produk/${match.params.produkId}`);

    const [snapshot, loading] = useDocument(produkDoc);

    const [form, setForm] = useState({
        nama: '',
        sku:'',
        harga: 0,
        stok: 0,
        deskripsi: ''
    })

    const [error, setError] = useState({
        nama: '',
        sku: '',
        harga: '',
        stok: '',
        deskripsi: ''
    })

    useEffect(()=>{
        if (snapshot) {
            setForm({
                ...form,
                ...snapshot.data()
            });
        }
    }, [snapshot])

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

        setError({
            ...error,
            [e.target.name]: ''
        })
    }

    const validate = () => {
        const newError = {...error};

        if (!form.nama) {
            newError.nama = 'Nama Produk wajib diisi';
        }

        if (!form.harga) {
            newError.harga = 'Harga Produk wajib diisi';
        }

        if (!form.stok) {
            newError.stok = 'Stok Produk wajib diisi';
        }

        return newError;
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const findErrors = validate();

        if (Object.values(findErrors).some(err => err !== '')) {
            setError(findErrors);
        }
    }

    if (loading) {
        return <AppPageLoading/>
    }

    return <div>
        <Typography
            variant="h5"
            component="h1"
        >Edit Produk : {form.nama}</Typography>
        <Grid container alignItems="center" justify="center">
            <Grid item xs={12} sm={6}>
                <form id="produk-form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        id="nama"
                        value="nama"
                        label="Nama Produk"
                        margin="normal"
                        fullWidth
                        required
                        value={form.nama}
                        onChange={handleChange}
                        error={error.nama?true:false}
                        helperText={error.nama}
                    />
                    <TextField
                        id="sku"
                        value="sku"
                        label="SKU Produk"
                        margin="normal"
                        fullWidth
                        value={form.sku}
                        onChange={handleChange}
                        error={error.sku?true:false}
                    />
                    <TextField
                        id="harga"
                        value="harga"
                        label="Harga Produk"
                        type="number"
                        required
                        margin="normal"
                        fullWidth
                        value={form.harga}
                        onChange={handleChange}
                        error={error.harga?true:false}
                        helperText={error.harga}
                    />
                    <TextField
                        id="stok"
                        value="stok"
                        label="Stok Produk"
                        type="number"
                        margin="normal"
                        required
                        fullWidth
                        value={form.stok}
                        onChange={handleChange}
                        error={error.stok?true:false}
                        helperText={error.stok}
                    />
                    <TextField
                        id="deskripsi"
                        value="deskripsi"
                        label="Deskripsi Produk"
                        margin="normal"
                        multiline
                        rowsMax={3}
                        fullWidth
                        value={form.nama}
                        onChange={handleChange}
                        error={error.nama?true:false}
                    />
                </form>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography>
                    Upload Gambar
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    form="produk-form"
                >
                    Simpan
                </Button>
            </Grid>
        </Grid>
    </div>

}

export default EditProduk;