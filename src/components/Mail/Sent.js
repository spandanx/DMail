import React, { Component } from 'react';
import MailList from '../ViewMail/MailList';

class SentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <MailList mailType={"Sent"}/>
    );
  }
}

export default SentComponent;
