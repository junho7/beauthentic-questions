import React, { useContext, useState, Fragment }  from "react";
import { getQuestionsetForModify, updateSet } from "./Firebase/firebase";
import { AuthContext } from "./Provider/UserProvider";
// import SignUp from './SignUp'
// import SignIn from './SignIn'
import ReactDOM from "react-dom";
import Slider from "react-slick";
import Slides from './Slides';
import ProfilePage from "./ProfilePage";
import { Form, Col, InputGroup, FormControl, Container, Button, Modal } from 'react-bootstrap';
// import { compose } from 'recompose';

// import { withAuthorization, withEmailVerification } from './Session';
// import Messages from './Messages';
// import {
//   Link
// } from 'react-router-dom'
import { Link } from "@reach/router";
// import "./Home.css";
// import { UserContext } from "./Provider/UserProvider";



// export class Home extends React.Component {
const Modifyset = (props) => {
  const [isSaved, setIsSaved] = useState(false)
  const [row, setRows] = useState([''])
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [inputFields, setInputFields] = useState([
    // { question: ''}
    ''
  ]);

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
      console.log(props)
      // if ('questionset' in props){
      const questionset = getQuestionsetForModify(props.questionset).then((res)=>{console.log(res); 
        console.log("setname: ", res.questionsetname)
        console.log("desc: ", res.desc)
        setName(res.questionsetname);
        setDesc(res.desc);
        setInputFields(res.questionset)})
        // console.log("name", name)
        // console.log(desc)
      // }
      // else {
      // console.log("Question set loading error")
      // }
    // getData()
  }, []) 
    
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log("handleSubmit")
    console.log(name)
    console.log(desc)
    console.log(inputFields)
    updateSet(props.questionset, name, desc, inputFields).then((res)=>{setIsSaved(true);copyUrl();})
  }

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
            value = {name || ''}
            placeholder="start typing..."
            id="setname"  
            onChange = { (event)=>{
            
        // console.log("values: "+JSON.stringify(values))
            setName(event.target.value);
            }          
            }
          />
          </InputGroup>
          </Form.Row>
          <Form.Row  className="align-items-center">
          <InputGroup  className="mb-4">
          <InputGroup.Prepend>
      <InputGroup.Text>
            Describe your question set
      </InputGroup.Text>
            </InputGroup.Prepend>
          <FormControl
            name="desc"
            value = {desc || ''}
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
              <InputGroup className="mb-4">
          <InputGroup.Prepend>
      <InputGroup.Text>{index+1}</InputGroup.Text>
    </InputGroup.Prepend>
              {/* <div>
                <label>{index+1}</label>
   
              </div> */}
                           <FormControl
                  type="text"
                  // id={index}
                  // id={uuid()}
                  value={inputField}
                  onChange={event => handleInputChange(index, event)}
                />
              {/* <div className="form-group col-sm-2"> */}
              <InputGroup.Append>
                <Button                 
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </Button>
                </InputGroup.Append>
          </InputGroup>
              {/* </div> */}
            </Fragment>
          ))}
        </div>
        <Button
                  className="mr-2"
                  onClick={() => handleAddFields()}
                >
                  +
                </Button>

          {/* <button onClick = {() => {createSet(setname, desc, questionset)}}>Create</button> */}
          <Button className="mr-2"
             onClick={(event)=>handleSubmit(event)}
            >
              Save
            </Button>
            <Link to='/profilePage'>
  <Button>Cancel</Button>
  </Link>
        </Form>
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
            <Link to={`/slides/${props.questionset}`}>
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
  
     
<textarea readOnly id='urlString' style={{display:"none"}} onClick={(event)=>copyUrl(event)} value={"http://localhost:3000/slides/"+props.questionset}> http://localhost:3000/slides/{props.questionset} Click to copy</textarea>

        </Container>
    
  // }
    )
}

// const condition = authUser => !!authUser;
export default Modifyset;
// ReactDOM.render(<Slide />, document.getElementById("container"));
// export default compose(
//   withEmailVerification,
//   withAuthorization(condition),
// )(Home);