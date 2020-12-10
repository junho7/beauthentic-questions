import React, { useContext }  from "react";
import { getQuestionsetList } from "./Firebase/firebase";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import Slides from './Slides';
import Modifyset from './Modifyset';
import ProfilePage from "./ProfilePage";
import { Link } from "@reach/router";
import { AuthContext } from "./Provider/UserProvider";
import { Form, Col, InputGroup, FormControl, Container, Button, Modal } from 'react-bootstrap';

const Myquestions = () => {
    const user = useContext(AuthContext);

    const [qlist, setQlist] = React.useState(['test', 'test1'])

    
    React.useEffect(() => {
    var qresult = getQuestionsetList().then((res)=>{setQlist(res)});

    },[]);

    const btnStyle = {
      "color": "#564D65",
      "backgroundColor": "#2CDA9D",
      "fontSize":"30px",
      "border" : "none",
      "padding" : "5px 40px",
      "fontWeight" : "bold"
      
    };
    const handleOnClick= (key) => {
    }

    function copyUrl(event) {
      event.preventDefault();
      var copyText = document.getElementById(event.currentTarget.id);
    
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    
      document.execCommand("copy");

      alert("Copied the text: " + copyText.value);
    }

    return (
      <Container className="pt-5">
        <Form>
{
  Object.entries(qlist)
  .map( ([key, value]) => 
  <Form.Row className="align-items-center">
        <InputGroup  className="mb-4">
        <InputGroup.Prepend>
      <Link to={'/slides/'+key}>
      <InputGroup.Text>
{value}
</InputGroup.Text>
</Link>
</InputGroup.Prepend>
<FormControl
   value={"https://beauthentic-questions.firebaseapp.com/slides/"+key}
   onClick={(event)=>copyUrl(event)}
   id={key}
/>
<InputGroup.Append>
  <Link to={`/modifyset/${key}`}>
<Button key={key}>Edit</Button> 
</Link>
</InputGroup.Append>
          
</InputGroup>
</Form.Row>
)
}


      </Form>
      </Container>
    );
}


export default Myquestions;
