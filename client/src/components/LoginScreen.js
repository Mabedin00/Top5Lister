import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Fab, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import logo from '../logo.svg';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';




export default function LoginScreen() {

    const handleSubmit = (event) => {
        
    };

    return (
        <div className="foundation-screen">
            <img src={logo} className="app-logo" alt="logo" />
            <div className="splash-text">
                <Typography variant="h2" gutterBottom>
                    Login
                </Typography>
            </div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                onSubmit={handleSubmit}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    variant="filled"
                    name="username"
                    color="secondary"
                    autoComplete="username"
                    autoFocus
                /> <br/>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    variant="filled"
                    color="secondary"
                    id="password"
                    autoComplete="current-password"
                /><br/>
                <FormControlLabel
                    control={<Checkbox value="remember" color="secondary" />}
                    label="Remember me"
                /><br/>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button> <br/>
                <Link to="/register/" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link> 
            </Box>
        </div>
    )
}