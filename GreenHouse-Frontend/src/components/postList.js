import { useState, useEffect } from "react"
import { Card, CardContent, Typography, CardActions, Button, Box } from "@mui/material"
import { TaskForm } from "./taskForm"

export const PostList = () => {



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

    const deletePost = (id) => {
        fetch(`http://localhost:8088/posts/${id}`, {
            method: "DELETE"
        })

        
        setPosts([
            ...posts.slice(0, id - 1),
            ...posts.slice(id, posts.length)
        ]) 
        console.log(posts)
    }
    



    return (
        <>

            {       
                posts.map(
                    (post) => {
                      
                        return (
                        
                            <Box sx={{ maxWidth: 275 }}>
                                <Card variant="outlined" sx={{ maxWidth: 275 }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {post.title}
                                        </Typography>

                                        <Typography variant="h5" component="div">
                                        {post.desc}
                                        <br />
                                        </Typography>

                                        <Typography variant="body2">
                                        Assigned to {post.assignSelect}
                                        <br />                                      
                                        </Typography>

                                    </CardContent>

                                    <CardActions>
                                        <Button size="small">Complete</Button>
                                    </CardActions>

                                    <CardActions>
                                        <Button size="small">Edit</Button>
                                    </CardActions>

                                    <CardActions>
                                        <Button size="small"
                                        onClick={() => {
                                            deletePost(post.id)
                                        }}
                                        >
                                        Delete</Button>
                                    </CardActions>
                                </Card>
                            </Box>
                        )
                    }
                )
            }       
        </>
    )
}