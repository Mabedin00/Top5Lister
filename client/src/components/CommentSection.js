import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import AuthContext from '../auth'
import AppBanner from './AppBanner';
import List from '@mui/material/List';
import Comment from './Comment';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { GlobalStoreContext } from '../store'

export default function CommentSection(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const { list } = props

    const [comment, setComment] = React.useState('');

    const useStyles = makeStyles((theme) => ({
        root: {
          "& .MuiFilledInput-root": {
            background: "rgb(232, 241, 250)",
            borderRadius: "10px",
          }
        }
      }));

    const classes = useStyles();

    function handleKeyPress(e){
        if (e.key === 'Enter' && e.target.value !== '') {
            e.preventDefault();
            setComment(e.target.value);
            store.commentOnList(e.target.value, list._id)
            e.target.value = ''
        }
    }

    return (
        <div className="comment-section">
            <List id="comments" sx={{maxHeight:300, overflowY:"auto"}} >
                {
                    list.comments.map((comment) => (
                        <Comment 
                            key={comment._id}
                            comment={comment.comment}
                            username={comment.username}
                        >
                        </Comment>
                    ))
                }
            </List>
            {
                auth.loggedIn ?
                    <div className="comment-box">
                        <TextField id="comment" fullWidth label="Comment" placeholder="Add Comment" 
                            variant="filled" className={classes.root}
                            onKeyPress={handleKeyPress}
                            InputProps={{ disableUnderline: true }} />
                    </div>
                    :
                    <div />
            }
        </div>
    )
    
}