import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    SET_LOGGED_IN: "SET_LOGGED_IN",
    SET_ERROR: "SET_ERROR",
    REGISTER_USER: "REGISTER_USER"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error: null
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: null
                });
            }
            case AuthActionType.SET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: null

                });
            }

            case AuthActionType.SET_ERROR: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: payload.error,
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: null
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        try {
            const response = await api.getLoggedIn();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    auth.registerUser = async function(userData, store) {
        await api.registerUser(userData)
        .then(response => {
            if (response.status === 200) {     
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
            // history.push("/");
            // store.loadIdNamePairs();
            }
        }
        ).catch(err => { 
            let errorMsg = err.response.data.errorMessage;
            authReducer({
                type: AuthActionType.SET_ERROR,
                payload: {
                    error: errorMsg
                }
            })

        });      
            
    }

    // Logs user in and sets the state
    auth.loginUser = async function(userData, store) {
        await api.loginUser(userData).then(response => {
            if (response.status === 200) {
                console.log(response.data.user);
                authReducer({
                    type: AuthActionType.SET_LOGGED_IN,
                    payload: {
                        loggedIn: true,
                        user: response.data.user
                    }
                })
                    history.push("/home");
                    // store.loadIdNamePairs();
                }
            }).catch(err => {
                let errorMsg = err.response.data.errorMessage;
                console.log(errorMsg);
                authReducer({
                    type: AuthActionType.SET_ERROR,
                    payload: {
                        error: errorMsg
                    }
                })
            });
        
    }

    auth.logoutUser = async function() {
        try{
            const response = await api.logoutUser();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.SET_LOGGED_IN,
                    payload: {
                        loggedIn: false,
                        user: null
                    }
                })
                history.push("/");
            }
        }
        catch(err) {
            console.log(err);
        }   
    }   

    auth.setError = (error) => {
        authReducer({
            type: AuthActionType.SET_ERROR,
            payload: {
                error: error
            }
        })
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };