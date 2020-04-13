import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import M from 'materialize-css'
import { Button, Card, Row, Col } from 'react-materialize';
import FooterPlayer from "../footerPlayer/FooterPlayer"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './playBtn.png'
import song from './song.wav'
let playlist = [
  { src: "/song.wav",
    title: "Vocals 1",
    artist: "0" }
];

var style = {
    backgroundColor: "#383838",
    textAlign: "center",
    padding: "15px",
    paddingBottom: '15px',
    position: "fixed",
    left: "0",
    bottom: "0",
    zIndex: '+100',
    height: "13%",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '0px',
  height: '100%',
  width: '100%',
}




interface CustomIcons {

  trim?: ReactNode
}





function Footer({ children }) {
    return (
          <React.Fragment>
        <div>
            <div style={phantom} />
            <div >
                { children }
                <AudioPlayer
                  style={style}

                  src={song}
                  customControlSection
                  onPlay={e => console.log("onPlay")}
                  // other props here
                />


            </div>

        </div>


        </React.Fragment>
    )
}

export default Footer
