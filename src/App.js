import logo from './logo.svg';
import './App.css';
import React, {useEffect} from 'react';
// import DMail from './DMail';
// import MailAccount from './MailAccount';
import AccountManager from './AccountManager';
import web3 from './web3';
import MailList from './components/ViewMail/MailList';
// import LeftNavBar from './components/LeftNavBar';
import TopNavBar from './components/TopNavBar';
import ComposeMail from './components/ComposeMail';
// import ViewMail from './components/ViewMail/ViewMail';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sentMails:[],
      recievedMails:[],
      sentMailLength:0,
      recievedMailLength:0,
      activeTab: (this.check)? window.sessionStorage.getItem("activeTab"): 1
    };
 }

//  async useEffect() {
//     if(window.ethereum) {
//       window.ethereum.on('chainChanged', () => {
//         // window.location.reload();
//         console.log("chainChanged");
//       })
      // window.ethereum.on('accountsChanged', () => {
      //   // window.location.reload();
      //   console.log("accountsChanged");
      // })
//     }
//  }
// useEffect(() => {
//   if(window.ethereum) {
//     window.ethereum.on('chainChanged', () => {
//       window.location.reload();
//     })
//     window.ethereum.on('accountsChanged', () => {
//       window.location.reload();
//     })
// }
// }
 
 getAccount = async() => {
  let accounts = await web3.eth.getAccounts();
  return accounts[0];
 }

  async componentDidMount() {
    let accounts = await web3.eth.getAccounts();
    // console.log("Provider accounts");
    // console.log(accounts[0]);
    // this.fetchSentMail();
    // this.fetchRecievedMail();
    // this.getSentMailLength();
    // this.getRecievedMailLength();
    // console.log("check: "+this.check());
    
    // await DMail.methods.sendMail("0xB23fa874366edaf7F42Da98b42b5CC7D80648179", "Anything").call();
  }

  // fetchMail = async() => {
  //   // let mails = await DMail.methods.getSentMails().call();
  //   console.log("Mails");
  //   const mails = await web3.eth.getAccounts();
  //   // console.log(mails);
  //   // this.setState({mails});
  // };
  // getSentMailLength = async() => {
  //   let accounts = await web3.eth.getAccounts();
  //   let len = await AccountManager.methods.getSentMailLength().call({
  //     from : accounts[0]
  //   });
  //   this.setState({sentMailLength: len});
  //   console.log("sentMail length: "+len);
  // }

  // getRecievedMailLength = async() => {
  //   let accounts = await web3.eth.getAccounts();
  //   let len = await AccountManager.methods.getRecievedMailLength().call({
  //     from : accounts[0]
  //   });
  //   this.setState({recievedMailLength: len});
  //   console.log("recievedMail length: "+len);
  // }

  // fetchSentMail = async() => {
  //   // console.log("SentMails");
  //   let accounts = await web3.eth.getAccounts();
  //   let mails = await AccountManager.methods.getSentMailBasic(10,0).call({
  //     from : accounts[0]
  //   });
  //   this.setState({sentMails: mails});
  //   // console.log(mails);
  // }
  // fetchRecievedMail = async() => {
  //   // console.log("RecievedMails");
  //   let accounts = await web3.eth.getAccounts();
  //   let mails = await AccountManager.methods.getRecievedMailBasic(10,0).call({
  //     from : accounts[0]
  //   });
  //   this.setState({recievedMails: mails});
  //   // console.log(mails);
  // }

  signUp = async() => {
    console.log("Calling signup");
    let accounts = await web3.eth.getAccounts();
    await AccountManager.methods.accountSignUp().send({
      from: accounts[0]
    });
    console.log("signup complete");
  }

  fetchAccounts = async() => {
    console.log("Calling fetchAccounts");
    let accounts = await AccountManager.methods.getAllAccounts().call();
    console.log(accounts);
  }

  selectTab = async(tabIndex) => {
    // this.setState({activeTab:tabIndex});
    window.sessionStorage.setItem("activeTab", tabIndex);
    console.log("Select Tab called()");
    console.log(window.sessionStorage.getItem("activeTab"));
  }

  check(){
    if (window.sessionStorage.getItem("activeTab")){
      if (window.sessionStorage.getItem("activeTab")===null)
        return false;
      return true;
    }
    else{
      return false;
    }
  }

  render(){
    return (
      <>
      <TopNavBar/>
      <div class="d-flex align-items-start mt-2">
        <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              {/* <button class="nav-link active" id="v-pills-Inbox-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Inbox" type="button" role="tab" aria-controls="v-pills-Inbox" aria-selected="true">Inbox</button> */}
              <button onClick={() => this.selectTab(0)} class={"nav-link " + (this.state.activeTab==0 ? 'active' : '')} id="v-pills-compose-tab" data-bs-toggle="pill" data-bs-target="#v-pills-compose" type="button" role="tab" aria-controls="v-pills-compose" aria-selected="false">Compose</button>
              <button onClick={() => this.selectTab(1)} class={"nav-link " + (this.state.activeTab==1 ? 'active' : '')} id="v-pills-Inbox-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Inbox" type="button" role="tab" aria-controls="v-pills-Inbox" aria-selected="true">Inbox</button>
              <button onClick={() => this.selectTab(2)} class={"nav-link " + (this.state.activeTab==2 ? 'active' : '')} id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Sent</button>
              <button onClick={() => this.selectTab(3)} class={"nav-link " + (this.state.activeTab==3 ? 'active' : '')} id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Drafts</button>
              <button onClick={() => this.selectTab(4)} class={"nav-link " + (this.state.activeTab==4 ? 'active' : '')} id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Outbox</button>
        </div>
      <div class="tab-content w-auto" id="v-pills-tabContent">
        <div class={"tab-pane fade " + (this.state.activeTab==0 ? 'show active' : '')} id="v-pills-compose" role="tabpanel" aria-labelledby="v-pills-compose-tab">
          <ComposeMail></ComposeMail>
        </div>
        <div class={"tab-pane fade " + (this.state.activeTab==1 ? 'show active' : '')} id="v-pills-Inbox" role="tabpanel" aria-labelledby="v-pills-Inbox-tab">
          {/* {this.state.recievedMails.map((item)=>(
          <MailList mail={item}></MailList>
        ))} */}
        <MailList mailType={"Inbox"}></MailList></div>
        <div class={"tab-pane fade " + (this.state.activeTab==2 ? 'show active' : '')} id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
        {/* {this.state.sentMails.map((item)=>(
          <MailList mail={item}></MailList>
        ))} */}
        <MailList mailType={"Recieved"}></MailList>
        </div>
        <div class={"tab-pane fade " + (this.state.activeTab==3 ? 'show active' : '')} id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
        </div>
        <div class={"tab-pane fade " + (this.state.activeTab==4 ? 'show active' : '')} id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
        </div>
      </div>
    </div>
    </>
    );
  }
  // render(){
  //   return (
  //     <>
      
  //     </>
  //   );
  // }


  // render(){
  //   return (
  //     <div>
  //       <h2>Lottery Contract</h2>
  //       {/* <p>
  //         This contract is managed by {this.state.manager}. There are currently{" "}
  //         {this.state.players.length} people entered, competing to win{" "}
  //         {web3.utils.fromWei(this.state.balance, "ether")} ether!
  //       </p> */}

  //       <hr />
  //       <form onSubmit={this.sendMail}>
  //         <h4>Send Mail</h4>
  //         <div>
  //           <label>Subject</label>
  //           <hr/>
  //           <input
  //             value={this.state.subject}
  //             onChange={(event) => this.setState({ subject: event.target.value })}
  //             placeholder="Subject"
  //           />
  //           <hr/>
  //           <input
  //             value={this.state.to}
  //             onChange={(event) => this.setState({ to: event.target.value })}
  //             placeholder="To"
  //           />
  //           <hr/>
  //           <input
  //             value={this.state.body}
  //             onChange={(event) => this.setState({ body: event.target.value })}
  //             placeholder="Body"
  //           />
  //         </div>
  //         <hr/>
  //         <button>Send</button>
  //       </form>
  //       <hr />
  //       {<h3>{this.state.message}</h3>}
  //       <hr />
  //       <button onClick={this.signUp}>SignUp</button>

  //       <button onClick={this.fetchAccounts}>FetchAccounts</button>

  //       <button onClick={this.fetchSentMail}>FetchSentMails</button>
  //       <button onClick={this.fetchRecievedMail}>FetchRecievedMails</button>

  //       <hr/>
  //       {/* {<h3>Mails</h3>}
  //       {this.state.mails.map((mail)=>(
  //         <p>{mail.body}</p>
  //       )
  //       )} */}
  //     </div>

  //   );
  // }


}

export default App;
