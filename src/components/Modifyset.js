import React, { useContext, useState, Fragment }  from "react";
import { getQuestionsetForModify, updateSet } from "./Firebase/firebase";
import { AuthContext } from "./Provider/UserProvider";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import Slides from './Slides';
import ProfilePage from "./ProfilePage";
import { Form, Col, InputGroup, FormControl, Container, Button, Modal } from 'react-bootstrap';
import { Link } from "@reach/router";

const Modifyset = (props) => {
  const [isSaved, setIsSaved] = useState(false)
  const [row, setRows] = useState([''])
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [inputFields, setInputFields] = useState([
    ''
  ]);

  React.useEffect(() => {
      const questionset = getQuestionsetForModify(props.questionset).then((res)=>{
        setName(res.questionsetname);
        setDesc(res.desc);
        setInputFields(res.questionset)})
  }, []) 
    
  const handleSubmit = (e) =>{
    e.preventDefault();
    updateSet(props.questionset, name, desc, inputFields).then((res)=>{setIsSaved(true);copyUrl();})
  }

  function copyUrl() {
    var copyText = document.getElementById("urlString");

    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    document.execCommand("copy");
  
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
            
                  setDesc(event.target.value);
                  }          
                  }        
          />
</InputGroup>
          </Form.Row>
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
                  type="text"
                  value={inputField}
                  onChange={event => handleInputChange(index, event)}
                />
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
  
     
<textarea readOnly id='urlString' style={{display:"none"}} onClick={(event)=>copyUrl(event)} value={"https://beauthentic-questions.firebaseapp.com/slides/"+props.questionset}> https://beauthentic-questions.firebaseapp.com/slides/{props.questionset} Click to copy</textarea>

        </Container>
    

    )
}

export default Modifyset;
