import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ListViewSection from './ListViewSection'


function UnpublishedListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [isOpen, setOpen] = useState(false);
    const { idNamePair } = props;


    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function handleOpenList(event, id) {
        event.stopPropagation();
        setOpen(true);
    }
    function handleCloseList(event, id) {
        event.stopPropagation();
        setOpen(false);

    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            if (text.length > 0) {
                store.changeListName(id, text);
                toggleEdit();
            }
            else{
                store.changeListName(id, idNamePair.name);
                toggleEdit();
            }
            
        }
    }
    const d = new Date(idNamePair.publishedDate);
    const date = d.toDateString().slice(4, 10) + ", "+ d.toDateString().slice(11, 15)

    let cardElement =
        <ListItem
            id={idNamePair._id}
            itemkey={idNamePair._id}
            style={{
                height: '100%',
                width: '100%',
                backgroundColor: '#fffff1',
                margin: '5px 0px 5px 0px',
                borderRadius: '10px', 

            }}
        >
            <Grid container spacing={4}>
                <Grid item xs={9}>
                    <div className="list-details">
                        <Box sx={{ fontSize: 24,  p: 1, flexGrow: 1 }}>{idNamePair.name}</Box> 
                        <Box sx={{ p: 1, flexGrow: 1 }}> {"By: " + idNamePair.ownerUsername} </Box>
                        {
                            isOpen ? 
                            <Box sx={{ fontSize: 24,  p: 1, flexGrow: 1 }}> 
                                <ListViewSection list={idNamePair} />
                            </Box> :
                            <div />
                        }
                            <Button 
                                variant="text" 
                                onClick={(event) => {
                                        handleLoadList(event, idNamePair._id)
                                }}
                                style={{
                                    justifyContent: 'flex-start',
                                    color: '#ff0000',
                                }}

                            > Edit  </Button>
                    </div>
                </Grid>
                <Grid item xs={3} 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                    }}
                >
                    <Box>
                        <IconButton onClick={(event) => {
                            handleDeleteList(event, idNamePair._id)
                        }} aria-label='delete'>
                            <DeleteIcon style={{fontSize:'36pt'}} />
                        </IconButton>
                    </Box>
                    <Box>
                       {    
                            isOpen ? 
                            <IconButton aria-label='drop-up' 
                                onClick={(event) => {
                                handleCloseList(event, idNamePair._id)
                                }}
                            >
                                <ArrowDropUpIcon style={{fontSize:'36pt'}} />
                            </IconButton> :
                            <IconButton aria-label='drop-down'
                                onClick={(event) => {
                                handleOpenList(event, idNamePair._id)
                                }}
                            >
                                <ArrowDropDownIcon style={{fontSize:'36pt'}} />
                            </IconButton>
                        }
                    </Box>
                </Grid>
            </Grid>

        </ListItem>
    return (
        cardElement
    );
}

export default UnpublishedListCard;