import React from "react";
import ReactDOM from 'react-dom';
import Delta from 'quill-delta';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import { Button, Card, Row, Col } from 'react-materialize';
import play from './play.png'

// import Chord;


let contents;

class Records extends React.Component {


  render() {


    return (
      ////////////////////LOGOUT BUTTON////////////////////////
      <React.Fragment>
      <div>
        <div style={{paddingLeft: '1rem', padding: 'none'}}>
          <h5 style={{padding: '1rem', borderRadius:'5px 0 0 5px', background: '#02C39A', flexGrow: 1, justifyContent:'center', alignItems: 'center'}}>
            Guitar Line

            <Button style={{ float: 'right', marginTop:'0', background: '#E0FBFC', left:'70%', marginTop:'-7px'}}>

              <img src={play}
                style={{
                  float:"right",
                  maxWidth: "100%",
                  left: '50%',
                  color: '#363636'
                }}/>
            </Button>
          </h5>



        </div>
        <div style={{paddingLeft: '1rem', padding: 'none'}}>
          <h5 style={{padding: '1rem', borderRadius:'5px 0 0 5px', background: '#02C39A'}}>Vocal Line</h5>
        </div>
      </div>










      </React.Fragment>
     );
   }

}






export default Records;
