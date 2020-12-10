import React, { useContext, useState, Fragment }  from "react";
import { createSet } from "./Firebase/firebase";
import { AuthContext } from "./Provider/UserProvider";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import Slides from './Slides';
import ProfilePage from "./ProfilePage";
import { Link } from "@reach/router";
import { Form, Col, InputGroup, FormControl, Container, Button, Modal } from 'react-bootstrap';

const Createset = () => {
  
  const [isSaved, setIsSaved] = useState(false)
  const [url, setUrl] = useState([''])
  const [name, setName] = useState([''])
  const [desc, setDesc] = useState([''])
  const [inputFields, setInputFields] = useState([
    ''
  ]);


    const btnStyle = {
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
    }

    const handleInputChange = (index, event) => {
      const values = [...inputFields];
        values[index] = event.target.value;
      setInputFields(values);
    };

    const handleAddFields = () => {
      const values = [...inputFields];
      values.push('');
      setInputFields(values);
    };
  
    const handleRemoveFields = index => {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    };
  
    function copyUrl() {
      var copyText = document.getElementById("urlString");
    
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    
      document.execCommand("copy");
    
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
    placeholder="start typing..."
    id="setname"  
    onChange = { (event)=>{
    setName(event.target.value);
    }          
    }
  />
  
  </InputGroup>
          </Form.Row>
          <Form.Row>
            <InputGroup className="mb-4">
          <InputGroup.Prepend>
      <InputGroup.Text>Describe your question set</InputGroup.Text>
    </InputGroup.Prepend>

          <FormControl
            name="desc"
            placeholder="start typing..."
            id="desc"    
            onChange = { (event)=>{
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
          <div>
          {inputFields.map((inputField, index) => (
            <Fragment>

<InputGroup className="mb-4">
          <InputGroup.Prepend>
      <InputGroup.Text>{index+1}</InputGroup.Text>
    </InputGroup.Prepend>

          <FormControl
            name="desc"
            placeholder="start typing..."
            id="desc"    
            value={inputField}
            onChange={event => handleInputChange(index, event)}
          />
                         <InputGroup.Append>
                         <Button onClick={() => handleRemoveFields(index)}>-</Button>
                       
                  </InputGroup.Append>
          </InputGroup>

            </Fragment>
          ))}
        </div>
        </Form.Group>
        <Button
                   className="mr-2"
                  onClick={() => handleAddFields()}
                >
                  +
                </Button>
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
}

export default Createset;
