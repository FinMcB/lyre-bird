import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
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
import Records from "../recordings/Records.js"
import FileUploader from 'react-firebase-file-uploader'
import * as firebase from 'firebase';
import config from '../firebaseConfig'
import chordPic from "./chord.png"

firebase.initializeApp(config)





class Song extends Component {
  state = {
     audio: '',
     audioURL: '',
     progress: 0,
   }

   handleUploadStart = () => {
     this.setState({
       progress:0
     })
   }

   handleUploadSuccess = filename => {
     this.setState({
       audio: filename,
       progress: 100
     })


     firebase.storage().ref('audio').child(filename).getDownloadURL().then(url => this.setState({
       audioURL: url
     }))
   }


  render() {

    console.log(this.state);

    return (
      ////////////////////LOGOUT BUTTON////////////////////////
      <React.Fragment>

      <div className="landing-copy col s12 center-align">
        <div className="col s12 center-align" style={{padding: "1vh"}}>
          <h3>Create </h3>
            <h5>a song package</h5>
        </div>
      </div>
      <br></br>

        <Row>
        <Col
          style={{color: "white"}}
          s={11}
          l={4}                  >
          <Collapsible trigger="Lyrics" open={true}>
            <LyricEditor />
          </Collapsible>
        </Col>
        <Col
          s={11}
          l={4}           >
          <Collapsible trigger="Chords" open={true}>
            <img src={chordPic} style={{maxWidth: '10vw', padding:'10px'}}/>
              <img src={chordPic} style={{maxWidth: '10vw', padding:'10px'}}/>
                <img src={chordPic} style={{maxWidth: '10vw', padding:'10px'}}/>



          </Collapsible>
        </Col>
        <Col
          s={11}
          l={4}                  >
          <Collapsible trigger="Recordings" open={true}>
            <Records />
              <FileUploader
                        accept="audio/*"
                        name='recording'
                        storageRef={firebase.storage().ref('audio')}
                        onUploadStart={this.handleUploadStart}
                        onUploadSuccess={this.handleUploadSuccess}
                         />
          </Collapsible>
        </Col>
      </Row>


        <Player style={{display:'block', textAlign:'center', alignContent:'center' }} />

    <FooterPlayer />









    <div className="col s12 center-align" style={{paddingTop: "5vh"}}>
      <button
        style={{
          width: "150px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          marginTop: "1rem"
        }}
        onClick={this.onLogoutClick}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
      >
        SAVE
      </button>
    </div>



    <p style={{paddingBottom:'800px'}}></p>

      </React.Fragment>
     );
   }

}






export default Song
