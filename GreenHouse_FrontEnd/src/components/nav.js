import { AppBar, Toolbar, IconButton, Typography, Stack, Item, Button } from "@mui/material"
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';

export const NavBar = () => {
    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit'>
                    <EmojiNatureIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1}}>
                    Honey Dew
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">Profile</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}