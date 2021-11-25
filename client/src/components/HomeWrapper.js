import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Fab, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import logo from '../logo.svg';
import Navbar from './Navbar'
import AuthContext from '../auth'
import AppBanner from './AppBanner';
import { GlobalStoreContext } from '../store'
import MyListsScreen from './MyListsScreen';
import AllListsScreen from './AllListsScreen';
import UserListsScreen from './UserListsScreen';
import CommunityListsScreen from './CommunityListsScreen';

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    let view = ""

    switch (store.viewMode) {
        case 'my':
            view = <MyListsScreen />
            break;
        case 'all':
            view = <AllListsScreen />
            break;
        case 'user':
            view = <UserListsScreen />
            break;
        case 'community':
            view = <CommunityListsScreen />
            break;
        default:
            view = <MyListsScreen />
            break;
    }

    return (
        <div className="home-screen">
            <AppBanner />
            <Navbar />
            {view}
        </div>
    )
    
}