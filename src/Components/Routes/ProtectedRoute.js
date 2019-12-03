import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer, AuthContext } from './AuthContext'


export default function ProtectedRoute ({ component: Component, ...rest}) {


    return (
        <AuthConsumer>
            {({ auth }) => (
                <Route 
                    render={props =>
                        auth ? <Component {...props}/> : <Redirect to="/" />
                    }
                    {...rest}
                    />
            )}
        </AuthConsumer>
    )
}