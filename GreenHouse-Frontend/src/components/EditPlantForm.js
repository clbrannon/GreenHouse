import React, { useEffect, useState } from "react"
import { Button, Stack, TextField, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, FormControl, Box, TextareaAutosize } from "@mui/material"
import { useHistory } from "react-router-dom"


export const EditPlantForm = () => {

    const Plantid = localStorage.getItem("editPlant")
    var currentPlant = {}
    const history = useHistory()

    const [plant, setPlant] = useState(currentPlant)


    useEffect(
        () => {
            fetch(`https://localhost:7021/api/Plant/Plant${Plantid}`)


                .then(response => response.json())
                .then(plant => 
                    setPlant(plant)                                        
                )
        },
    []

    
    )

    function Today() {
        const current = new Date();

        const contdate = [(current.getFullYear()), ('0' + current.getMonth()+1).slice(-2), ('0' + current.getDate()).slice(-2)].join('-')
        const date = `${contdate}`
        return (
          
            date
          
        )
        }


    const handleChange = e => {


            setPlant(plant => ({...plant, [e.target.id]: e.target.value}))

    }

    

    

    const handleSubmit = e => {

        return fetch(`https://localhost:7021/api/Plant/${Plantid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(plant)
        })
        .then(() => {
            localStorage.setItem("editPlant", null)
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

        <TextField id="url" helperText="Image URL" value={plant.url} variant="standard" onChange={handleChange}/>
        <TextField id="commonName" helperText = "common name" value={plant.commonName} variant="standard" onChange={handleChange}/>
        <TextField id="sciName" helperText="Scientific Name" value={plant.sciName} variant="standard" onChange={handleChange}/>
        <TextField id="description" helperText="Description" multiline value={plant.description} variant="standard" onChange={handleChange}/>
        <TextField id="light" helperText="Light Requirements" value={plant.light} variant="standard" onChange={handleChange}/>
        <TextField id="soil" helperText="Soil Requirments" value={plant.soil} variant="standard" onChange={handleChange}/>
        <TextField id="lastWatered" helperText="Last Watered Date" value={plant.lastWatered} variant="standard" inputProps={
					{ readOnly: true, }
				}/>
        <TextField id="notes" helperText="Notes" multiline value={plant.notes} variant="standard" onChange={handleChange}/>
        

        <Button
           onClick={() => 
            <TextField id="lastWatered" helperText="Last Watered Date" value={Today()} variant="standard" inputProps={
                { readOnly: true, }
            }/>

        }
            color="inherit"
        >
        Water
        </Button>

        <Button
           onClick={(clickEvent) => handleSubmit(clickEvent)}
            color="inherit"
        >
        Approve Changes
        </Button>
    </Stack>
    </>
    )
}
