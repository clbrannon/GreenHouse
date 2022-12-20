import { AppBar, Toolbar, IconButton, Typography, Stack } from "@mui/material"
import { House } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const NavBar = () => {

    const handleLogOut = () => {
        localStorage.clear()

    }

    if (localStorage.getItem("honey_customer")) {
        if (localStorage.getItem("isParent") === "true") {
            return (
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton size='large' edge='start' color='inherit'>
                            <House />
                        </IconButton>

                        <Typography variant='h6' component='div' sx={{ flexGrow: 1}}>
                            Honey-Doo
                        </Typography>

                        <Stack direction="row" spacing={2}>

                            <Link className="navbar_link" to="/" onClick={handleLogOut} >Log Out</Link>

                            <Link className="navbar_link" to="/posts" underline="none">Home</Link>

                            <Link className="navbar_link" to="/completed" underline="none">Completed Tasks</Link>

                            <Link className="navbar_link" to="/createpost" underline="none">Add Task</Link>

                        </Stack>
                    </Toolbar>
                </AppBar>
            )
        }
        else {
            return (
                <AppBar position='static'>
                    <Toolbar>
    
                        <IconButton size='large' edge='start' color='inherit'>
                            <House />
                        </IconButton>
    
                        <Typography variant='h6' component='div' sx={{ flexGrow: 1}}>
                            Honey-Doo
                        </Typography>
    
                        <Stack direction="row" spacing={2}>
    
                            <Link className="navbar_link" to="/" onClick={handleLogOut} >Log Out</Link>
    
                            <Link className="navbar_link" to="/posts" underline="none">Home</Link>
    
                            <Link className="navbar_link" to="/completed" underline="none">Completed Tasks</Link>
    
                        </Stack>
                    </Toolbar>
                </AppBar>
            )
        }    
    }
    else {
        return (
            <AppBar position='static'>
                <Toolbar>
                    <IconButton size='large' edge='start' color='inherit'>
                        <House />
                    </IconButton>

                    <Typography variant='h6' component='div' sx={{ flexGrow: 1}}>
                        Honey-Doo
                    </Typography>

                </Toolbar>
            </AppBar>
        )
    }
}