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
import Chord from "../diagram/chord.js"

class MySongs extends Component {


  render() {


    return (
      ////////////////////LOGOUT BUTTON////////////////////////
      <React.Fragment>
      <div className="landing-copy col s12 center-align">
        <div className="col s12 center-align" style={{padding: "1vh", background :"#c590bb", fontColor: "#FFF8E3"}}>
          <h3>My Songs</h3>
        </div>
      </div>
      <br></br>

      <Collapsible trigger="Song 1" open="true">
      </Collapsible>

      <Collapsible  transitionTime="400" trigger="Song 2" >
          <p>Lyrics</p>
          <LyricEditor />
          <hr></hr>
          <p>Recordings</p>
          <Player />
          <hr></hr>

          <p>Chords</p>
          <Chord />


      </Collapsible>







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






export default MySongs;
