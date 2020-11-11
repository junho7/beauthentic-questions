import React, { useContext }  from "react";
// import SignUp from './SignUp'
// import SignIn from './SignIn'
import { getQuestionsetList } from "./Firebase/firebase";
import ReactDOM from "react-dom";
// import { Redirect } from 'react-router';
import Slider from "react-slick";
import Slides from './Slides';
import Modifyset from './Modifyset';
import ProfilePage from "./ProfilePage";
// import { compose } from 'recompose';

// import { withAuthorization, withEmailVerification } from './Session';
// import Messages from './Messages';
// import {
//   Link
// } from 'react-router-dom'
import { Link } from "@reach/router";
// import "./Home.css";
import { AuthContext } from "./Provider/UserProvider";
import { Form, Col, InputGroup, FormControl, Container, Button, Modal } from 'react-bootstrap';



// export class Home extends React.Component {
const Myquestions = () => {
  // render() {
    const user = useContext(AuthContext);

    const [qlist, setQlist] = React.useState(['test', 'test1'])

    
    React.useEffect(() => {
      console.log("qlist: ", qlist)
    var qresult = getQuestionsetList().then((res)=>{console.log(res); setQlist(res)});

    },[]);

    const btnStyle = {
      // color: "blue"
      "color": "#564D65",
      "backgroundColor": "#2CDA9D",
      "fontSize":"30px",
      "border" : "none",
      "padding" : "5px 40px",
      "fontWeight" : "bold"
      
    };
    // const history = useHistory();
    // const handleOnClick = (key) => history.push('modifyset'+key);
    const handleOnClick= (key) => {
    // this.setState({redirect: true});
    // this.props.history.push(`modifyset/${key}`)
    // const user = useContext(UserContext);
    }

    function copyUrl(event) {
      event.preventDefault();
      /* Get the text field */
      // var copyText = document.getElementById("urlString");
      var copyText = document.getElementById(event.currentTarget.id);
    
      /* Select the text field */
      // console.log("copyText:", copyText);
      console.log("copyText:", copyText);
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    
      /* Copy the text inside the text field */
      document.execCommand("copy");
    
      /* Alert the copied text */
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
{/* {value.questionsetname} */}
</InputGroup.Text>
</Link>
</InputGroup.Prepend>
<FormControl
   value={"http://localhost:3000/slides/"+key}
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


      {/* {qlist.map((item, index) => (
        // <Fragment key={`${inputField}~${index}`}>
        // <Fragment>
          <div>
            <label>{index+1}</label>
            <input
              type="text"
              // id={index}
              // id={uuid()}
              value={item}
              // onChange={event => handleInputChange(index+1, event)}
            />
          </div>
        // </Fragment>
      ))} */}
      </Form>
      </Container>
    );
  // }
}

// const condition = authUser => !!authUser;
export default Myquestions;
// ReactDOM.render(<Slide />, document.getElementById("container"));
// export default compose(
//   withEmailVerification,
//   withAuthorization(condition),
// )(Home);