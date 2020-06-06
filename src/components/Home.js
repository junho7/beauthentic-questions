import React from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import Slides from './Slides';
import {
  Link
} from 'react-router-dom'
import "./Home.css";

export default class Home extends React.Component {
  render() {
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
      <div className='homecenter'>
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
        <Link to='/slides'>
        <button style={btnStyle}>Start</button>
        </Link>
      </div>
    );
  }
}

// export default Home;
// ReactDOM.render(<Slide />, document.getElementById("container"));
