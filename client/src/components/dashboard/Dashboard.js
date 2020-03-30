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
      ////////////////////LOGOUT BUTTON////////////////////////
      <React.Fragment>
      <div>
      <h1 style={{textAlign:'center'}}>Hello {this.props.user} signed in</h1>
      </div>
       <Row style={{textAlign: "center", marginTop:'10vh'}}>
       <Col
         style={{color: "white"}}
         s={12}
         l={4}                  >
         <AwesomeButton type="primary" style={{width: "300px" ,height:"300px",    borderRadius: "3px",
            padding: 'none',
            letterSpacing: "1.5px",
            marginTop: "1rem"}}>
                My Songs
            <img  src="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"
            alt="my image"
            style={{ maxWidth:'100%', maxHeight:'100%', zIndex:'+100'}}
        />

        <Link

          to="/mySongs"></Link>
        </AwesomeButton>

       </Col>
       <Col
         textAlign= 'center-align'
         s={12}
         l={4}           >
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
       </Col>
       <Col
         s={12}
         l={4}                  >
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

       </Col>
     </Row>

     <Button></Button>


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
