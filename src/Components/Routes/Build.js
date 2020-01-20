import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthContext } from './AuthContext'

import './build.css';

import logo1 from "/Documents/Projects/Hauntings/hauntreact/src/Components/Routes/simplehaunt.jpg"
import logo2 from "/Documents/Projects/Hauntings/hauntreact/src/Components/Routes/extremehaunt.jpg"

import { makeStyles } from '@material-ui/core/styles';

import { baseEndpoint, api, Button, IconButton, Typography, Checkbox, FormControlLabel, FormGroup } from '../const'
import Modal from '@material-ui/core/Modal';
import MoreIcon from '@material-ui/icons/More';




function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),

  },
}));


export default function Build() {
  const classes = useStyles();

  const [simple, setSimple] = React.useState([])
  const [extreme, setExtreme] = React.useState([])

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [openItem, setOpenItem] = React.useState(false)
  const [productList, setProductList] = React.useState([])
  const { setAuth, auth, setToken, token } = useContext(AuthContext)

  const [name, setName] = React.useState("")
  const [ammount, setAmmount] = React.useState([])
  const [description, setDescription] = React.useState([])
  const [allSimple, setAllSimple] = React.useState(false)
  const [allExtreme, setAllExtreme] = React.useState(false)





  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const itemHandleOpen = item => event => {

    let product = productList.find((product) => {
      return product.item === item
    })

    if (product !== undefined) {
      
      setName(product.item)
      setAmmount(product.ammount)
      setDescription(product.description)

    }

    setOpenItem(true);
  };

  const itemHandleClose = () => {
    setOpenItem(false);
  };


  const refreshPage = () => {


    fetch(`${baseEndpoint}${api}/product`, {
      method: "GET",
    })
      .then(httpResult => httpResult.json())
      .then(result => {

        setProductList([...result])

        // add a 'checked' key value pair to each object in the array
        let edit = result.map(item => {
          item.checked = false
          return item
        })
        // sort out the 'simple' and 'extreme' types
        let simpleHaunts = edit.filter(item => {
          return item.type === "simple"
        })

        let extremeHaunts = edit.filter(item => {
          return item.type === "extreme"
        })

        setSimple(simpleHaunts)
        setExtreme(extremeHaunts)

      })
  }


  const onSimpleChangeHandler = index => event => {
    // copy array
    let temp = [...simple]

    // set clicked to checked
    temp[index].checked = event.target.checked

    // save new state
    setSimple(temp)
  }

  const onExtremeChangeHandler = index => event => {
    //copy array
    let temp = [...extreme]

    //set clicked to checked
    temp[index].checked = event.target.checked

    //save new state
    setExtreme(temp)
  }

  const onSaveChangeHandler = () => {

    let orders = [...simple, ...extreme]

    //filter out the order items that have been checked and 
    //assignes those to the savedOrder variable
    let savedOrder = orders.filter((orderObj) => {
      return orderObj.checked === true
    })

    let finalOrder = savedOrder.map((orderObj) => {
      delete orderObj.checked
      orderObj.productId = orderObj._id

      return orderObj
    })

    fetch(`${baseEndpoint}${api}/order`, {
      method: "POST",
      body: JSON.stringify({ userId: 1, finalOrder }),
      headers: {
        'Authorization': `Baerer ${token}`,
        'Content-Type': 'application/json'
      }

    })
      .then(httpResult => {
        if (!httpResult.ok) {
          setAuth(false)
        }
        else {
          return httpResult.json()
        }
      })
      .then(newToken => {
        setToken(newToken)
        setOpen(true)
      })

  }


  const onSimpleClickHandler = event => {


    let allSimples = simple.map(item => {
      item.checked = !allSimple
      return item
    })
    setSimple(allSimples)
    setAllSimple(!allSimple)


  }

  const onExtremeClickHandler = event => {

    let allExtremes = extreme.map(item => {
      item.checked = !allExtreme
      return item
    })
    setExtreme(allExtremes)
    setAllExtreme(!allExtreme)

  }





  useEffect(refreshPage, [])
  return (
    <body className="body">
      <header className="header">
        <nav>
          <Button component={Link} to="/Build" color="secondary">Build Your Haunt</Button>
          <Button component={Link} to="/Details" color="secondary">Order Details</Button>
          <Button component={Link} to="/Payment" color="secondary">Check Out</Button>
        </nav>
      </header>
      <div className="containerA">
        <Typography variant="h3" gutterBottom>
          Build Your Haunt
        </Typography>
        
      </div>


      <div className="containerB">



        <div className={"splitleft"}>

          <div className="imgcontainer">
            <img className="logo" src={logo1} />
            <button
              className="button"
              onClick={onSimpleClickHandler}
            >
              Simple Haunt</button>
          </div>

          <h1>Haunt Items</h1>
          <div className="listField" >
            {simple.map((item, index) => {
              return (
                <div>
                  <span className="buildElementItem">
                    <FormGroup>

                      <FormControlLabel

                        control={
                          <Checkbox
                            checked={item.checked}
                            value={item.item}
                            onChange={onSimpleChangeHandler(index)}

                          />
                        }
                        label={item.item}

                      />
                    </FormGroup>
                  </span>
                  <span className="itemButton">
                    <IconButton
                      onClick={itemHandleOpen(item.item)}
                    >
                      <MoreIcon />
                    </IconButton>
                  </span>
                </div>
              )
            })}
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={openItem}
              onClose={itemHandleClose}>

              <div style={modalStyle} className={classes.paper}>
                <h2 id="simple-modal-title">{name}</h2>
                <p id="simple-modal-description">
                  <div>{ammount}</div>
                  <br></br>
                  <div>{description}</div>
                </p>
              </div>

            </Modal>

          </div>
        </div>

        <div className={"splitright"}>

          <div className="imgcontainer">
            <img className="logo" src={logo2} />
            <button
              className="button"
              onClick={onExtremeClickHandler}
            >Extreme Haunt</button>
          </div>

          <h1>Haunt Items</h1>
          <div className="listField">
            {extreme.map((item, index) => {
              return (
                <div>
                  <span className="buildElementItem">
                    <FormGroup >

                      <FormControlLabel

                        control={
                          <Checkbox
                            checked={item.checked}
                            value={item.item}
                            onChange={onExtremeChangeHandler(index)}
                          />
                        }
                        label={item.item}
                      />
                    </FormGroup>
                  </span>
                  <span className="itemButton">
                    <IconButton
                      onClick={itemHandleOpen(item.item)}

                    >
                      <MoreIcon />
                    </IconButton>
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>


      <div className="containerC">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={onSaveChangeHandler}
        >Save Order</Button>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}>

          <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Your Order has been Saved</h2>
            <p id="simple-modal-description">
              <div>Proceed to Order Details to view your order</div>
              <div>Or click Pay Now to complete your Order</div>
            </p>

            <br></br>
            <Button
              variant="contained"
              color="secondary"
              component={Link} to="/Details"
            >Order Details</Button>
            <span>

              <Button
                variant="contained"
                color="secondary"
                component={Link} to="/Payment"
              >Pay Now</Button>
            </span>
          </div>
        </Modal>

      </div>
    </body>
  );
}