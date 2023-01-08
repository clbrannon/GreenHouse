import React, { useState } from "react"
import { Button, Stack, TextField, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, FormControl, Box, TextareaAutosize } from "@mui/material"
import { useHistory } from "react-router-dom"



export const NewPlantForm = () => {

    const history = useHistory()

    function Today() {
        const current = new Date();

        const contdate = [(current.getFullYear()), ('0' + current.getMonth()+1).slice(-2), ('0' + current.getDate()).slice(-2)].join('-')
        const date = `${contdate}`
        return (
          
            date
          
        )
        }
    
    const blankPlant = {
        userId: localStorage.getItem("User"),
        url: "",
        commonName: "",
        sciName: "",
        description: "",
        light: "",
        soil: "",
        lastWatered: Today(),
        notes: ""
    }

    
      
      
    const [plant, setPlant] = useState(blankPlant)


    const handleChange = e => {

            setPlant(plant => ({...plant, [e.target.id]: e.target.value}))

    }


    const handleSubmit = e => {
        console.log(plant)

        return fetch(`https://localhost:7021/api/Plant/NewPlant`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(plant)
            })

            .then(() => {
                setPlant(blankPlant)
                history.push("/plants")

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

        <TextField id="url" label="Image URL" value={plant.url} variant="standard" onChange={handleChange}/>
        <TextField id="commonName" label="Common Name" value={plant.commonName} variant="standard" onChange={handleChange}/>
        <TextField id="sciName" label="Scientific Name" value={plant.sciName} variant="standard" onChange={handleChange}/>
        <TextField id="description" label="Description" multiline value={plant.description} variant="standard" onChange={handleChange}/>
        <TextField id="light" label="Light Requirements" value={plant.light} variant="standard" onChange={handleChange}/>
        <TextField id="soil" label="Soil Requirments" value={plant.soil} variant="standard" onChange={handleChange}/>
        <TextField id="lastWatered" label="Last Watered Date" value={plant.lastWatered} variant="standard" inputProps={
					{ readOnly: true, }
				}/>
        <TextField id="notes" label="Notes" multiline value={plant.notes} variant="standard" onChange={handleChange}/>
        
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
