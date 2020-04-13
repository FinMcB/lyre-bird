import React, { Component } from "react";
import ReactDOM from 'react-dom';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';
import 'p5/lib/addons/p5.sound';
import multer from 'multer'
import one from './sketch.js'
import { Button, Card, Row, Col } from 'react-materialize';


var p5style = {
    textAlign: "center",
    paddingBottom: '100px',
    position: "fixed",
    left: "0",
    bottom: "0",
    zIndex: '+100',
    height: "100%",
    width: "100%",

}

var phantom = {
  display: 'block',
  padding: '0px',
  height: '100%',
  width: '100%',
}



class Player extends Component {


      render(){
        return(
          <React.Fragment>
            <div style={{paddingTop: "0vh", alignContent: 'center', textAlign: 'center', background: '#363636'}}>

								<P5Wrapper sketch={sketch}  style={p5style} />

                </div>


              <Row>
                <Col
                  s={6}
                  l={6}>
              <Button id="micInitBtn" >INITIATE MIC</Button>

                </Col>
                <Col
                  s={6}
                  l={6}
                  >
                <Button style={{background:'#F53C3C'}} id="recBtn" class="material-icons" >mic</Button>


                  </Col>
              </Row>


        </React.Fragment>
      );

}
}

export default Player


//
// ReactDOM.render(<Player />, document.getElementById('root'));
//
// export default Player;
