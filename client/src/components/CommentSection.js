import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import AuthContext from '../auth'
import AppBanner from './AppBanner';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store'

export default function CommentSection(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const { list } = props
    
    return (
        <div className="comment-section">
            {/* <List id="comments" >
                {
                    list.comments.map((comment) => (
                        < div>
                            
                        </div>
                    ))
                }
            </List> */}
        </div>
    )
    
}