import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./payment.css"

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


function Payment() {
    return (
        <div>
            <body className="body">
            <header className="header">
                <nav>
                    <Button component={Link} to="/Build" color="secondary">Build Your Haunt</Button>
                    <Button component={Link} to="/Details" color="secondary">Order Details</Button>
                    <Button component={Link} to="/Payment" color="secondary">Check Out</Button>
                </nav>
            </header>
            
                <div className="title">
                <Typography variant="h3" gutterBottom>
                    Payment method
                    </Typography>
                    </div>
                <div className="info">
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={6}>
                            <TextField required id="cardName" label="Name on card" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField required id="cardNumber" label="Card number" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField required id="expDate" label="Expiry date" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cvv"
                                label="CVV"
                                helperText="Last three digits on signature strip"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                                label="Remember credit card details for next time"
                            />
                        </Grid>
                    </Grid>
                </div>
                <div>
                <Button color="secondary" variant="contained">Submit Payment</Button>
                </div>
            </body>
        </div>
    )
}


export default Payment