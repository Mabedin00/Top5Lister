import React, { useContext, useEffect } from 'react'
import AuthContext from '../auth'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
import { Link } from 'react-router-dom'
import { Fab, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import logo from '../logo.svg';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Cancel';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function RegisterScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

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

    
    const handleClose = () => auth.setError(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        auth.registerUser({
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            username: formData.get('username'),
            password: formData.get('password'),
            passwordVerify: formData.get('passwordVerify')
        }, store);

    };

    return (
        <div className="foundation-screen">
            <img src={logo} className="app-logo" alt="logo" />
            <div className="splash-text">
                <Typography variant="h2" gutterBottom>
                   Register
                </Typography>
            </div>
            <Modal
                open={auth.error !== null}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* Make a close button at the top right of the box */}
                    <IconButton onClick={handleClose}
                        sx = {{position: 'absolute', top: '0', right: '0'}}
                    > 
                        <CloseIcon />
                    </IconButton>
                    <Alert severity="error" >
                        {auth.error}
                    </Alert>
                </Box>
            </Modal>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    maxWidth: '100%',
                }}
                noValidate
                onSubmit={handleSubmit}
            >   

                <TextField
                    margin="normal"
                    required
                    id="firstName"
                    label="First Name"
                    variant="filled"
                    name="firstName"
                    color="secondary"
                /> 
                <TextField
                    margin="normal"
                    required
                    id="lastName"
                    label="Last Name"
                    variant="filled"
                    name="lastName"
                    color="secondary"
                /> <br/>
                <TextField
                    margin="normal"
                    required
                    style={{width: '30%'}}
                    fullWidth
                    id="username"
                    label="Username"
                    variant="filled"
                    name="username"
                    color="secondary"
                /> <br/>
                <TextField
                    margin="normal"
                    required
                    style={{width: '30%'}}
                    id="email"
                    label="Email"
                    variant="filled"
                    name="email"
                    color="secondary"
                /> <br/>
                <TextField
                    margin="normal"
                    required
                    name="password"
                    label="Password"
                    type="password"
                    variant="filled"
                    color="secondary"
                    id="password"
                />
                <TextField
                    margin="normal"
                    required
                    name="passwordVerify"
                    label="Password Verify"
                    type="password"
                    id="passwordVerify"
                    variant="filled"
                    color="secondary"
                /><br/>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{width: '30%'}}
                >
                    Sign Up
                </Button> <br/>
                <Link to="/login/" variant="body2">
                    {"Already have an account? Log in"}
                </Link>
            </Box>

        </div>
    )
}