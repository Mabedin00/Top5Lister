import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import AuthContext from '../auth'
import AppBanner from './AppBanner';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store'
import { Divider } from '@mui/material';

export default function ListViewSection(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const { list } = props
    
    if (store.viewMode === 'community') {
        return (
            <div className="view-items">
                <List className="edit-items" >
                    {
                        list.items.map((item, index) => (
                            <div key = {index}>
                                < div >
                                    {index + 1 + ". " + item.itemName}
                                </div>
                                <div id="votes">
                                    {"(" + item.votes + " votes)"}
                                </div>
                            </div>
                        ))
                    }
                </List>
            </div>
        )
    }

    return (
        <div className="view-items">
            <List className="edit-items" >
                {
                    list.items.map((item, index) => (
                        < div key = {index}>
                            {index + 1 + ". " + item}
                        </div>
                    ))
                }
            </List>
        </div>
    )
    
}