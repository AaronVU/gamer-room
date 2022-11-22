import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { Grid } from "@mui/material";

function App() {

  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    })
  }

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {!isAuth ? (
          <Link to="/login">Login</Link>
          ) : (
            <Grid>
              <Link to="/createpost">New Post</Link>
              <button onClick={signUserOut}>Log Out</button>
            </Grid>
        )}
      </nav>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/createpost' element={<CreatePost isAuth={isAuth}/>} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
