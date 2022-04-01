import React, { Component } from 'react';

class DraftsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    sessionStorage.setItem("activeTab", 3);
    return (
      <h4>Drafts coming soon..</h4>
    );
  }
}

export default DraftsComponent;
