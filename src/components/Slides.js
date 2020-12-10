import React, {Component, useRef} from 'react';
import ReactDOM from 'react-dom';
import { getQuestionset } from "./Firebase/firebase";
import { Link } from "@reach/router";
import { readRemoteFile } from 'react-papaparse';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slides.css";
import $ from "jquery";
import Home from './Home';
import { Form, Col, InputGroup, FormControl, Container, Button, Modal } from 'react-bootstrap';
import Timer from './Timer'

const slidesnum = 44
const autoplayspeed = 120*1000

const Slides = (props) => {
    const slider = useRef();
    console.log("this: ", this);
    console.log("slider useRef:", slider);
  
  console.log("props: ", props)
  const [isEnd, setIsend] = React.useState(false)
  const [rowNum, setRownum] = React.useState(0)
  const [rows, setRows] = React.useState([])
  const [now, setNow] = React.useState(new Date())
  const [startTime] = React.useState(new Date().getTime())

  function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = [arr[x in taken ? taken[x] : x][0], arr[x in taken ? taken[x] : x][2]];
        taken[x] = --len in taken ? taken[len] : len;
    }


    return result;
}
function publicquestion (){
readRemoteFile('../questions.csv', {
  complete: (results) => {


    setRownum(results.data.length)
    const rows = getRandom(results.data, results.data.length)

    
    setRows(rows)
    return (
      1
    );
  }
}      );
}

  React.useEffect(() => {
      console.log(props)
      if (!('*' in props) || (props['*'] == '') ){
        publicquestion()
      } else {
      
      const questionset = getQuestionset(props['*']).then((res)=>{console.log(res);
      if(typeof res !== 'undefined'){
      setRownum(res.length)
      const resrow = []
      for (let i=0;i<res.length;i++){
        resrow[i] = [i, res[i]]
      }
        setRows(resrow); 
        console.log(rows);
      } else {
        publicquestion();
      }
    
    })
    
      }
     
    
  }, []) 

  var settings = {
    autoplay: true,
    autoplayspeed: autoplayspeed,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    pauseOnHover: false,
    afterChange: function(index) {

      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
      const checkend = rowNum - index - 1
      console.log("checkend: ", checkend);
      if (checkend === 0) {
        setTimeout(()=>{console.log("setTimeout");
        setIsend(true);
      }, 5000);
      }
    }
  };


  return (
    <div className='vh-100 container d-flex justify-content-center text-center align-items-center'>
      <div>
      <p><Timer /></p>
      <Slider ref={slider} {...settings}>
            {rows.map((value, index) => {
              return (      
                <div key={index+1}> 
              <div className="qnumber" > Question #{Number(value[0])+1} </div>
              <div> {value[1]} </div>
              </div>        
              )
            })}
            </Slider>
            </div>
            {isEnd ?
  <Modal
        show={isEnd}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Thank you for sharing who you are
        </Modal.Body>
        <Modal.Footer>
          <Link to={'/slides/'+props['*']}>
          <Button variant="secondary"
          onClick={e => {setIsend(false); 
          console.log("slider.current: ",slider.current);
          console.log("slider: ",slider);
            slider.current.slickGoTo(0);slider.current.slickPlay();
            }}
            >
            Restart
          </Button>
          </Link>
          <Link to='/'>
          <Button variant="secondary">
            Home
          </Button>
          </Link>
        </Modal.Footer>
      </Modal>
: null
}
    </div>
  )
          
  
}
export default Slides;
