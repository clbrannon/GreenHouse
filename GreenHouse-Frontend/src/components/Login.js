import React, { useRef, useState } from "react"
import { TextField, Stack, Button, Typography, Box } from "@mui/material"
import { Link, useHistory } from "react-router-dom"



export const Login = () => {
    const [username, set] = useState("")
    const existDialog = useRef()
    const history = useHistory()

    

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/members?username=${username}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("honey_customer", exists.id)
                    localStorage.setItem("isParent", exists.parent)
                    history.push("/posts")
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
                        Honey-Doo 
                    </Typography>

                    <br/>

                    <Typography variant='h3' component='div' sx={{ flexGrow: 1}}>
                        Your HouseHold To-Do list.
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

