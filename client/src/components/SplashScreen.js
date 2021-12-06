import React from 'react'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button';
import logo from '../logo.svg';


export default function SplashScreen() {

    return (
        <div className="foundation-screen">
            <img src={logo} className="app-logo" alt="logo" />
            <div className="splash-text">
                <Typography variant="h3" gutterBottom>
                    Welcome to the Top 5 Lister
                </Typography>
                <Typography variant="h4" gutterBottom>
                    This is a website that allows you to create any top 5 list of your choosing.
                </Typography>
            </div>
            {/* add button for login, create account and continue as guest */}
            <div className="splash-button-container">
                <div>
                    <Button variant="contained" color="primary" href = "/login/">
                        Login
                    </Button> 
                </div>
                <div>   
                    <Button variant="contained" color="primary" href = "/register/">
                        Create Account
                    </Button> 
                </div>
                <div>
                    <Button variant="contained" color="primary" href = "/home/" >
                        Continue as Guest
                    </Button>
                </div>
            </div>

        </div>
    )
}