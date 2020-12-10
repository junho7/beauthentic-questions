import React, {useState, useContext } from "react";
import { Link } from "@reach/router";
import { signInWithGoogle } from "../Firebase/firebase";
import { auth } from "../Firebase/firebase";
import { AuthContext } from "../Provider/UserProvider";
import { Button } from 'react-bootstrap';
import { GoogleLoginButton } from "react-social-login-buttons";

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = (event,email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(()=>{loginHandler();}).catch(error => {
        setError("Error signing in with password and email!");
          console.error("Error signing in with password and email", error);
        });
      };
      
      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;
        
          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };
   
      const authContext = useContext(AuthContext);
      const loginHandler = () => {
          authContext.login();
          console.log("authcontext loggedIn")
      };
      const logoutHandler = () => {
          authContext.logout();
      };

      const btnStyle = {
        "color": "#564D65",
        "backgroundColor": "#2CDA9D",
        "fontSize":"30px",
        "border" : "none",
        "padding" : "5px 40px",
        "fontWeight" : "bold"
        
      };

  return (
    <div className="">
      <br />
      <h3>Sign In</h3>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8 d-flex justify-content-center">
        {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
        <form className="d-flex flex-column">
        <div className="form-group social-btn clearfix">

        <GoogleLoginButton className="mt-2" onClick={(event) => {
            signInWithGoogle().then((result)=>{  var token = result.credential.accessToken;
              var user = result.user;
              console.log(token);
              console.log(user); ; loginHandler();});
            loginHandler();
          }}/>
						</div>
        <div className="or-seperator"><b>or</b></div>
        <br />
          <div className = 'form-group'>
          <input
            type="email"
            className="form-control"
            name="userEmail"
            value = {email}
            placeholder="email"
            id="userEmail"
            onChange = {(event) => onChangeHandler(event)}
          /></div>
          <div>
          <input
            type="password"
            className="form-control"
            name="userPassword"
            value = {password}
            placeholder="Password"
            id="userPassword"
            onChange = {(event) => onChangeHandler(event)}
          />
          </div>
          <Button className="mt-2 mb-2" variant="primary" 

          onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
            Sign in
          </Button>
        </form>


      </div>
    </div>
  );
};

export default SignIn;
