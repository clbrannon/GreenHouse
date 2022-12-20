import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material"
import { House } from "@mui/icons-material";

export const NavBar = () => {
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
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">Profile</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}