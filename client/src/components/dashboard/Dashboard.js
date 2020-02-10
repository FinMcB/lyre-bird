import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";


class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text white-text ">
                Hello You are logged into song-note app
              </p>
            </h4>
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
            <div className="row">
              <div className="col s6 center-align">
                <button
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.3px",
                    marginTop: "1rem"
                  }}
                  onClick={this.onLogoutClick}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                <i class="material-icons right"style={{ }}>audiotrack</i>
                Songs
                </button>
              </div>
              <div className="col s6 center-align">
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
            </div>
            <div className="row">
              <div className="col s6 center-align">
                <Link
                  to="/lyrics"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"

                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                <i class="material-icons right">notes</i>

                  Lyrics
                </Link>
              </div>

              <div className="col s6 center-align">
                <Link
                  to="/player"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"

                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                <i class="material-icons right">add</i>

                  New Song
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
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
