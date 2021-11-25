import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Fab, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import logo from '../logo.svg';
import Navbar from './Navbar'
import AuthContext from '../auth'
import AppBanner from './AppBanner';

export default function CommunityListsScreen() {
    const { auth } = useContext(AuthContext);

    
    return (
        <div >
            Community Lists
        </div>
    )
}