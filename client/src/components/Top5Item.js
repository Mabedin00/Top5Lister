import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';

function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }
    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsItemEditActive();
        }
        setEditActive(newActive);
    }
    console.log(props);
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            if (text.length > 0) {
                store.updateItem(props.index, text);
                toggleEdit();

            }
            
        }
    }



    function handleUpdateText(event) {
        setText(event.target.value);
    }




    let { index } = props;

    let listItem = (
        <ListItem
            id={'item-' + (index+1)}
            itemKey={props.itemKey}
            className="top5-item"
            onDoubleClick={handleToggleEdit}
            sx={{ display: 'flex', p: 1, width: .90}}
            style={{
                fontSize: '18pt',
            }}
        > 
            <Box sx={{ p: 1, flexGrow: 1}}>{props.text}</Box>
        </ListItem>
    );  // end of listItem
    if (editActive) {
        listItem = (
            <TextField
                margin="normal"
                required
                label="List Item"
                name="name"
                autoComplete="List Item"
                className='list-item'
                color="secondary"
                onKeyPress={handleKeyPress}
                onBlur={toggleEdit}
                onChange={handleUpdateText}
                defaultValue={props.text}
                inputProps={{style: {fontSize: 24}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
        );
    }
    
    return listItem; 
}

export default Top5Item;