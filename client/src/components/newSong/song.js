import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import But from "../button/index.js"
import M from 'materialize-css'
import { Button, Card, Row, Col } from 'react-materialize';
import LyricEditor from "../lyrics/Editor";
import Tuner from "../tuner/guitarTuner";
import Player from "../audio/player";
import Chord from "../diagram/chord.js"
import Collapsible from 'react-collapsible';
import FooterPlayer from "../footerPlayer/FooterPlayer"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MediaQuery from 'react-responsive'



class Song extends Component {


  render() {


    return (
      ////////////////////LOGOUT BUTTON////////////////////////
      <React.Fragment>
      <div className="landing-copy col s12 center-align">
        <div className="col s12 center-align" style={{padding: "1vh", background :"#c590bb", fontColor: "#FFF8E3"}}>
          <h5>Create a song</h5>
        </div>
      </div>
      <br></br>





        <Row>
        <Col
          style={{color: "white"}}
          s={12}
          l={4}                  >
          <Collapsible trigger="Chords" open="true">
            <LyricEditor />
          </Collapsible>
        </Col>
        <Col
          textAlign= 'center-align'
          s={12}
          l={4}           >
          <Collapsible trigger="Chords" open="true">
            <Chord />
          </Collapsible>
        </Col>
        <Col
          s={12}
          l={4}                  >
          <Collapsible trigger="Chords" open="true">
            <Player />
          </Collapsible>
        </Col>
      </Row>






    <FooterPlayer />











       <div className="col s12 center-align" style={{paddingTop: "5vh"}}>
         <button
           style={{
             width: "150px",
             borderRadius: "3px",
             letterSpacing: "1.5px",
             marginTop: "0rem"
           }}
           className="btn btn-large waves-effect waves-light hoverable blue accent-3"
         >
           save
         </button>
       </div>
      </React.Fragment>
     );
   }

}






export default Song
