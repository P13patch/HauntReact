
import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthContext } from './Routes/AuthContext'

import SimpleMenu from './Menu'

import { makeStyles } from '@material-ui/core/styles';

import { Button, Typography} from "./const"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';





const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));



export default function ButtonAppBar() {
  const classes = useStyles();
  
  const { auth, setAuth} = useContext(AuthContext)


  const loggedStatus = () => {
    
    if ( auth === true) {
      
      return (<Button color="secondary" component={Link} onClick={(event => {setAuth(false)})} to="SignIn">Logout</Button>)
    }
    else {
      
      return (<Button color="secondary" component={Link} to="SignIn">Login</Button>)
    }
  }


  return (
    <div>
      <AppBar position="static">
        <Toolbar>

          <SimpleMenu></SimpleMenu>

          <Typography variant="h6" color="secondary" className={classes.title}>

          </Typography>
          {loggedStatus()}
        </Toolbar>
      </AppBar>
    </div>
  );
}