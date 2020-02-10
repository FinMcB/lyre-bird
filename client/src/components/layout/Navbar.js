import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/dashboard"
              style={{
                fontFamily: "Quicksand"
              }}
              className="col s5 brand-logo center blue-text"
            >
              <i className="material-icons">mic_none</i>
              <b>song-note</b>
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
