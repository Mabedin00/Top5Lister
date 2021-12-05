import React, { useContext, useEffect } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import { Fab, Typography } from '@mui/material'


export default function Comment(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const { comment, username } = props;
    
    return (
        <div className="comment">
            <Typography sx={{fontSize:12}}>{username}</Typography>
            <Typography variant="h5">{comment}</Typography>
        </div>
    )
    
}