import { useState, useEffect } from "react"
import { Card, CardContent, Typography, CardActions, Button, Box, Stack } from "@mui/material"
import { useHistory } from "react-router-dom"






export const PostList = () => {

    const history = useHistory()

    const [posts, setPosts] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/posts`)
                .then(response => response.json())
                .then((postArray) => {

                    setPosts(postArray)

                })
        },
        []
    )

    const deletePost = (ID) => {

        const index = posts.findIndex(object => {
            return object.id === ID;
        })

        console.log(index)

        fetch(`http://localhost:8088/posts/${ID}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(() => {

                setPosts([
                    ...posts.slice(0, index),
                    ...posts.slice(index + 1, posts.length)
                
                    ]) 
        })
    
    }
        



    const ParentalControls = (post) => {

            if (localStorage.getItem("isParent") === "true") {
    
            return (
                <>
    
                <CardActions>
                    <Button size="small"
                    onClick={() => {
                        localStorage.setItem("editPost", post.id)
                        history.push("/editpost")
                    }}
                    >Edit
                    </Button>
                    </CardActions>
    
                    <CardActions>
                    <Button size="small"
                    onClick={() => {
                        deletePost(post.id)}}
                    >Delete
                    </Button>
                    </CardActions>       
                </> 
            )
        }
    }
    


    return (
        
        <>

        <Box m={5} padding={2}>

            <Typography variant='h3' component='div' sx={{ flexGrow: 1}}>{(window.location.pathname == "/posts") ? "Open Tasks" : "Completed Tasks"}</Typography>
    
            <Stack mt={5} direction="row" justifyContent="flex-start" alignItems="center" flexWrap="wrap" >
            
                {       
                    posts.map(
                        (post) => {

                            if(!post.completed && window.location.pathname == "/posts") {

                                return (
                            
                                    <Card variant="outlined" key={post.id} sx={{ maxWidth: 275, minWidth: 200, m: 2, boxShadow: 20 }}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {post.title}
                                            </Typography>

                                            <Typography variant="h5" component="div">
                                            {post.desc}
                                            <br />
                                            </Typography>

                                            <Typography variant="body2" mt={2}>
                                            Assigned to {post.assignSelect}
                                            <br />                                      
                                            </Typography>

                                            {post.noEnd ? <br /> : <Typography variant="body2"> Deadline: {post.endDate} <br /> </Typography>}
                                            

                                        </CardContent>

                                        <Stack direction="row" spacing={1} >

                                            <CardActions>
                                                <Button size="small" onClick={() => {


                                                    var completedPost = post
                                                    completedPost.completed = true

                                                    return fetch(`http://localhost:8088/posts/${post.id}`, {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type": "application/json"
                                                        },
                                                        body: JSON.stringify(completedPost)
                                                    })
                                                    .then(response => response.json())
                                                    .then(() => {

                                                       // const index = posts.findIndex(object => {
                                                       //     return object.id === post.id;
                                                      //  })
                                                        
                                                        setPosts([
                                                            ...posts.slice(0, post.id - 1),
                                                            ...posts.slice(post.id, posts.length)
                                                        ]) 
                                                    })
                                                }}>Complete</Button>
                                            </CardActions>

                                            {ParentalControls(post)}



                        
                                        </Stack>

                                    </Card>
                            )
                            }
                            else if (post.completed && window.location.pathname == "/completed") {

                                return (
                            
                                    <Card variant="outlined" sx={{ maxWidth: 275, minWidth: 200, m: 2, boxShadow: 20 }}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {post.title}
                                            </Typography>

                                            <Typography variant="h5" component="div">
                                            {post.desc}
                                            <br />
                                            </Typography>

                                            <Typography variant="body2" mt={2}>
                                            Assigned to {post.assignSelect}
                                            <br />                                      
                                            </Typography>

                                            {post.noEnd ? <br /> : <Typography variant="body2"> Deadline: {post.endDate} <br /> </Typography>}
                                            

                                        </CardContent>

                                        <Stack direction="row" spacing={1} >

                                            <CardActions>
                                                <Button size="small" onClick={() => {

                                                    var completedPost = post
                                                    completedPost.completed = false

                                                    return fetch(`http://localhost:8088/posts/${post.id}`, {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type": "application/json"
                                                        },
                                                        body: JSON.stringify(completedPost)
                                                    })
                                                    .then(response => response.json())
                                                    .then(() => {
                                                        setPosts([
                                                            ...posts.slice(0, post.id - 1),
                                                            ...posts.slice(post.id, posts.length)
                                                        ]) 
                                                    })

                                                }}>Un-Complete</Button>
                                            </CardActions>                 
                                        </Stack>
                                    </Card>
                                )
                            }
                        }
                    )
                }          
            </Stack> 
        </Box> 
        </>
    )
}