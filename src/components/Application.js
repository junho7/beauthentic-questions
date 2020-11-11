import React, { useContext } from "react";
import { Router, Redirect } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import PasswordReset from "./PasswordReset";
import UserProvider from "./Provider/UserProvider";
import { AuthContext } from "./Provider/UserProvider";
import Home from './Home'
import Myquestions from './Myquestions'
import Createset from './Createset'
import Modifyset from './Modifyset'
import Slides from './Slides';
// import { Redirect } from "react-router-dom";

function Application() {
  const user = useContext(AuthContext);
  return (
      //   user ?
      //   <div>
      //   <Home />
      //   <ProfilePage />
      //   </div>
      // :
      <Router>
          <Home path = "/" />
          <SignUp path="signUp" />
          <SignIn path="signIn" /> 
          {/* <Slides path="slides/:url" />  */}
          {/* <Slides path="slides" />  */}
          
          {/* <Redirect from="slides/" to="slides/:questionset" /> 
          <Redirect from="slides" to="slides/:questionset" />  */}
          {/* <Slides path = "slides"> */}
            <Slides path="slides"> 
              <Slides path=":questionset" /> 
              </Slides>
            <Slides path="slides/" /> 
          {/* </Slides> */}
          <Myquestions path="myquestions" /> 
          <Createset path="createset" /> 
          <Modifyset path="modifyset/:questionset" /> 
          <PasswordReset path = "passwordReset" />
          <ProfilePage path = "profilePage" />
        </Router>
  );
}
export default Application;