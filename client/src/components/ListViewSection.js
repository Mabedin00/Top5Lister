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