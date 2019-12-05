import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';









export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {

    setAnchorEl(event.currentTarget);

  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  

  return (
    <div>

      <IconButton color="secondary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon></MenuIcon> Get Started

      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}

      >

        <nav>
          <MenuItem  onClick={handleClose} component={Link} to="/">Home</MenuItem>
          <MenuItem  onClick={handleClose} component={Link} to="/Build">Order Now</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/Admin">Admin</MenuItem>
        </nav>

      </Menu >
    </div >
  );
}