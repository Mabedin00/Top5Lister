import { useContext, useState, useEffect } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import AppBanner from './AppBanner';
import Navbar from './Navbar';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    const [text, setText] = useState("");
    const [error, setError] = useState(null);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        store.checkPublish();
    }, [store.publishError]);
    


    // SAVES THE CURRENT LIST WITHOUT PUBLISHING IT
    function handleSave(event) {
        event.preventDefault();
        if (text.length > 0) {
            store.changeListName(store.currentList._id, text);
        }
        history.push('/home');

    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            console.log("Enter pressed");
            handleBlur()
        }
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function handleBlur() {
        if (text.length > 0) {
            store.changeListName(store.currentList._id, text);
        }
        else{
            store.changeListName(store.currentList._id, store.currentList.name);
        }
    }

    const handleClose = () => setError(null);


    // let today = new Date();
    // console.log(today.toDateString().slice(4, 10) + ", " + today.getFullYear());

    function handlePublish() {
        store.checkPublish();
        if (store.publishError) {
            setError(store.publishError);
        }
        else {
            console.log("publish");
            store.publishList();
            history.push('/home');
        }

    }

    

    if (store.currentList === null) {
        history.push('/home');
        return (<div></div>);
    }

    let editItems = "";
    if (store.currentList) {
        editItems = 
            <List>
                {
                    store.currentList.items.map((item, index) => (
                        <div id="workspace-item" key={'top5-item-' + (index+1)}>
                            <div className="item-number"><Typography variant="h4">{index+1}.</Typography></div>
                            <Top5Item 
                                text={item}
                                itemkey={'top5-item-' + (index+1)}
                                
                                index={index} 
                            />
                        </div>
                    ))
                }
            </List>;
    }
    return (

        <div className="home-screen">
            <AppBanner />
            <Navbar editActive={true} />
            <Modal
                open={error !== null}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>                    
                    <Typography variant="h4" sx= {{paddingBottom:"30px"}}>{error}</Typography>
                    <Button variant="contained" 
                        style={{ }}
                        onClick={handleClose}
                    >Cancel</Button>

                </Box>
            </Modal>
            <div id="workspace-edit">
                <TextField
                    margin="normal"
                    name="list-name"
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                    onChange={handleUpdateText}
                    label="List Name"
                    variant="outlined"  
                    defaultValue={store.currentList.name}
                    size="small"
                    id="list-name"
                    sx = {{ width: '500px',
                            marginTop: '10px',
                            marginLeft: '10px',
                        }}
                />
                <div id="workspace-items">
                    {editItems}
                </div>
                <div id="workspace-buttons">
                    <Button variant="contained" onClick= {handleSave}>Save</Button>
                    <Button variant="contained" onClick= {handlePublish}>Publish</Button>
                </div>
            </div>
        </div>
    )
}

export default WorkspaceScreen;