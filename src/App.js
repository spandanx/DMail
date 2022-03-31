import logo from './logo.svg';
import './App.css';
import React, {useEffect, useCallback, useState} from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom";
// import DMail from './DMail';
// import MailAccount from './MailAccount';
import AccountManager from './AccountManager';
import web3 from './web3';
// import MailList from './components/ViewMail/MailList';
// import LeftNavBar from './components/LeftNavBar';
import TopNavBar from './components/TopNavBar';
import ComposeMail from './components/Mail/ComposeMail';
// import ViewMail from './components/ViewMail/ViewMail';
import InboxComponent from './components/Mail/Inbox';
import SentComponent from './components/Mail/Sent';
import DraftsComponent from './components/Mail/Drafts';
import OutboxComponent from './components/Mail/Outbox';
// import HomeComponent from './components/Home';
import NavigateButtonComponent from './components/NavigateButtonComponent';
// import { useState } from "react";

import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import ViewMail from './components/ViewMail/ViewMail';

function App() {

  // const navigate = useNavigate();

  const tabs = [0,1,2,3,4];
  const paths = ["/compose","/inbox","/sent","/drafts","/outbox"];
  const texts = ["Compose","Inbox","Sent","Drafts","Outbox"];

//   constructor(props) {
//     super(props);
//     this.state = {
//       sentMails:[],
//       recievedMails:[],
//       sentMailLength:0,
//       recievedMailLength:0,
//       activeTab: (this.check)? window.sessionStorage.getItem("activeTab"): 1,
//       tabs:[<ComposeMail/>, <InboxComponent/>, <SentComponent/>, <DraftsComponent/>, <OutboxComponent/>]
//     };
//  }
 
//  getAccount = async() => {
//   let accounts = await web3.eth.getAccounts();
//   return accounts[0];
//  }

  // async componentDidMount() {
  //   let accounts = await web3.eth.getAccounts();
  // }

  // signUp = async() => {
  //   console.log("Calling signup");
  //   let accounts = await web3.eth.getAccounts();
  //   await AccountManager.methods.accountSignUp().send({
  //     from: accounts[0]
  //   });
  //   console.log("signup complete");
  // }

  // fetchAccounts = async() => {
  //   console.log("Calling fetchAccounts");
  //   let accounts = await AccountManager.methods.getAllAccounts().call();
  //   console.log(accounts);
  // }

  // handleOnClick = useCallback(() => this.state.history.push('/sample'), [history]);

  // handleOnClick = useCallback(() => this.state.navigate('/inbox', {replace: true}), [this.state.navigate]);

  // const getActiveTab = () => {
  //   return sessionStorage.getItem("activeTab");
  // }

  const check = () => {
    if (sessionStorage.getItem("activeTab")){
      let val = sessionStorage.getItem("a");
      if (sessionStorage.getItem("activeTab")===null)
        return false;
      return true;
    }
    else{
      return false;
    }
  }

  // render(){
    return (
      <>
      <Router>
      <TopNavBar/>
      <div class="d-flex align-items-start mt-2">
        <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            {tabs.map((index)=>(
              <NavigateButtonComponent index={index} path={paths[index]} text={texts[index]}></NavigateButtonComponent>
            ))}
              {/* <NavigateButtonComponent path={"/compose"} text={"Compose"}></NavigateButtonComponent>
              <NavigateButtonComponent path={"/inbox"} text={"Inbox"}></NavigateButtonComponent>
              <button class={"nav-link " + (activeTab==2 ? 'active' : '')} id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Sent</button>
              <button class={"nav-link " + (activeTab==3 ? 'active' : '')} id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Drafts</button>
              <button class={"nav-link " + (activeTab==4 ? 'active' : '')} id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Outbox</button> */}
        </div>
      <div class="tab-content w-auto" id="v-pills-tabContent">
        {/* <div class={"tab-pane fade " + (this.state.activeTab==0 ? '' : '')} id="v-pills-compose" role="tabpanel" aria-labelledby="v-pills-compose-tab">
          <ComposeMail></ComposeMail>
        </div>
        <div class={"tab-pane fade " + (this.state.activeTab==1 ? '' : '')} id="v-pills-Inbox" role="tabpanel" aria-labelledby="v-pills-Inbox-tab">
        <InboxComponent />
        </div>
        <div class={"tab-pane fade " + (this.state.activeTab==2 ? '' : '')} id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
        <SentComponent/>
        </div>
        <div class={"tab-pane fade " + (this.state.activeTab==3 ? '' : '')} id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
          <DraftsComponent/>
        </div>
        <div class={"tab-pane fade " + (this.state.activeTab==4 ? '' : '')} id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
          <OutboxComponent/>
        </div> */}
      </div>
      <Routes>
          {/* <Route path="/" element={<HomeComponent />}/> */}
          <Route path="/compose" element={<ComposeMail />}/>
          <Route path="/inbox" element={<InboxComponent />}/>
          <Route path="/sent" element={<SentComponent />}/>
          <Route path="/drafts" element={<DraftsComponent />}/>
          <Route path="/outbox" element={<OutboxComponent />}/>
          <Route path="/view-mail" element={<ViewMail/>} />
          {/* <Route path="/">
            <Users />
          </Route> */}
        </Routes>
    </div>
    </Router>
    </>
    );
  // }
  // render(){
  //   return (
  //     <>
      
  //     </>
  //   );
  // }
}

export default App;
