import React, {useState} from 'react';
import Home from './Home'
import Slides from './Slides';
import End from './End';
import './App.css';
import "react-bootstrap/dist/react-bootstrap.min.js";
import Application from "./Application";
import { AuthContext } from "./Provider/UserProvider";
import { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const login = () => {
      setLoggedIn(true);
  }
  const logout = () => {
      setLoggedIn(false);
  }

  return (
    <AuthContext.Provider value= {{isLoggedIn: isLoggedIn, login: login, logout: logout}} >
    <Application />
    </AuthContext.Provider>
  );
}

export default App;
