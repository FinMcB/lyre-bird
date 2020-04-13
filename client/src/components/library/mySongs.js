import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import But from "../button/index.js"
import M from 'materialize-css'
import { Button, Card, Row, Col } from 'react-materialize';
import Collapsible from 'react-collapsible';
import LyricEditor from "../lyrics/Editor";
import Tuner from "../tuner/guitarTuner";
import Player from "../audio/player";
import Chord from "../diagram/chord.js";
import Records from "../recordings/Records.js";
import FooterPlayer from "../footerPlayer/FooterPlayer";
import chordPic from "./chord.png"

let pullLyrics = "This is where lyrics would be pulled from mongoDB as delta";

class MySongs extends Component {



  render() {

    console.log(LyricEditor);

    return (

      ////////////////////LOGOUT BUTTON////////////////////////
      <React.Fragment>
      <div className="landing-copy col s12 center-align">
        <div className="col s12 center-align" style={{padding: "1vh", fontColor: "#FFF8E3", background: 'none'}}>
          <h3>My Songs</h3>
        </div>
      </div>
      <br></br>

      <Row style={{width: '90%'}}>
      <Collapsible open={true} transitionTime={400} trigger="Song 1" style={{}} >
        <Row>
        <Col
          style={{color: "white"}}
          s={12}
          l={8}                  >
          <LyricEditor placeholder='shiite' />

        </Col>
        <Col>
          <img src={chordPic} style={{maxWidth: '20vw'}} />

        </Col>
        <Col
          style={{color: "white"}}
          s={12}
          l={4}                  >
            <Records />
        </Col>

        </Row>
        </Collapsible>
       </Row>

       <Row style={{width: '90%'}}>
       <Collapsible open={true} transitionTime={400} trigger="Song 2" style={{}} >
         <Row>
         <Col
           style={{color: "white"}}
           s={12}
           l={8}                  >
             <LyricEditor/>
         </Col>
         <Col
           style={{color: "white"}}
           s={12}
           l={4}                  >
             <Records />
         </Col>
         </Row>
         </Collapsible>
        </Row>

        <FooterPlayer />


        <p style={{paddingBottom:'2000px'}}></p>





      </React.Fragment>
     );
   }

}






export default MySongs;
