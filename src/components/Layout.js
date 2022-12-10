import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom"
import { styled, useTheme } from '@mui/material/styles';
import {
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Index from "../pages/Index";
import CreatePost from "../pages/CreatePost";
import Login from "../pages/Login";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Layout() {

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [isAuth, setIsAuth] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
            window.location.pathname = "/login";
        })
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="button" noWrap component="div" >
                        Gamer Room
                    </Typography>
                </Toolbar>
            </AppBar>


            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {!isAuth ? (
                    <List>
                        <ListItem key="home" disablePadding>
                            <ListItemButton href="/">
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Home'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key="login" disablePadding>
                            <ListItemButton href="/login">
                                <ListItemIcon>
                                    <LoginIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Login'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                ) : (
                    <List>
                        <ListItem key="userHome" disablePadding>
                            <ListItemButton href="/">
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Home'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key="post" disablePadding>
                            <ListItemButton href="/createpost">
                                <ListItemIcon>
                                    <PostAddIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Create Post'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key="logout" disablePadding>
                            <ListItemButton onClick={signUserOut}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Logout'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                )}
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Router>
                    <Routes>
                        <Route path='/' element={<Index />} />
                        <Route path='/createpost' element={<CreatePost isAuth={isAuth} />} />
                        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
                    </Routes>
                </Router>
            </Main>
        </Box>
    )
}