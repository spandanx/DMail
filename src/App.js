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
import Login from './components/Login';
import HomeComponent from './components/HomeComponent';
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

  // const tabs = [0,1,2,3,4];
  // const paths = ["/mail/compose","/mail/inbox","/mail/sent","/mail/drafts","/mail/outbox"];
  // const texts = ["Compose","Inbox","Sent","Drafts","Outbox"];

  // const navigate = useNavigate();

  // const [loggedIn, setLoggedIn] = useState(false);

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
  // window.ethereum.on('accountsChanged', function (accounts) {
  //   console.log("Account Changed");
  //   console.log(accounts);
  //   web3.eth.getAccounts(function(err, accounts){
  //     if (err != null){
  //       console.error("An error occurred: "+err);
  //       setLoggedIn(false);
  //     }
  //     else if (accounts.length == 0){
  //       console.log("User is not logged in to MetaMask");
  //       setLoggedIn(false);
  //     }
  //     else{
  //       console.log("User is logged in to MetaMask");
  //       setLoggedIn(true);
  //     }
  //   });
  // });

  // web3.eth.getAccounts(function(err, accounts){
  //   if (err != null){
  //     console.error("An error occurred: "+err);
  //     setLoggedIn(false);
  //   }
  //   else if (accounts.length == 0){
  //     console.log("User is not logged in to MetaMask");
  //     setLoggedIn(false);
  //   }
  //   else{
  //     console.log("User is logged in to MetaMask");
  //     setLoggedIn(true);
  //   }
  // });

  // const HomeComp = () => {
  //   return (
  //     <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
  //           {tabs.map((index)=>(
  //             <NavigateButtonComponent index={index} path={paths[index]} text={texts[index]}></NavigateButtonComponent>
  //           ))}
  //       </div>
  //   );
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

      <Routes>
          <Route exact path="/login" element={<Login />}/>
        </Routes>

      <div class="d-flex align-items-start mt-2">
        {/* <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            {tabs.map((index)=>(
              <NavigateButtonComponent index={index} path={paths[index]} text={texts[index]}></NavigateButtonComponent>
            ))}
        </div> */}
        {/* {!loggedIn && 
          <div>
            <div class = "p-12 d-flex justify-content-center mx-5 my-5">
              <span class="py-1 px-1"><h4>You are not logged in!</h4></span>
              <span class="py-1 px-1"><h4>Please connect a wallet to login.</h4></span>
            </div>
          </div>
        } */}
      {/* <div class="tab-content w-auto" id="v-pills-tabContent"> */}
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
      {/* </div> */}
      <Routes>
          <Route path="/" element={<Login/>}/>
          {/* <Route path="/login" element={<Login />}/> */}
          {/* <Route path="/mail/*" element={HomeComp()} /> */}
          <Route path="/mail/compose" element={<><HomeComponent /><ComposeMail/></>}/>
          <Route path="/mail/inbox" element={<><HomeComponent /><InboxComponent /></>}/>
          <Route path="/mail/sent" element={<><HomeComponent /><SentComponent /></>}/>
          <Route path="/mail/drafts" element={<><HomeComponent /><DraftsComponent /></>}/>
          <Route path="/mail/outbox" element={<><HomeComponent /><OutboxComponent /></>}/>
          <Route path="/mail/view-mail" element={<><HomeComponent /><ViewMail/></>} />
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
