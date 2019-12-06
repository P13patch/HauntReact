import React, { Component, useEffect, useContext } from 'react';

import './admin.css'

import { baseEndpoint, api, Button } from '../const'


export default function Admin() {

    const [product, setProduct] = React.useState([])

    //let { token, setToken } = useContext(AuthContext)

    const refreshPage = () => {

        fetch(`${baseEndpoint}${api}/product`, {
            method: "GET",

        })
            .then(httpResult => httpResult.json())
            .then(result => {
                setProduct(result)
            })
    }


    const deleteClickHandler = id => event => {
        console.log(`*${id}*`)

        fetch(`${baseEndpoint}${api}/product/${id}`,
            {
                method: 'DELETE',

            })
            .then(result => {
                if (result.statusText === "OK") {
                    refreshPage()
                }
            }

            )

    }



    useEffect(refreshPage, [])
    return (
        <div>
            <div className="body">
                <h1>List of all Products</h1>
                <div className="productField">
                    {product.map((item, index) => {
                        return (

                            <div key={item._id}>

                                <div className="productList">
                                    <div className='productBox'>
                                        <span className="productItem">{item.item}</span>

                                        <span className="productAmmount">{item.ammount}</span>


                                        <div className="productDescription">{item.description}</div>

                                        <span className="deletebutton">
                                            <Button onClick={deleteClickHandler(item._id)}>
                                                Delete Item
                                        </Button>
                                        </span>
                                    </div>
                                </div>
                            </div>

                        )
                    })}
                </div>
            </div>
        </div>
    )
}