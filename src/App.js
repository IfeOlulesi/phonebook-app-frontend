import React, { useState } from "react";
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


import Contacts from "./components/Contacts/Contacts";
import Banking from "./components/Banking/Banking";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";

const App = () => {
  const { isAuthenticated, user } = useAuth0();

  if (!isAuthenticated) {
    return <Login />
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
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


