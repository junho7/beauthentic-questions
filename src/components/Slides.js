import React, {Component, useRef} from 'react';
import ReactDOM from 'react-dom';
// import queryString from 'query-string';
// import { withRouter} from 'react-router-dom';
import { getQuestionset } from "./Firebase/firebase";
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect
// } from 'react-router-dom'
import { Link } from "@reach/router";
import { readRemoteFile } from 'react-papaparse';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slides.css";
// import "./src/components/Slides.css";
import $ from "jquery";
import Home from './Home';
// import Papa from 'papaparse'
// import logo from './logo.svg';
// import { getByDisplayValue } from '@testing-library/react';
// import './App.css';
import { Form, Col, InputGroup, FormControl, Container, Button, Modal } from 'react-bootstrap';
import Timer from './Timer'

const slidesnum = 44
const autoplayspeed = 120*1000

// function handleClick () {
//   readRemoteFile('../asset/questions.csv', {
//     complete: (results) => {
//       console.log('Results:', results)
//     }
//   });
// }


// function Slides(props) {
const Slides = (props) => {
// export default class Slides extends Component {
    const slider = useRef();
    console.log("this: ", this);
    console.log("slider useRef:", slider);
  // var url = props.url;
  
  console.log("props: ", props)
  const [isEnd, setIsend] = React.useState(false)
  const [rowNum, setRownum] = React.useState(0)
  const [rows, setRows] = React.useState([])
  // const [redirect, setRedirect] = React.useState(false)
  const [now, setNow] = React.useState(new Date())
  const [startTime] = React.useState(new Date().getTime())
  // const startTime = new Date().getTime();
  // var runTimer = setInterval(e => {
  //   setNow((new Date().getTime()))
  // }, 1000)
//   const handleRedirect = React.useCallback(() => {
//     let render = null;
//     if (redirect) {
//       console.log("redirect: ", redirect)
//         render = <Redirect to="/end" push={true} />

//         // in order wait until commiting to the DOM
//         // and get back the button for clicking next time
//         setTimeout(() => setRedirect(false), 0);
//     }
//     return render;
// }, [redirect]);
  // const [minutes, setMinutes] = useState(0)
  // const [seconds, setSeconds] = React.useState(0)
  // const [isActive, setIsActive] = React.useState(true)

  // function toggle() {
  //   setIsActive(!isActive);
  // }

  // function reset() {
  //   // setMinutes(0);
  //   setSeconds(0);
  //   setIsActive(false);
  // }
  function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        // result[n] = arr[x in taken ? taken[x] : x];
        result[n] = [arr[x in taken ? taken[x] : x][0], arr[x in taken ? taken[x] : x][2]];
        taken[x] = --len in taken ? taken[len] : len;
    }
    // console.log(result)


    return result;
}
function publicquestion (){
readRemoteFile('../questions.csv', {
  complete: (results) => {
    console.log('Results:', results.data)
    
    // const rows = getRandom(results.data, slidesnum)
    setRownum(results.data.length)
    const rows = getRandom(results.data, results.data.length)
    // const rows = results.data
    
    setRows(rows)
    return (
      // <div>
      // {results.data.map((value, index) => {
      //   console.log(value[2])
      //   console.log(index)
      //   return (<li> {value[2]} </li>)
      // })}
      // </div>
      1
    );
  }
}      );
}

  React.useEffect(() => {
    // async function getData() {
      // const response = await fetch('./questions.csv')
      // const reader = response.body.getReader()
      // const result = await reader.read() // raw array
      // const decoder = new TextDecoder('utf-8')
      // const csv = decoder.decode(result.value) // the csv text
      // const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
      // const rows = results.data // array of objects
      // setRows(rows)
        // slider.current.slickGoTo(1);
      console.log(props)
      // console.log('*' in props)
      // if (!('questionset' in props) || (props.questionset == 'default') ){
      if (!('*' in props) || (props['*'] == '') ){
        publicquestion()
      } else {
      
      // const questionset = getQuestionset(props.questionset).then((res)=>{console.log(res);
      const questionset = getQuestionset(props['*']).then((res)=>{console.log(res);
      // for index in range(len(res))
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
     
      // const questionset = getQuestionset(props.questionset)
      // questionset.
      // console.log("questionset: "+questionset)
     
    
    // getData()
  }, []) 

  // React.useEffect(() => {
  //   let interval = null;
  //   if (isActive) {
  //     interval = setInterval(() => {                
  //       setSeconds(seconds => seconds + 1);
  //     }, 1000);
  //   } else if (!isActive && seconds !== 0) {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [isActive, seconds]);

  // readRemoteFile('./questions.csv', {
  //   complete: (results) => {
  //     console.log('Results:', results.data)
  //     return (
  //       <div>
  //       {results.data.map((value, index) => {
  //         console.log(value[2])
  //         console.log(index)
  //         return (<li> {value[2]} </li>)
  //       })}
  //       </div>
  //     );
  //   }
  // });

  var settings = {
    // dots: true,
    autoplay: true,
    autoplayspeed: autoplayspeed,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    pauseOnHover: false,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    afterChange: function(index) {

      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
      // const checkend = slidesnum - index - 1
      const checkend = rowNum - index - 1
      console.log("checkend: ", checkend);
      if (checkend === 0) {
        console.log("checkend: "+checkend)

        setTimeout(()=>{console.log("setTimeout");
        // clearInterval(runTimer);
        // props.history.push("/end");
        setIsend(true);
      }, 5000);
      }
    }
  };

  

  // $('.slick-carousel').slick('unslick').slick('reinit').slick()
  // console.log($('.slick-carousel').slick())

//   var $jq = $.noConflict();
// $jq(document).ready(function() { 
//   $jq('.slick-carousel').slick()
// });
// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "green" }}
//       onClick={onClick}
//     />
//   );
// }
// const getDisp = () => {
//   const t = Math.floor((now - startTime)/1000)
//   const ss = t % 60
//   const m = Math.floor(t/60)
//   const mm = m % 60
//   const hh = Math.floor(mm / 60)
//   const z = (num) => {
//     const s = '00' + String(num)
//     return s.substr(s.length - 2, 2)
//   }
//   return <span>{z(mm)}:{z(ss)}</span>
// }
// const t = {Math.floor((now - startTime)/1000)}

  return (
    <div className='vh-100 container d-flex justify-content-center text-center align-items-center'>
      {/* <Table cols={tripColumns} rows={rows} /> */}
      {/* {rows} */}
      {/* <p> {getDisp()} </p> */}
      {/* <p>{url}</p> */}
      <div>
      <p><Timer /></p>
      <Slider ref={slider} {...settings}>
      {/* <Slider  {...settings}> */}
            {rows.map((value, index) => {
              // console.log(value[2])
              // console.log(index)
              return (      
                // <div key={value[0]}>
                <div key={index+1}> 
              {/* <div className="qnumber" > Question #{index+1} </div> */}
              <div className="qnumber" > Question #{Number(value[0])+1} </div>
              <div> {value[1]} </div>
              {/* <div> {value} </div> */}
              </div>        
              )
            })}
            </Slider>
            {/* <div>{Math.floor(seconds/60)} : {Math.floor(seconds%60)}</div> */}
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
