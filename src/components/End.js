import React from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import Slides from './Slides'
import {
  Link
} from 'react-router-dom'

export default class End extends React.Component {

  wip = () => {
    alert("Work in progress");
  }

  render() {

    const btnStyle = {
      "width": "30vw",
      "color": "#564D65",
      "backgroundColor": "#2CDA9D",
      "border" : "none",
      "padding" : "10px 0px 10px",
      "fontWeight" : "bold"
    };
    
    return (
      <div>
        <div>Thank you <br/> for sharing <br/> who you are </div>
        <br/>
        <Link to='/slides'>
        <button style={btnStyle}>Restart</button>
        </Link>
        <br/>
        <br />
        <button style={btnStyle} onClick={this.wip}>Sign Up</button>
      </div>
    );
  }
}
