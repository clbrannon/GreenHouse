import { useEffect, useState } from "react"
import { Button, Stack, TextField, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, FormControl, Box, TextareaAutosize } from "@mui/material"
import { useHistory } from "react-router-dom"


export const EditTaskForm = () => {

    const Postid = localStorage.getItem("editPost")
    var currentPost = {}
    const history = useHistory()


    const [family, setFamily] = useState([])
    const [task, setTask] = useState(currentPost)


    useEffect(
        () => {
            fetch(`http://localhost:8088/posts/${Postid}`)
                .then(response => response.json())
                .then(post => 
                    setTask(post)
                    
                    
                )
        },
    []
)


    useEffect(
        () => {
            fetch(`http://localhost:8088/members`)
                .then(response => response.json())
                .then((famArray) => {

                    setFamily(famArray)
                })
        },
        []
    )

    const handleChange = e => {

        if (e.target.id === "noEnd") {
            setTask(task => ({...task, [e.target.id]: e.target.checked}))
        }

        else if (e.target.name === "assignSelect") {
            setTask(task => ({...task, [e.target.name]: e.target.value}))
        }

        else {
            setTask(task => ({...task, [e.target.id]: e.target.value}))

        }

    }

    const endDateOption = () => {

        if (!task.noEnd) {

            return <>

            <FormControlLabel control={<Checkbox id="noEnd" value={task.noEnd} onChange={handleChange}/>} label="No End Date"/>
            <TextField id="endDate" value={task.endDate} variant="standard" onChange={handleChange}/>
            
            </>
        }

        else { 
            
            return <FormControlLabel control={<Checkbox id="noEnd" defaultChecked value={task.noEnd} onChange={handleChange}/>} label="No End Date"/>
        }
    }

    const handleSubmit = e => {

        return fetch(`http://localhost:8088/posts/${Postid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })
        .then(response => response.json())
        .then(() => {
            history.push("/posts")
            })
    }

    return (

    <>

    <Stack       
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        mt={15} 
    >

        <TextField id="title" value={task.title} variant="standard" onChange={handleChange}/>
        <TextField id="desc"  multiline value={task.desc} variant="standard" onChange={handleChange}/>
       
        {endDateOption()}
        
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel>Assign To</InputLabel>
                <Select
                    name="assignSelect"
                    label="Assign To"
                    onChange={handleChange}
                >       
                    {
                        family.map(
                            (members) => {
                                return <MenuItem value={members.fullName} key={members.id} name="menuItem"> {members.fullName}</MenuItem>
                            }
                        )
                    }
                </Select>
            </FormControl>
        </Box>
        <Button
           onClick={(clickEvent) => handleSubmit(clickEvent)}
            color="inherit"
        >
        Post
        </Button>
    </Stack>
    </>
    )
}
