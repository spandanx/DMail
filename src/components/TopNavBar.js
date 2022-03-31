import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";

class TopNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Link to="/" className="text-decoration-none">
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">DMail</a>
            </div>
        </nav>
      </Link>
    );
  }
}

export default TopNavBar;
