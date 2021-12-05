import React, { useContext, useEffect } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store/index.js'
import PublishedListCard from './PublishedListCard.js'
import List from '@mui/material/List';

export default function CommunityListsScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadCommunityLists();
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
                        isCommunityList={true}
                        selected={false} 
                    /> 
                    
                ))
                :
                <div/>
            }
            </List>;
    }

    
    return (
        <div id="community-lists">
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </div>

    )
}