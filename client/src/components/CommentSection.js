import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import AuthContext from '../auth'
import AppBanner from './AppBanner';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store'
import { Divider } from '@mui/material';

export default function CommentSection(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const { list } = props
    
    return (
        <div className="comment-section">
            <List id="comments" >
                {
                    list.comments.map((comment) => (
                        < div>
                            {index + 1 + ". " + item}
                        </div>
                    ))
                }
            </List>
        </div>
    )
    
}