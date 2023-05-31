import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { LockOpen } from "@mui/icons-material";

export default function NavBar() {

    let navigate = useNavigate()

    const onClick = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("refreshKey")
        localStorage.removeItem("userName")
        navigate(0);
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}

                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/">Home</Link>
                    </Typography>
                    <Typography variant="h6">
                        {localStorage.getItem("currentUser") == null ? <Link to="/auth">Login/Register</Link> :
                            <div><IconButton onClick={onClick}><LockOpen></LockOpen></IconButton>
                                <Link to={{ pathname: '/users/' + localStorage.getItem("currentUser") }}>Profil</Link>
                            </div>}
                    </Typography>

                </Toolbar>
            </AppBar>
        </div>
    )
}