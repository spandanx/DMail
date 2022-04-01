import React, { Component } from 'react';
import MailList from '../ViewMail/MailList';

class InboxComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    sessionStorage.setItem("activeTab", 1);
    return (
        <MailList mailType={"Inbox"}/>
    );
  }
}

export default InboxComponent;
