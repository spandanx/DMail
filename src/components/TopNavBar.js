import React, { Component } from 'react';

class TopNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Offcanvas navbar</a>
            </div>
        </nav>
    );
  }
}

export default TopNavBar;
