import React, { useContext, useState } from "react";
import { Link } from "@reach/router";
import { auth, signInWithGoogle, generateUserDocument } from "../Firebase/firebase";
import { AuthContext } from "../Provider/UserProvider";
import { Button } from 'react-bootstrap';
import {GoogleLoginButton} from "react-social-login-buttons";

const SignUp = () => {
  const authContext = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      console.log(user)
      // generateUserDocument(user, {displayName});
      generateUserDocument({user: user, displayName: {displayName}});
    }
    catch(error){
      setError('Error Signing up with email and password');
    }
      
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const loginHandler = () => {
    authContext.login();
    console.log("authcontext loggedIn")
    // signInWithGoogle();
};

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <div className="">
      <br />
      <h3>Sign Up</h3>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8 d-flex justify-content-center">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <form className="d-flex flex-column">
        <GoogleLoginButton
          onClick={() => {
            try {
              signInWithGoogle().then((result)=>{  var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                console.log(token);
                console.log(user); ; loginHandler();});
              loginHandler();
            
            
            } catch (error) {
              console.error("Error signing in with Google", error);
            }
          }}
          className="bg-red-500 hover:bg-red-600 w-full py-2 text-white"
        >
          Sign Up with Google
        </GoogleLoginButton>
          <div className="or-seperator"><b>or</b></div>
        <div className="form-group social-btn clearfix">
          {/* <label htmlFor="displayName" className="block">
            Display Name:
          </label> */}
          <input
            type="text"
            className="form-control mt-2"
            name="displayName"
            value={displayName}
            placeholder="Display name"
            id="displayName"
            onChange={event => onChangeHandler(event)}
          />
          {/* <label htmlFor="userEmail" className="block">
            Email:
          </label> */}
          </div>
          <div className="form-group">
          <input
            type="email"
            className="form-control"
            name="userEmail"
            value={email}
            placeholder="Email"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          {/* <label htmlFor="userPassword" className="block">
            Password:
          </label> */}
          </div>
          <div>
          <input
            type="password"
            className="form-control"
            name="userPassword"
            value={password}
            placeholder="Password"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <Button
            className="mt-2 mb-2" variant="primary" 
            onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </Button>
          </div>
        </form>
        
        </div>
    </div>
  );
};

export default SignUp;