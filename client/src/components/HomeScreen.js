import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Fab, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import logo from '../logo.svg';
import AuthContext from '../auth'


export default function HomeScreen() {
    const { auth } = useContext(AuthContext);

    if (auth.loggedIn) {
        return (
            <div className="foundation-screen">
                HomeScreen but AUTHED
            </div>
        )
    }
    return (
        <div className="foundation-screen">
            HomeScreen
        </div>
    )
}