import React, { useState, useEffect } from "react"
import { Card, CardContent, Typography, CardActions, Button, Box, Stack } from "@mui/material"
import { useHistory } from "react-router-dom"






export const PlantList = () => {

    const history = useHistory()

    const [plants, setPlants] = useState([])

    useEffect(
        () => {
            fetch(`https://localhost:7021/api/Plant`)
                .then(response => response.json())
                .then((plantArray) => {

                    setPlants(plantArray)

                })
        },
        []
    )

    const deletePlant = (ID) => {

        const index = plants.findIndex(object => {
            return object.id === ID;
        })

        console.log(index)

        fetch(`https://localhost:7021/api/Plant/${ID}`, {
            method: "DELETE"
        })

        .then(() => {

                setPlants([
                    ...plants.slice(0, index),
                    ...plants.slice(index + 1, plants.length)
                
                ]) 
        })
    
    }

    const Controls = (plant) => {

        return (
            <>

                <CardActions>
                    <Button size="small"
                        onClick={() => {
                            localStorage.setItem("editPlant", plant.id)
                            history.push("/EditPlant")
                        }}
                        >Edit
                    </Button>
                </CardActions>

                <CardActions>
                    <Button size="small"
                        onClick={() => {
                            deletePlant(plant.id)
                        }}
                        >Delete
                    </Button>
                </CardActions>       
            </> 
        )
    }



    
    return (
        
        <>

        <Box m={5} padding={2}>

            <Typography variant='h3' component='div' sx={{ flexGrow: 1}}>Plant List</Typography>

            <Button size="small"
                        onClick={() => {
                            localStorage.setItem("User", null)
                            history.push("/")
                        }}
                        >Logout
                    </Button>
    
            <Stack mt={5} direction="row" justifyContent="flex-start" alignItems="center" flexWrap="wrap" >
            
                {       
                    plants.map(
                        (plant) => {

                                return (
                            
                                    <Card variant="outlined" key={plant.id} sx={{ maxWidth: 275, minWidth: 200, m: 2, boxShadow: 20 }}>
                                        <CardContent>

                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {plant.commonName}
                                            </Typography>

                                            <Typography variant="h5" component="div">
                                            {plant.sciName}
                                            <br />
                                            </Typography>

                                            <Box
                                                 component="img"
                                                 sx={{
                                                    height: 233,
                                                    width: 350,
                                                    maxHeight: { xs: 233, md: 167 },
                                                    maxWidth: { xs: 350, md: 250 },
                                                 }}
                                             src={plant.url}
                                            />

                                            <Typography variant="body2" mt={2}>
                                            {plant.description}
                                            <br />                                      
                                            </Typography>

                                            <Typography variant="body2" mt={2}>
                                            Light: {plant.light}
                                            <br />                                      
                                            </Typography>

                                            <Typography variant="body2" mt={2}>
                                            Soil: {plant.soil}
                                            <br />                                      
                                            </Typography>

                                            <Typography variant="body2" mt={2}>
                                            Last Watered: {plant.lastWatered}
                                            <br />                                      
                                            </Typography>

                                            <Typography variant="body2" mt={2}>
                                            {plant.notes}
                                            <br />                                      
                                            </Typography>
                                            
                                          

                                        </CardContent>

                                        <Stack direction="row" spacing={1} > 

                                        {Controls(plant)} 

                                        </Stack>

                                    </Card>
                                )
                        }
                            
                                
                            
                        
                    )
                } 

                    <Button size="large"
                        onClick={() => {
                            history.push("/newplant")
                        }}
                        >Add Plant
                    </Button>        
            </Stack> 
        </Box> 
        </>
    )
}