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
import CommentSection from './CommentSection';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AuthContext from '../auth'




function PublishedListCard(props) {
    const numeral = require('numeral');
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [isOpen, setOpen] = useState(false);
    const { idNamePair } = props;



    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function handleOpenList(event) {
        event.stopPropagation();
        setOpen(true);
        store.viewList(idNamePair._id);
    }
    function handleCloseList(event) {
        event.stopPropagation();
        setOpen(false);

    }

    function isLiked(){
        return idNamePair.likedBy.includes(auth.user.username);
    }

    function isDisliked(){
        return idNamePair.dislikedBy.includes(auth.user.username);
    }


    function handleLike(){
        console.log(idNamePair.likedBy.length);
        store.likeList(idNamePair._id);
    }
    
    function handleDislike(){
        console.log("w");
        store.dislikeList(idNamePair._id);
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
                backgroundColor: '#d4d4f5',
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
                                <CommentSection />
                            </Box> : 
                            <div />
                        }
                        <Box sx={{ p: 1, flexGrow: 1 }}> {"Published: " + date } </Box> 
                        <Box sx={{fontSize: 12, p: 1, flexGrow: 1 }}> {"Views: " + idNamePair.views} </Box>
                    </div>
                </Grid>
                <Grid item xs={2}
                    sx={{
                        display: 'flex',    
                        flexDirection: 'column',    
                        alignItems: 'flex-end',

                    }}
                >
                    <Box>
                        <IconButton onClick={() => {handleLike()}} aria-label='thumbs-up'>
                            <ThumbUpIcon style={{fontSize:'36pt', fill: isLiked() ? "blue" : "" }} />
                            <Typography variant="h4" component="h6"> {numeral(idNamePair.likedBy.length).format('0,a')}</Typography>
                        </IconButton>
                    </Box>
                    <Box>
                        <IconButton onClick={() => {handleDislike()}} aria-label='thumbs-down'>
                            <ThumbDownIcon style={{fontSize:'36pt', fill: isDisliked() ? "blue" : ""}} />
                            <Typography variant="h4" component="h6"> {numeral(idNamePair.dislikedBy.length).format('0,a')}</Typography>
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item xs={1} 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                    }}
                >
                    { 
                        store.viewMode === 'my' ?    
                            <Box>
                                <IconButton onClick={(event) => {
                                    handleDeleteList(event, idNamePair._id)
                                }} aria-label='delete'>
                                    <DeleteIcon style={{fontSize:'36pt'}} />
                                </IconButton>
                            </Box> :
                            <div/>
                    }
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

export default PublishedListCard;