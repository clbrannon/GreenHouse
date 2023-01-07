import React, { useRef, useState } from "react"
import { TextField, Stack, Button, Typography, Box } from "@mui/material"
import { Link, useHistory } from "react-router-dom"



export const Login = () => {
    const [username, set] = useState("")
    const existDialog = useRef()
    const history = useHistory()

    

    const existingUserCheck = () => {
        return fetch(`https://localhost:7021/api/User/${username}`)
            .then(res => res.json())
            .then(user => user.id ? user : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("User", exists.id)
                    history.push("/plants")
                } 
                else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <Stack 
        
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                mt={5}
            > 
                <form className="form--login" onSubmit={handleLogin}>              
                    <Typography variant='h2' component='div' sx={{ flexGrow: 1}}>
                        GreenHouse 
                    </Typography>
            
                    <Box sx={{ m: 8, boxShadow: 20, padding: 5}} >
                        <Stack>

                            <TextField id="username" label="Username"  variant="standard" onChange={evt => set(evt.target.value)}/>

                            <Button
                                type="submit"
                                color="inherit"
                            >Sign In
                            </Button>

                            <Box sx={{ mt: 5,  }}>
                                <section className="link--register">           
                                <Link to="/register" >Not a member?</Link>
                                </section>
                            </Box>
                        </Stack>
                    </Box>                 
                </form>
            </Stack>
        </main>
    )
}

