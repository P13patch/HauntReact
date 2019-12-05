import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthContext } from './AuthContext'

import "./signin.css"

import { makeStyles } from '@material-ui/core/styles';

import { baseEndpoint, api, Button, Box, Grid, Checkbox, Typography, TextField, FormControlLabel } from '../const'
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import ReactGoogleLogin from 'react-google-login'




//const baseEndPoint = 'https://localhost:3000/api/v1'

function Copyright() {
    return (
        <Typography variant="body2" color="primary" align="center">
            {'Copyright © '}
            <Link className="reactLink" href="https://material-ui.com/">
                HauntCo
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const setContext = useContext(AuthContext)

    const submitHandler = (event) => {

        event.preventDefault()
        const data = new FormData(event.target)

        fetch(`${baseEndpoint}${api}/user/login`, {
            method: "POST",
            body: data,
        })
            //returns token
            .then(httpResult => {
                return httpResult.json()
            })

            .then(token => {
                setContext.setToken(token)
                setContext.setAuth(true)
            })
            .catch(error => {
                console.log(error)
            })

    }


    const responseGoogle = (response) => {

        let data = {
            tokenId: response.tokenId,

        }

        fetch(`${baseEndpoint}${api}/user/oauth/google`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            //returns token
            .then(httpResult => {
                return httpResult.json()
            })

            .then(token => {
                setContext.setToken(token)
                setContext.setAuth(true)
            })
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <form className={classes.form} noValidate onSubmit={submitHandler}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <div className="googlebutton">
                        <ReactGoogleLogin
                            clientId="159189926960-ruhearc07f379bebmofjnhn0tg9rnt8c.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            className="googlebutton"
                        />
                    </div>
                    <Grid container justify="center">
                        
                        <Grid item>
                            <Link to="./SignUp" className="reactLink">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}