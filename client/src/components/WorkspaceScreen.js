import { useContext } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import Statusbar from './Statusbar';
import AppBanner from './AppBanner';
import Navbar from './Navbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);

    let editItems = "";
    if (store.currentList) {
        editItems = 
            <List>
                {
                    store.currentList.items.map((item, index) => (
                        <div id="workspace-item">
                            <div className="item-number"><Typography variant="h4">{index+1}.</Typography></div>
                            <Top5Item 
                                text={item}
                                itemkey={'top5-item-' + (index+1)}
                                key={'top5-item-' + (index+1)}
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
            <Navbar />
            <div id="workspace-edit">
                <TextField
                    margin="normal"
                    name="query"
                    label="List Name"
                    variant="outlined"  
                    size="small"
                    id="query"
                    sx = {{ width: '500px',
                            marginTop: '10px',
                            marginLeft: '10px',
                        }}
                />
                <div id="workspace-items">
                    {editItems}
                </div>
                <div id="workspace-buttons">
                    <Button variant="contained">Save</Button>
                    <Button variant="contained">Publish</Button>
                </div>
            </div>
            {/* <Statusbar/> */}
        </div>
    )
}

export default WorkspaceScreen;