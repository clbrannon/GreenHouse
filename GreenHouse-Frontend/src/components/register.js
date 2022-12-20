import { Stack, TextField, FormControlLabel, Checkbox, Button } from "@mui/material"
import { useState } from "react"


export const RegisterForm = () => {

    const blankMember = {

        fullName: "",
        username: "",
        password: "",
        parent: false,
        newHouse: false
    }

    const [member, setMember] = useState(blankMember)

    const handleSubmit = e => {
        console.log("Submit")

        return fetch(`http://localhost:8088/members`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(member)
        })
            .then(response => response.json())
            .then(() => {

                setMember(blankMember)

                // TODO !!! Bring new member to home screen

            })
    }

    const handleChange = e => {

        if (e.target.id === "newHouse") {
            setMember(member => ({...member, [e.target.id]: e.target.checked}))
        }
        else if (e.target.id === "parent") {
            setMember(member => ({...member, [e.target.id]: e.target.checked}))
        }
        else {
            setMember(member => ({...member, [e.target.id]: e.target.value}))
            console.log(member)
        }

        

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
            <FormControlLabel control={<Checkbox id="parent" value={member.parent} onChange={handleChange}/>} label="Parent"/>
            <FormControlLabel control={<Checkbox id="newHouse" value={member.newHouse} onChange={handleChange}/>} label="New Household"/>
            <Button
                onClick={(clickEvent) => handleSubmit(clickEvent)}
                color="inherit">Submit
            </Button>
            
            
    </Stack>
      


    )

}