import { useEffect, useState } from "react"
import { Button, Stack, TextField, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, FormControl, Box, TextareaAutosize } from "@mui/material"
import { useHistory } from "react-router-dom"

import DatePicker from "react-datepicker";

function TableDatePicker() {
    const [date, setDate] = useState(new Date());
   
    return (
      <DatePicker selected={date} onChange={date => setDate(date)} />
    );
   }



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

    
      
      
      
      
      

   // const [family, setFamily] = useState([])
    const [plant, setPlant] = useState(blankPlant)

    // useEffect(
    //     () => {
    //         fetch(`http://localhost:8088/members`)
    //             .then(response => response.json())
    //             .then((famArray) => {

    //                 setFamily(famArray)
    //             })
    //     },
    //     []
    // )

    const handleChange = e => {

        // if (e.target.id === "noEnd") {
        //     setTask(task => ({...task, [e.target.id]: e.target.checked}))

        // }

        // else if (e.target.name === "assignSelect") {
        //     setTask(task => ({...task, [e.target.name]: e.target.value}))
        // }

        // else {
            setPlant(plant => ({...plant, [e.target.id]: e.target.value}))

        // }
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
