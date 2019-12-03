import React, { useState } from 'react';

const AuthContext = React.createContext({});

function AuthProvider(props) {

    const [auth, setAuth] = useState(false)
    const [token, setToken] = useState("")
  

    

    return (
        <div>
            <AuthContext.Provider value={{ setAuth, auth, setToken, token }}>
                {props.children}
            </AuthContext.Provider>
            
        </div>
    )

}

const AuthConsumer = AuthContext.Consumer
export { AuthProvider, AuthConsumer, AuthContext }