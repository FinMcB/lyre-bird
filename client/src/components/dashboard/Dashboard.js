import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import But from "../button/index.js"
import M from 'materialize-css'
import { Button, Card, Row, Col } from 'react-materialize';



class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;


    return (
      ////////////////////LOGOUT BUTTON////////////////////////
      <React.Fragment>

      <div style={{ paddingTop: "10vh" }} className="container valign-wrapper">
         <div className="row">
           <div className="landing-copy col s12 center-align">
             <h4>
               <b>Welcome,</b> {user.name.split(" ")[0]}
               <p className="flow-text white-text ">
                 Hello you are logged into song-note app
               </p>
             </h4>
           </div>
         </div>
       </div>
       <div className="container">
         <div className="row">
           <div class="col s4">
             <Link
               to="/song"
               style={{
                 width: "150px",
                 height: "150px",
                 borderRadius: "3px",
                 letterSpacing: "1.5px",
                 marginTop: "1rem"

               }}
               className="btn btn-large waves-effect waves-light hoverable blue accent-3"
             >
             <i class="material-icons right">mic</i>

               New Song
             </Link>
           </div>
           <div class="col s4">
             <Link
               to="/guitarTuner"
               style={{
                 width: "150px",
                 height: "150px",
                 borderRadius: "3px",
                 letterSpacing: "1.5px",
                 marginTop: "1rem"

               }}
               className="btn btn-large waves-effect waves-light hoverable blue accent-3"
             >
             <i class="material-icons right">build</i>

              Tuner
             </Link>
           </div>
           <div class="col s4">
             <Link
               to="/mySongs"
               style={{
                 width: "150px",
                 height: "150px",
                 borderRadius: "3px",
                 letterSpacing: "1.5px",
                 marginTop: "1rem"

               }}
               className="btn btn-large waves-effect waves-light hoverable blue accent-3"
             >
             <i class="material-icons right">list</i>

               My Songs
             </Link>
           </div>
         </div>
       </div>
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
