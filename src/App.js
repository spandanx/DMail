import logo from './logo.svg';
import './App.css';
import React from 'react';
// import DMail from './DMail';
// import MailAccount from './MailAccount';
import AccountManager from './AccountManager';
import web3 from './web3';
import MailList from './components/MailList';
import LeftNavBar from './components/LeftNavBar';
import TopNavBar from './components/TopNavBar';
import ComposeMail from './components/ComposeMail';
import ViewMail from './components/ViewMail';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sentMails:[],
      recievedMails:[]
    };
 }
 
 getAccount = async() => {
  let accounts = await web3.eth.getAccounts();
  return accounts[0];
 }
  async componentDidMount() {
    let accounts = await web3.eth.getAccounts();
    console.log("Provider accounts");
    console.log(accounts[0]);
    this.fetchSentMail();
    this.fetchRecievedMail();
    // await DMail.methods.sendMail("0xB23fa874366edaf7F42Da98b42b5CC7D80648179", "Anything").call();
  }

  // fetchMail = async() => {
  //   // let mails = await DMail.methods.getSentMails().call();
  //   console.log("Mails");
  //   const mails = await web3.eth.getAccounts();
  //   // console.log(mails);
  //   // this.setState({mails});
  // };
  fetchSentMail = async() => {
    console.log("SentMails");
    let accounts = await web3.eth.getAccounts();
    let mails = await AccountManager.methods.getSentMail().call({
      from : accounts[0]
    });
    this.setState({sentMails: mails});
    console.log(mails);
  }
  fetchRecievedMail = async() => {
    console.log("RecievedMails");
    let accounts = await web3.eth.getAccounts();
    let mails = await AccountManager.methods.getRecievedMail().call({
      from : accounts[0]
    });
    this.setState({recievedMails: mails});
    console.log(mails);
  }

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

  render(){
    return (
      <>
      <TopNavBar/>
      <div class="d-flex align-items-start mt-2">
        <LeftNavBar/>
      <div class="tab-content w-auto" id="v-pills-tabContent">
        <div class="tab-pane fade w-100" id="v-pills-compose" role="tabpanel" aria-labelledby="v-pills-compose-tab">
          <ComposeMail></ComposeMail>
        </div>
        <div class="tab-pane fade show active" id="v-pills-Inbox" role="tabpanel" aria-labelledby="v-pills-Inbox-tab">{this.state.recievedMails.map((item)=>(
          <MailList mail={item}></MailList>
        ))}</div>
        <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
        {/* {this.state.sentMails.map((item)=>(
          <MailList mail={item}></MailList>
        ))} */}
        <MailList mail={this.state.sentMails}></MailList>
        </div>
        <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
        </div>
        <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
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
