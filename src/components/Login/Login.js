import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const Login = () => {

  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <h1>Please Log In</h1>
      <form>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
          <button onClick={() => loginWithRedirect()}>Log In</button>
        </div>
      </form>
    </>
  )
}

export default Login;