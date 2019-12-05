import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './Homepage.css'

import HouseImg from '../Components/Images/houseimg.jpg'
import House2Img from '../Components/Images/winterhouse.jpg'
import SnowImg from '../Components/Images/snow.jpg'
import VoodooImg from '../Components/Images/voodooDoll.jpg'
import GingerHouseImg from '../Components/Images/GingerHouse.jpg'
import WitchBrewImg from '../Components/Images/witchBrew.jpg'


import { Button } from "./const"




export default function Homepage() {
    return (
        <div className="homepagebody">
            <div className="box1">
                <img className="houseImage" src={HouseImg} alt="Haunted House"></img>

            </div>

            <div className="box2">
                <div className='top'>
                    <h1 className='title'>Welcome to HauntCo!</h1>
                    <h2>We make Halloween happen</h2>
                    
                    
                </div>
                <div className='bottom'>
                    <div className="imageBox">
                        <img className='GingerHouse' src={GingerHouseImg}></img>
                        <p className="imageText">Haunted Gingerbread House</p>
                    </div>
                    <div className="imageBox">
                        <img className='WitchBrew' src={WitchBrewImg}></img>
                        <p className="imageText">Potions kit</p>
                    </div>
                    <div className="imageBox">
                        <img className='Voodoo' src={VoodooImg}></img>
                        <p className="imageText">Voodoo Doll Kit</p>
                    </div>
                </div>

            </div>

            <div className="box3">
                <h1 className="title">Elevate your Halloween this year!</h1>
                <h2>We deliver products that will help make your halloween a spooky one</h2>
                <p>Whether it is a simple spook you are looking for, or an extreme Haunt, our products will satisfy your darkest desires!</p>
                <p>Get Started and build the perfect Haunt package for this years Halloween fun.</p>
                <Button
                variant="contained"
                color="secondary"
                size="large"
                component={Link} to="/Build"
                >Get Started!</Button>

            </div>

           
            <div className="box5">
                <div className="top">
                    <h1 className="title">Coming soon! Haunt your holidays!!</h1>
                </div>

                <div className="bottom">
                    <div className="imageBox">
                        <img className="House2" src={House2Img}></img>
                        <img className="Snow" src={SnowImg}></img>
                    </div>
                </div>


            </div>
        </div>
    )

}

