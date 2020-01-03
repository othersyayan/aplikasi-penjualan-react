import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

// Import Komponen Halaman
import Pengguna from './pengguna'
import Toko from './toko'

function Pengaturan() {
    
    return (
        <Switch>
            <Route path="/pengaturan/pengguna" component={Pengguna}></Route>
            <Route path="/pengaturan/toko" component={Toko}></Route>
            <Redirect to="/pengaturan/pengguna"/>
        </Switch>
    )

}

export default Pengaturan;