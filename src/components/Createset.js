import React, { useContext, useState, Fragment }  from "react";
import { createSet } from "./Firebase/firebase";
import { AuthContext } from "./Provider/UserProvider";
// import SignUp from './SignUp'
// import SignIn from './SignIn'
import ReactDOM from "react-dom";
import Slider from "react-slick";
import Slides from './Slides';
import ProfilePage from "./ProfilePage";
// import { compose } from 'recompose';

// import { withAuthorization, withEmailVerification } from './Session';
// import Messages from './Messages';
// import {
//   Link
// } from 'react-router-dom'
import { Link } from "@reach/router";
// import "./Home.css";
// import { UserContext } from "./Provider/UserProvider";
import { Form, Col, InputGroup, FormControl, Container, Button, Modal } from 'react-bootstrap';



// export class Home extends React.Component {
const Createset = () => {
  
  const [isSaved, setIsSaved] = useState(false)
  const [url, setUrl] = useState([''])
  const [name, setName] = useState([''])
  const [desc, setDesc] = useState([''])
  const [inputFields, setInputFields] = useState([
    // { question: ''}
    ''
  ]);


    const btnStyle = {
      // color: "blue"
      "color": "#564D65",
      "backgroundColor": "#2CDA9D",
      "fontSize":"30px",
      "border" : "none",
      "padding" : "5px 40px",
      "fontWeight" : "bold"
      
    };


    const handleSubmit = (e) =>{
      e.preventDefault();
      console.log("handleSubmit")
      console.log(name)
      console.log(desc)
      console.log(inputFields)
      createSet(name, desc, inputFields).then((res)=>{console.log(res); setUrl(res);setInputFields([]); setIsSaved(true);copyUrl();})
      // var qarray = document.getElementsByClassName('question');
      // console.log(qarray)
      // console.log(qarray[0])

    //   for (var i = 0; i < qarray.length; i++) {
    //     console.log("qarray[i]"+qarray[i])
    //     // var fieldname = kvarray[i].id;
    //     // var fieldvalue = kvarray[i].value;

    // }
      // console.log("submitset")
    }

    const handleInputChange = (index, event) => {
      const values = [...inputFields];
        // values[index].question = event.target.value;
        values[index] = event.target.value;
        // console.log("values: "+JSON.stringify(values))
      setInputFields(values);
    };

    const handleAddFields = () => {
      const values = [...inputFields];
      values.push('');
      // values.push({ question: ''});
      setInputFields(values);
    };
  
    const handleRemoveFields = index => {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    };

    // function uuid() {
    //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    //     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    //     return v.toString(16);
    //   });
    // }
    // var setname, desc, question;
    // const user = useContext(UserContext);

    // function copyUrl(event) {
    function copyUrl() {
      // event.preventDefault();
      /* Get the text field */
      var copyText = document.getElementById("urlString");
    
      /* Select the text field */
      // console.log("copyText:", copyText);
      // console.log("copyText:", copyText);
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    
      /* Copy the text inside the text field */
      document.execCommand("copy");
    
      /* Alert the copied text */
      // alert("Copied the text: " + copyText.value);
    }

    return (
      <Container className="pt-5">
      <Form>
        <Form.Row className="align-items-center">
        <InputGroup  className="mb-4">
    <InputGroup.Prepend>
      <InputGroup.Text>Name your question set</InputGroup.Text>
    </InputGroup.Prepend>
  <FormControl
    name="setname"
    // value = {setname}
    placeholder="start typing..."
    id="setname"  
    onChange = { (event)=>{
    
// console.log("values: "+JSON.stringify(values))
    setName(event.target.value);
    }          
    }
  />
  
  </InputGroup>
          {/* <Form.Label  column sm={4} className="text-center">
            Name your question set:
          </Form.Label> */}
          </Form.Row>
          <Form.Row>
            <InputGroup className="mb-4">
          <InputGroup.Prepend>
      <InputGroup.Text>Describe your question set</InputGroup.Text>
    </InputGroup.Prepend>

          <FormControl
            name="desc"
            // value = {desc}
            placeholder="start typing..."
            id="desc"    
            onChange = { (event)=>{
            
              // console.log("values: "+JSON.stringify(values))
                  setDesc(event.target.value);
                  }          
                  }        
          />
          </InputGroup>
          </Form.Row>
          <Form.Group>
            
          <label>
            Add your questions
          </label>
          {/* <input
            name="question"
            className="question"
            value = {question}
            placeholder="start typing..."
            id="question"            
          /> */}
          <div>
          {inputFields.map((inputField, index) => (
            // <Fragment key={`${inputField}~${index}`}>
            <Fragment>
              {/* <div>
                <label>{index+1}</label>
                <input
                  type="text"
                  // id={index}
                  // id={uuid()}
                  value={inputField}
                  onChange={event => handleInputChange(index, event)}
                />
              </div>
              
              <div className="form-group col-sm-2">
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </button>

              </div> */}

<InputGroup className="mb-4">
          <InputGroup.Prepend>
      <InputGroup.Text>{index+1}</InputGroup.Text>
    </InputGroup.Prepend>

          <FormControl
            name="desc"
            // value = {desc}
            placeholder="start typing..."
            id="desc"    
            value={inputField}
            onChange={event => handleInputChange(index, event)}
          />
                         <InputGroup.Append>
                         <Button onClick={() => handleRemoveFields(index)}>-</Button>
                         {/* <button
          
            
                  
                  >
                
                
                  -
                  </button> */}
                  </InputGroup.Append>
          </InputGroup>

            </Fragment>
          ))}
        </div>
        </Form.Group>
        <Button
                   className="mr-2"
                  // type="button"
                  onClick={() => handleAddFields()}
                >
                  +
                </Button>

          {/* <button onClick = {() => {createSet(setname, desc, questionset)}}>Create</button> */}
          <Button className="mr-2"
            onClick={isSaved ? null : (event)=>handleSubmit(event)}> {isSaved? "Saved": "Save"} </Button>
          {url != '' &&
          <textarea readOnly id='urlString' style={{display:"none"}} onClick={(event)=>copyUrl(event)} value={"https://beauthentic-questions.firebaseapp.com/slides/"+url}> https://beauthentic-questions.firebaseapp.com/slides/{url} Click to copy</textarea>
          }
{isSaved ?
  <Modal
        show={isSaved}
        
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Your question set is saved successfully. And URL is copied in your clipboard.
        </Modal.Body>
        <Modal.Footer>
          <Link to={`/slides/${url}`}>
          <Button variant="secondary">
            Go to Questions
          </Button>
          </Link>
          <Link to='/profilePage'>
          <Button variant="secondary">
            Go Back
          </Button>
          </Link>
        </Modal.Footer>
      </Modal>
: null
}
<Link to='/profilePage'>
  {isSaved? null :<Button>Cancel</Button>}
  </Link>
        </Form>
        </Container>
    );
  // }
}

// const condition = authUser => !!authUser;
export default Createset;
// ReactDOM.render(<Slide />, document.getElementById("container"));
// export default compose(
//   withEmailVerification,
//   withAuthorization(condition),
// )(Home);