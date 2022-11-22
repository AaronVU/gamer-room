import React from "react";
import {
    Button,
    Grid,
    Typography
} from "@mui/material";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login ({ setIsAuth }) {

    let navigate = useNavigate()

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
        });
    };

    return(
        <Grid className="loginPage" container spacing={2}>
            <Grid item>
                <Typography variant="h3">Login</Typography>
                <Typography variant="overline">Sign In With Google to Continue</Typography>
            </Grid>
            <Grid item>
                <Button
                    className="login-with-google-btn" 
                    variant="contained" 
                    onClick={signInWithGoogle}
                >
                    Sign in With Google
                </Button>
            </Grid>
        </Grid>
    )
}