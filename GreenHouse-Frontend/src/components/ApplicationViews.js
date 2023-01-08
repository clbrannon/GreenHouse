// import { Login } from "./Login.js"
// import { NavBar } from "./NavBar.js"
// import { RegisterForm } from "./Register.js"
import { EditPlantForm } from "./EditPlantForm.js"
import React from "react"
import { Route } from "react-router-dom"
import { PlantList } from "./plantList.js"
import { Login } from "./Login.js"
import { NewPlantForm } from "./newPlant.js"
import { RegisterForm } from "./register.js"

export const ApplicationViews = () => {
    return (

        <>
           <Route exact path="/">
               <Login />
           </Route>

           <Route path="/EditPlant">
               <EditPlantForm />
           </Route>

           <Route path="/plants">
               <PlantList />
           </Route>

           <Route path="/newplant">
               <NewPlantForm />
           </Route>

           <Route path="/register">
               <RegisterForm />
           </Route>

        
        
        </>

    )
}