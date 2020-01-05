import React from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// Import Komponen Halaman
import Registrasi from './pages/registrasi'
import Login from './pages/login'
import LupaPassword from './pages/lupa-password'
import NotFound from './pages/404'
import Private from './pages/private'
import PrivateRoute from './components/PrivateRoute'

// Import context Firebase Provider
import FirebaseProvider from './components/FirebaseProvider';

// Import Komponen Material UI
import CssBaseline from '@material-ui/core/CssBaseline'

// Import Theme Provider
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './config/theme';

// Import Notistack Plugin
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <FirebaseProvider>
            <Router>
              <Switch>
                <PrivateRoute path="/" exact component={Private}></PrivateRoute>
                <PrivateRoute path="/pengaturan" component={Private}></PrivateRoute>
                <PrivateRoute path="/produk" component={Private}></PrivateRoute>
                <PrivateRoute path="/transaksi" component={Private}></PrivateRoute>
                <Route path="/registrasi" component={Registrasi}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/lupa-password" component={LupaPassword}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </Router>
          </FirebaseProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
