import React from "react";
import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
} from "@mui/material"
import { addDoc, collection } from "firebase/firestore"
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

export default function CreatePost ({ isAuth }) {

    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");

    const postsCollectionRef = collection(db, "posts");
    let navigate = useNavigate();

    const createPost = async () => {
        await addDoc(postsCollectionRef, {
            title, 
            postText, 
            author:{
                name: auth.currentUser.displayName, 
                id: auth.currentUser.uid
            }},
        );
        navigate("/");
    };

    useEffect(() =>{
        if (!isAuth){
            navigate("/login");
        }
    }, []);

    return(
        <Grid className="createPostPage">
            <Grid className="cpContainer">
                <Typography variant="h3">Create Post</Typography>
                <Box className="inputGp">
                    <TextField 
                        label="Post Title:" 
                        placeholder="Title..." 
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }} 
                    />
                </Box>
                <Box className="inputGp">
                    <TextField 
                        label="Body Post:"
                        placeholder="Post..."
                        multiline
                        onChange={(e) =>{
                            setPostText(e.target.value)
                        }}
                    />
                </Box>
                <Button variant="contained" onClick={createPost}>Submit</Button>
            </Grid>
        </Grid>
    )
}