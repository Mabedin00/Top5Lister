import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Fab, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import logo from '../logo.svg';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function RegisterScreen() {

    const handleSubmit = (event) => {
        
    };

    return (
        <div className="foundation-screen">
            <img src={logo} className="app-logo" alt="logo" />
            <div className="splash-text">
                <Typography variant="h2" gutterBottom>
                   Register
                </Typography>
            </div>
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
                    id="first-name"
                    label="First Name"
                    variant="filled"
                    name="first-name"
                    color="secondary"
                /> 
                <TextField
                    margin="normal"
                    required
                    id="last-name"
                    label="Last Name"
                    variant="filled"
                    name="last-name"
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