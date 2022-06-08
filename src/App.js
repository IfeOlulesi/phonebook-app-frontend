import React, { useState } from "react";
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/styles";

import LoadingOverlay from "./components/LoadingOverlay";

import NavBar from "./components/NavBar/Navbar";
import Contacts from "./components/Contacts/Contacts";
import Banking from "./components/Banking/Banking";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";

const useStyles = makeStyles((theme) => ({
  loaderWrapper: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    flexDirection: "row",
  }
}))

const App = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  
  const classes = useStyles();

  if (isLoading) {
    return <LoadingOverlay />
  }
  
  else if (!isAuthenticated) {
    return <Login />
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <NavBar user={user} />
        <Routes>
          <Route path="/" element={<Contacts user={user} />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Banking" element={<Banking />} />
          <Route path="/Profile" element={<Profile user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;


