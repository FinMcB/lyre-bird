import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import But from "../button/index.js"
import M from 'materialize-css'
import { Button, Card, Row, Col } from 'react-materialize';
import AudioPlayer from 'react-modular-audio-player';
import FooterPlayer from "../footerPlayer/FooterPlayer"
import './playBtn.png'
let playlist = [
  { src: "/song.mp3",
    title: "Vocals 1",
    artist: "0" }
];

var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}

let rearrangedPlayer = [
  {
    className: "tier-top",
    style: {margin: "0.3rem"},
    innerComponents: [
      {
        type: "play",
        style: {width: "fit-content"}
      },
      {
        type: "rewind",
        style: {width: "fit-content"}
      },
      {
        type: "forward",
        style: {width: "fit-content"}
      },
      {
        type: "volume"
      }
    ]
  },
  {
    className: "tier-bottom",
    style: {margin: "0rem 0.3rem 0.3rem 0.3rem"},
    innerComponents: [
      {
        type: "time",
        style: {width: "fit-content"}
      },
      {
        type: "seek"
      }
    ]
  }
]



function Footer({ children }) {
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                { children }
                <AudioPlayer
                // rearrange={rearrangedPlayer}

                  audioFiles={playlist}
                  playIcon="/playBtn.png"
                  playerWidth="100%"
                  fontSize="1rem"
                  iconSize="1.5rem"
              />
            </div>

        </div>
    )
}

export default Footer
