
import React, { useContext } from "react";
// import { UserContext } from "../Provider/UserProvider";
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
      // color: "blue"
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
          {/* <div
            style={{
              background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
              backgroundSize: "cover",
              height: "200px",
              width: "200px"
            }}
            className="border border-blue-300"
          ></div> */}
          <div className = "md:pl-4">
          {/* <h2 className = "text-2xl font-semibold">Hi, {displayName}</h2> */}
          {/* <h3 className = "italic">Hi, {email}</h3> */}
          </div>
          <div className = "md:pl-4">
          {/* <h2 className = "text-2xl font-semibold">My Questions</h2> */}
          <Link to='/myquestions'>
        <button style={btnStyle}>My Questions</button>
        </Link>
        <br />
        <br />
          <Link to='/createset'>
        <button style={btnStyle}>Create a set</button>
        </Link>
          {/* <h3 className = "italic">Create a Set</h3> */}
          </div>
        </div>
        <Button className="mt-2" onClick = {() => {auth.signOut();user.logout();}}>Sign out</Button>
      </div>
    ) 
  };
  
  export default ProfilePage;