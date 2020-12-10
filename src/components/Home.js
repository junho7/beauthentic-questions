import React, { useContext, useState }  from "react";
import SignUp from './SignUp'
import SignIn from './SignIn'
import ReactDOM from "react-dom";
import Slider from "react-slick";
import Slides from './Slides';
import ProfilePage from "./ProfilePage";
import { Link } from "@reach/router";
import { Button, MenuItem } from 'react-bootstrap';
import { AuthContext } from "./Provider/UserProvider";

const Home = () => {
    const btnStyle = {
      "color": "#564D65",
      "backgroundColor": "#2CDA9D",
      "fontSize":"30px",
      "border" : "none",
      "padding" : "5px 40px",
      "fontWeight" : "bold"
          };

    const authContext = useContext(AuthContext);

    const [signStatus, setsignStatus] = useState(true)

    const signInClick = (event) => {
      event.preventDefault();
      setsignStatus(true);
    }
  
    const signUpClick = (event) => {
      event.preventDefault();
      setsignStatus(false);
    }

    return (
      authContext.isLoggedIn ?
      <div className='vh-100 container d-flex justify-content-center text-center align-items-center'>
        <div>
        <div >
          <p>This is a simple game for your team<br>
          </br>
          members to get to know you better.
          </p>
          <p>You have 2 minutes to answer randomly <br>
          </br>
          generated questions.</p>
          <p>You can choose to skip questions</p>
          <p>Be creative on your answers!</p>
        </div>
        <Link to='/slides/public'>
        <Button style={btnStyle}>Start</Button>
        </Link>
        <br />
        <br />
      <ProfilePage />
      </div>
      </div> 
      :
      <div className='vh-100 container d-flex justify-content-center text-center align-items-center'>
        <div>
        <div>
          <p>This is a simple game for your team<br>
          </br>
          members to get to know you better.
          </p>
          <p>You have 2 minutes to answer randomly 
          generated questions.</p>
          <p>You can choose to skip questions</p>
          <p>Be creative on your answers!</p>
        </div>
        <Link to='/slides/public'>
        <Button variant="flat" style={{"background-color":"#2CDA9D"}}>Start</Button>
        </Link>
       
        { signStatus?
        <div>
         <SignIn />
         <p className="text-center my-3">
           Don't have an account?{" "}
 
             <a href="" onClick={(e)=>signUpClick(e)}>Sign up here</a>
 
           <br />{" "}
           <Link to="passwordReset" className="text-blue-500 hover:text-blue-600">
             Forgot Password?
           </Link>
         </p>
         </div>
        :<div><SignUp />
        <p className="text-center my-3">
        Already have an account?{" "}

          <a href="" onClick={(e)=>signInClick(e)}>Sign In here</a>

        <br />{" "}
        
      </p>
      </div>
}
      </div> 
      </div>
    );
}

export default Home;
