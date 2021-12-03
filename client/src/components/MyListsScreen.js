import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store/index.js'
import AuthContext from '../auth'
import UnpublishedListCard from './UnpublishedListCard.js'
import PublishedListCard from './PublishedListCard.js'
import List from '@mui/material/List';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Fab, Typography } from '@mui/material'



export default function MyListsScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    useEffect(() => {
        store.loadIdNamePairs();
    }, [auth.user]);

    


    let listCard = "";
    let name = "";
    if (store.listMarkedForDeletion){
        name = store.listMarkedForDeletion.name;
    }

    const handleClose = () => store.unmarkListForDeletion();
    const handleConfirm = () => store.deleteMarkedList();

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
                    (pair.isPublished) ? 
                        <PublishedListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false} /> 
                        :
                        <UnpublishedListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                ))
                :
                <Typography>Loading...</Typography>
            }
            </List>;
    }
    return (
        <div id="all-lists">
            <Modal
                open={store.listMarkedForDeletion !== null}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* Make a close button at the top right of the box */}
                    
                    <Typography variant="h4" sx= {{paddingBottom:"30px"}}>Are you sure you want to delete {name}?</Typography>
                    <Button variant="contained" onClick={handleConfirm}>Confirm</Button>
                    <Button variant="contained" 
                        onClick={handleClose} 
                        style={{ marginLeft: '50%' }}
                    >Cancel</Button>

                </Box>
            </Modal>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </div>
    )
}