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

function Application() {
  const user = useContext(AuthContext);
  return (
      <Router>
          <Home path = "/" />
          <SignUp path="signUp" />
          <SignIn path="signIn" /> 
            <Slides path="slides"> 
              <Slides path=":questionset" /> 
              </Slides>
            <Slides path="slides/" /> 
          <Myquestions path="myquestions" /> 
          <Createset path="createset" /> 
          <Modifyset path="modifyset/:questionset" /> 
          <PasswordReset path = "passwordReset" />
          <ProfilePage path = "profilePage" />
        </Router>
  );
}
export default Application;
