import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import AuthContext from '../auth'
import AppBanner from './AppBanner';
import { GlobalStoreContext } from '../store'
import MyListsScreen from './MyListsScreen';
import AllListsScreen from './AllListsScreen';
import UserListsScreen from './UserListsScreen';
import CommunityListsScreen from './CommunityListsScreen';
import Statusbar from './Statusbar';

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
            <Statusbar/>
        </div>
    )
    
}