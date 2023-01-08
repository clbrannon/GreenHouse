import { Stack, TextField, FormControlLabel, Checkbox, Button, useColorScheme } from "@mui/material"
import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { check } from "yargs"




export const RegisterForm = () => {

    const blankMember = {

        fullName: "",
        username: "",
        greenhouse: "",
        Image: ""

    }

    const history = useHistory()

    const [member, setMember] = useState(blankMember)

    const handleSubmit = e => {

        return fetch(`https://localhost:7021/api/User`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(member)
        })
           
            .then(() => {

                setMember(blankMember)
            })

            .then(() => {
                history.push("/")             
            })
        
    }


    const [users, setUsers] = useState()

    useEffect(
        () => {
            fetch(`https://localhost:7021/api/user`)
                .then(response => response.json())
                .then((userArray) => {

                    setUsers(userArray)

                })
        },
        []
    )


    const usernameCheck = (newUser, userArray) => {
        check = true
        userArray.forEach(eachuser => {
            
            
            if (eachuser.username = newUser) {
                check = false
            }
            else {}
        })
        return check
    }


     const handleChange = e => {

    //     if (!usernameCheck(member.username, users)) {

    //         <TextField error id="username" label="Username Taken"  variant="standard" value={member.username} onChange={handleChange}/>

    //     }
    //     else {

             setMember(member => ({...member, [e.target.id]: e.target.value}))
    //     }
 
     }

    return (
        
      
        <Stack 
                
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                mt={15}
            > 
                    
                    <TextField id="fullName" label="Full Name"  variant="standard" value={member.fullName} onChange={handleChange}/>
                    <TextField id="username" label="Username"  variant="standard" value={member.username} onChange={handleChange}/>
                    <TextField id="password" type='password' label="Password" variant="standard" value={member.password} onChange={handleChange}/>
                    <TextField id="greenhouse" label="Greenhouse Name"  variant="standard" value={member.greenhouse} onChange={handleChange}/>
                    <TextField id="image" label="Image URL"  variant="standard" value={member.image} onChange={handleChange}/>


                    <Button
                        onClick={(clickEvent) => handleSubmit(clickEvent)}
                        color="inherit">Submit
                    </Button>

                    <Link className="navbar_link" to="/" underline="none">Back</Link>
                                      
            </Stack>
    )

}