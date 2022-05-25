import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';


const NavBar = ({ user }) => {

  const [profilePicAnchorEl, setProfilePicAnchorEl] = useState(null);
  const { logout } = useAuth0();

  const handleProfilePicClick = (event) => {
    setProfilePicAnchorEl(event.currentTarget);
  };

  const handleProfilePicClose = () => {
    setProfilePicAnchorEl(null);
  };

  const handleLogout = () => logout({ returnTo: window.location.origin })


  return (
    <div className="header">
      <h1 className="page-title" >Phonebook</h1>
      <div>
        <div onClick={handleProfilePicClick}> 
          <img className="profile-pic" src={user.picture} alt={user.nickname} />
        </div>
        <Menu
          id="simple-menu"
          anchorEl={profilePicAnchorEl}
          // keepMounted
          open={Boolean(profilePicAnchorEl)}
          onClose={handleProfilePicClose}
          TransitionComponent={Fade}
        >
        { window.location.pathname === "/" && 
          <MenuItem> <Link to="/profile">Profile</Link> </MenuItem> 
        }
        { window.location.pathname === "/profile" && 
          <MenuItem> <Link to="/">Contacts</Link> </MenuItem> 
        }
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default NavBar;