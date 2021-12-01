import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
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
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    console.log(idNamePair);
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            style={{
                height: '100%',
                width: '100%',
                backgroundColor: '#d4d4f5',
                margin: '5px 0px 5px 0px',
                borderRadius: '10px', 

            }}
        >
            <Grid container spacing={4}>
                <Grid item xs={8}>
                    <div className="list-details">
                        <Box sx={{ fontSize: 24,  p: 1, flexGrow: 1 }}>{idNamePair.name}</Box> 
                        <Box sx={{ p: 1, flexGrow: 1 }}> {"By: " + idNamePair.ownerUsername} </Box>
                        {
                            idNamePair.isPublished ?
                            <Box sx={{ p: 1, flexGrow: 1 }}> {"Published: " } </Box> :
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
                        }
                    </div>
                </Grid>
                <Grid item xs={4} 
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
                        <IconButton aria-label='drop-down'>
                            <ArrowDropDownIcon style={{fontSize:'36pt'}} />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;