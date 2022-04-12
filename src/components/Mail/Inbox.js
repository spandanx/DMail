import React, { Component } from 'react';
import MailList from '../ViewMail/MailList';

class InboxComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    console.log("InboxComponent componentDidMount()");
    sessionStorage.setItem("activeTab", 1);
  }
  componentDidUpdate() {
    console.log("InboxComponent componentDidUpdate()");
    sessionStorage.setItem("activeTab", 1);
  }

  render() {
    return (
        <MailList mailType={"Inbox"}/>
    );
  }
}

export default InboxComponent;
