import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {
  Drawer, List, ListItem, ListItemText,
  Toolbar, AppBar, Typography, IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Weather from './pages/Weather';
import Signup from './pages/Signup';
import Login from './pages/Login';

import { AppProvider, useAuth } from './AppContext'; // Adjust path if needed

const AppLayout = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  const { isLoggedIn, logout } = useAuth();

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleLogout = () => {
    // Clear storage on logout
    localStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('loggedInUser');
    logout();  // update context state
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Weather App 🌦️
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          {isLoggedIn ? (
            <>
              <ListItem button onClick={() => { navigate('/weather'); toggleDrawer(); }}>
                <ListItemText primary="Weather" />
              </ListItem>
              <ListItem button onClick={() => { handleLogout(); toggleDrawer(); }}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button onClick={() => { navigate('/login'); toggleDrawer(); }}>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button onClick={() => { navigate('/signup'); toggleDrawer(); }}>
                <ListItemText primary="Signup" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppLayout />
        <RoutesWrapper />
      </Router>
    </AppProvider>
  );
}

const RoutesWrapper = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isLoggedIn ? '/weather' : '/login'} />} />
      <Route path="/login" element={isLoggedIn ? <Navigate to="/weather" /> : <Login />} />
      <Route path="/signup" element={isLoggedIn ? <Navigate to="/weather" /> : <Signup />} />
      <Route path="/weather" element={isLoggedIn ? <Weather /> : <Navigate to="/login" />} />
    </Routes>
  );
};
