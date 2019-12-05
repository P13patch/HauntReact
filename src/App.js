import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthProvider } from './Components/Routes/AuthContext'

import './App.css';

import ButtonAppBar from './Components/AppBar'
import ProtectedRoute from './Components/Routes/ProtectedRoute'
import Homepage from './Components/Homepage'
import Admin from './Components/Routes/Admin'
import SignIn from './Components/Routes/SignIn'
import SignUp from './Components/Routes/SignUp'
import Build from "./Components/Routes/Build"
import Details from "./Components/Routes/Details"
import Payment from "./Components/Routes/Payment"

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';






const theme = createMuiTheme({
  palette: {
    primary: {

      main: '#0F0813',

      contrastText: '#ffffff',
    },
    secondary: {

      main: '#ac6b36',

      contrastText: '#000000'
    },
    error: { main: '#000000' }
  },
});

function App() {
  return (

    <div className="App">
      <ThemeProvider theme={theme}>

        <Router>
          <AuthProvider>
            <ButtonAppBar></ButtonAppBar>
            <div>
              <header>


              </header>
            </div >

            <Switch>
              <Route path="/" exact component={Homepage}></Route>
              <Route path="/Build" component={Build}></Route>
              <Route path="/Details" component={Details}></Route>
              <Route path="/Payment" component={Payment}></Route>
              <ProtectedRoute path="/Admin" component={Admin}></ProtectedRoute>
              <Route path="/SignIn" component={SignIn}></Route>
              <Route path="/SignUp" component={SignUp}></Route>
            </Switch>
          </AuthProvider>
        </Router>
        <div>



        </div>
      </ThemeProvider>
    </div>

  );
}

export default App;
