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
          <div>
              <div style={phantom} />
              <div >
								<P5Wrapper sketch={sketch}  style={p5style} />
								  </div>
              </div>


              <a id="recBtn" className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">mic</i></a>

              <Row>
                <Col
                  s={12}
                  l={13}>
              <Button id="micInitBtn" >save</Button>
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
