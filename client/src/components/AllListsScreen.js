import React, { useContext, useEffect } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store/index.js'
import PublishedListCard from './PublishedListCard.js'
import List from '@mui/material/List';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Fab, Typography } from '@mui/material'

export default function AllListsScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);


    useEffect(() => {
        store.loadPublishedLists();
    }, []);

    
    let listCard = "";

    if (store) {
        listCard = 
            <List sx={{ 
                width: '95%', 
                left: '2%', 
                dsplay: 'flex',
                gap: '1rem',
                }}>
            {
                store.idNamePairs !== undefined ?
                store.idNamePairs.map((pair) => (
                    <PublishedListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false} 
                    /> 
                    
                ))
                :
                <div/>
            }
            </List>;
    }

    return (
        <div id="all-lists">
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </div>

    )
}