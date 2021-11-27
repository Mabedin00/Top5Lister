import React, { useContext } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';


export default function UserListsScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    function handleCreateNewList() {
        store.createNewList();
    }
    
    // console.log(auth.user);
    if (store.viewMode === 'my'){
        return (
            <div id="statusbar">
                <Button onClick={handleCreateNewList} >
                    <AddIcon  sx = {{color:"black", fontSize:"400%"}} />
                </Button>
                <Typography variant="h4" sx={{marginTop:"auto", marginBottom:"auto"}} > Your Lists </Typography>
            </div>
        )
    }
    return (
        <div id="statusbar">
            <Typography variant="h4" sx={{marginTop:"auto", marginBottom:"auto"}} >
                 {store.viewMode.charAt(0).toUpperCase() + store.viewMode.slice(1)} Lists 
            </Typography>
        </div>
    )
    
}