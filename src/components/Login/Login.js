import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./index.css";

const Login = () => {

  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-container">
      <h1>Welcome to the Phonebook App</h1>
      
      <div>
        <button onClick={() => loginWithRedirect()}>Log In</button>
      </div>
    </div>
  )
}

export default Login;