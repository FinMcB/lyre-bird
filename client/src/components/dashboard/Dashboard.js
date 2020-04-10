import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import But from "../button/index.js"
import M from 'materialize-css'
import { Button, Card, Row, Col } from 'react-materialize';
import { AwesomeButton } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";
import mySongLogo from './mySongs.png';
import newSongLogo from './newSong.png';
import tunerLogo from './tuner.png';



class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  myfunction() {
        console.log("CLICKED");
  }

  render() {
    const { user } = this.props.auth;


    return (
      <React.Fragment>
      <div>
      <h2 style={{textAlign:'center'}}>Hello {this.props.user} signed in</h2>
      </div>
       <Row style={{textAlign: "center", marginTop:'10vh'}}>
              {/*//////////////NEW SONG//////////*/}
         <Col
           textAlign= 'center-align'
           s={12}
           l={4}           >
           <Link

             to="/song"
             style={{
               width: "300px",
               height: "300px",
               borderRadius: "30px",
               letterSpacing: "1.5px",
               marginTop: "1rem"

             }}

             className="btn btn-large waves-effect waves-light hoverable blue accent-3"
           >

             New Song
             <img src={newSongLogo}
               style={{
                 position:"absolute",
                 display:"inline-block",
                 maxWidth: "100%",
                 right:"0px",
                 bottom: '0px'
               }}/>
           </Link>
         </Col>

         {/*//////////////TUNER//////////*/}
       <Col
         textAlign= 'center-align'
         s={12}
         l={4}           >
         <Link

           to="/guitarTuner"
           style={{
             width: "300px",

             height: "300px",
             borderRadius: "30px",
             letterSpacing: "1.5px",
             marginTop: "1rem"

           }}

           className="btn btn-large waves-effect waves-light hoverable blue accent-3"
         >

           Tuner
           <img src={tunerLogo}
             style={{
               position:"absolute",
               display:"inline-block",
               maxWidth: "100%",
               right:"0px",
               bottom: '0px'
             }}/>
         </Link>
       </Col>

       {/*//////////////MY SONGS//////////*/}
       <Col
         textAlign= 'center-align'
         s={12}
         l={4}           >
         <Link
           to="/mySongs"
           style={{
             width: "300px",
             height: "300px",
             borderRadius: "30px",
             letterSpacing: "1.5px",
             marginTop: "1rem"

           }}

           className="btn btn-large waves-effect waves-light hoverable blue accent-3"
         >

           My Songs
           <img src={mySongLogo}
             style={{
               position:"absolute",
               display:"inline-block",
               maxWidth: "100%",
               right:"0px",
               bottom: '0px'
             }}/>
         </Link>
       </Col>
     </Row>


     <div className="col s12 center-align" style={{paddingTop: "10vh"}}>
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
         Logout
       </button>
     </div>
      </React.Fragment>
     );
   }

}



Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
