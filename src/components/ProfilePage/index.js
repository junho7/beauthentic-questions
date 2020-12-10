
import React, { useContext } from "react";
import { AuthContext } from "../Provider/UserProvider";
import { navigate } from "@reach/router";
import {auth} from "../Firebase/firebase";
import { Link } from "@reach/router";
import { Button } from 'react-bootstrap';

const ProfilePage = () => {
    const user = useContext(AuthContext);
    const {photoURL, displayName, email} = user;
    console.log(user);
    const btnStyle = {
      "color": "#564D65",
      "backgroundColor": "#2CDA9D",
      "fontSize":"30px",
      "border" : "none",
      "padding" : "5px 40px",
      "fontWeight" : "bold"
      
    };  
  
    return (
      <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
        <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
          <div className = "md:pl-4">
          </div>
          <div className = "md:pl-4">
          <Link to='/myquestions'>
        <button style={btnStyle}>My Questions</button>
        </Link>
        <br />
        <br />
          <Link to='/createset'>
        <button style={btnStyle}>Create a set</button>
        </Link>
          </div>
        </div>
        <Button className="mt-2" onClick = {() => {auth.signOut();user.logout();}}>Sign out</Button>
      </div>
    ) 
  };
  
  export default ProfilePage;
