import React, {useState} from 'react';
import Home from './Home'
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom'
// import * as ROUTES from '../constants/routes';
// import logo from './logo.svg';
import Slides from './Slides';
import End from './End';
import './App.css';
import "react-bootstrap/dist/react-bootstrap.min.js";
import Application from "./Application";
// import UserProvider from "./Provider/UserProvider";
// import { UserContext } from "./Provider/UserProvider";
import { AuthContext } from "./Provider/UserProvider";
import { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";

// const App = () => (
//   <Router>
//            <Route exact path = '/' component={Home} />      
//            <Route path = '/slides' component={Slides} />
//            <Route path = '/end' component={End} />
//   </Router>
// );

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
    {/* <div className="App">
      <header className="App-header">
        <Router>
          <div className='appcenter'>
          <Route exact path = '/' component={Home} />      
          <Route path = '/slides' component={Slides} />
          <Route path = '/end' component={End} />
          </div>
        </Router> */}
        {/*
          <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      {/* </header>
    </div> */}
    <Application />
    </AuthContext.Provider>
  );
}



export default App;
