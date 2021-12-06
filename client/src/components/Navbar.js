import React, { useContext, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import GroupsIcon from '@mui/icons-material/GroupsOutlined';
import FunctionsIcon from '@mui/icons-material/FunctionsOutlined';
import SortIcon from '@mui/icons-material/Sort';
import Box from '@mui/material/Box';
import AuthContext from '../auth';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import { GlobalStoreContext } from '../store'



export default function Navbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);


    const sortStyle = {
        fontSize: "68px",
        // marginLeft: '10%',

    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (mode) => {
        let allowedModes = new Set();
        allowedModes.add('newest');
        allowedModes.add('oldest');
        allowedModes.add('views');
        allowedModes.add('likes');
        allowedModes.add('dislikes');
        if (allowedModes.has(mode)) {
            console.log(mode);
            store.setSortOrder(mode);
            setAnchorEl(null);
        }
    };

    // Handle click for change view
    const handleClick = (viewMode) => {
        store.changeViewMode(viewMode);
    }
    
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (e.target.value.length > 0) {
                if (store.viewMode === 'user') {
                    store.loadListsByUsername(e.target.value);
                } 
                else if (store.viewMode === 'community') {
                    store.getCommunityListByString(e.target.value);
                }
                else {
                    store.getListByString(e.target.value);
                }
            }
        }
    }



    const menuId = 'primary-search-account-menu';
    const sortByMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => handleMenuClose("newest")}>Date Posted (Newest)</MenuItem>
            <MenuItem onClick={() => handleMenuClose("oldest")}>Date Posted (Oldest)</MenuItem>
            <MenuItem onClick={() => handleMenuClose("views")}>Views</MenuItem>
            <MenuItem onClick={() => handleMenuClose("likes")}>Likes</MenuItem>
            <MenuItem onClick={() => handleMenuClose("dislikes")}>Dislikes</MenuItem>
        </Menu>
    );
    

    return (
        <div className="navbar">
            <Box display="flex"  alignItems="center">
                <IconButton disabled={!auth.loggedIn} onClick={() => handleClick('my')}>
        
                    <HomeIcon sx={{
                        fontSize: "68px",
                        marginRight: '10px',
                        border: store.viewMode === 'my' ? '4px solid #00ff00' : 'none'
                    }}
                    />
                </IconButton>
                <IconButton onClick={() => handleClick('all')}>
                    <GroupsIcon sx={{
                        fontSize: "68px",
                        marginRight: '10px',
                        border: store.viewMode === 'all' ? '4px solid #00ff00' : 'none'
                    }} />
                </IconButton>
                <IconButton onClick={() => handleClick('user')}>
                    <PersonIcon sx={{
                        fontSize: "68px",
                        marginRight: '10px',
                        border: store.viewMode === 'user' ? '4px solid #00ff00' : 'none'
                    }} />
                </IconButton>
                <IconButton onClick={() => handleClick('community')}>
                    <FunctionsIcon sx={{
                        fontSize: "68px",
                        marginRight: '10px',
                        border: store.viewMode === 'community' ? '4px solid #00ff00' : 'none'
                    }} />
                </IconButton>
                <TextField
                    margin="normal"
                    name="query"
                    label="Search"
                    variant="filled"  
                    onKeyPress={handleKeyPress}
                    size="small"
                    id="query"
                    sx = {{ marginLeft: '30px',
                            width: '500px',
                            marginTop: '8px',
                        }}
                />
                <Typography variant="h6"  sx = {{marginLeft:"auto", marginRight: "20px"}}> 
                    SORT BY
                </Typography>
                <SortIcon sx={sortStyle} onClick={handleMenuOpen} />
            </Box>
            {
                sortByMenu
            }
        </div>
    )
}