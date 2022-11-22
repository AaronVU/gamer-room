import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Typography,
} from "@mui/material"
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";

export default function Index() {

    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef)
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getPosts();
    })

    return(
        <Grid className="homePage">
            <Typography variant="h3">Index</Typography>
            {postLists.map((post) => {
                return <Box className="post">{post.title}</Box>
            })}
        </Grid>
    )
}