import React, { Component, useEffect } from 'react'
import './details.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { baseEndpoint, api } from '../const'

import PopUp from "./EditPopup"
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';

//const orderEndpoint = 'https://localhost:3000/api/v1/order'

export default function Details() {

    const [editMode, setEditMode] = React.useState(false)
    const [items, setItems] = React.useState({ finalOrder: [] })


    const refreshPage = () => {

        fetch(`${baseEndpoint}${api}/order/1`,
            {
                method: 'GET',

            })
            .then(httpResult => httpResult.json())
            .then(result => {
                setItems(result)

            })
    }


    const editClickHandler = () => {
        setEditMode(!editMode)
    }

    //element.productId is what is getting passed in when deleteClickHandler is activated
    const deleteClickHandler = productId => event => {

        //deleteItem is assigned to the value of the element.productId
        let deleteItem = items.finalOrder.findIndex((product) => {
            return product.productId == productId
        })
        //findIndex() returns -1 if no element in the array fulfills the parameter
        //making sure deleteItem has been assigned the productId value
        if (deleteItem !== -1) {

            //newOrder is a copy of the array of objects finalOrder
            let newOrder = [...items.finalOrder]
            newOrder.splice(deleteItem, 1)

            //newItems is an object just like what was in items, but now its
            //finalOrder property has an array of objects that is missing the one we took out
            let newItems = Object.assign({}, items, { finalOrder: newOrder })
            delete newItems._id

            fetch(`${baseEndpoint}${api}/order/${items._id}`,
                {
                    method: 'PUT',
                    body: JSON.stringify(newItems),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(httpResult => {

                    if (httpResult.statusText === "OK") {

                        refreshPage()
                    }
                })
                .catch(error => {
                    console.log('Error', error)
                })
        }
    }



    useEffect(refreshPage, [])


    return (
        <div className="body">
            <header className="header">
                <nav>
                    <Button component={Link} to="/Build" color="secondary">Build Your Haunt</Button>
                    <Button component={Link} to="/Details" color="secondary">Order Details</Button>
                    <Button component={Link} to="/Payment" color="secondary">Check Out</Button>
                </nav>
            </header>
            <Typography variant="h3" color="secondary" gutterBottom>
                Your Order Details
            </Typography>
            <div>
                <h2>Edit or delete your order items</h2>
            </div>
            <div className="orderEditList">
                <h1>Your Haunt</h1>
                {items.finalOrder.map((element) => {
                    return (
                        <div key={element._id}>
                            <div className="orderItems">

                                <span className="elementItem">{`${element.item}`}</span>
                                <span className="elementAmmount">{`${element.ammount}`}</span>

                                {(editMode ?
                                    <span>

                                        <PopUp></PopUp>
                                        <IconButton onClick={deleteClickHandler(element.productId)}>
                                            <HighlightOffSharpIcon
                                                color="secondary"

                                            ></HighlightOffSharpIcon>
                                        </IconButton>
                                    </span>
                                    : null)}

                            </div>

                        </div>
                    )
                })}
            </div>
            <div className="bottom">
                <div>
                    <Button
                        className="editButton"
                        variant="contained"
                        color="secondary"
                        onClick={editClickHandler}
                    >Edit your order</Button>
                </div>
            </div>
        </div>
    )

}

