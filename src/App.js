import logo from './logo.svg';
import './App.css';
import React from 'react';
// import web3 from 'web3';
// import DMail from './DMail';
// import MailAccount from './MailAccount';
import AccountManager from './AccountManager';
import web3 from './web3';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sentMails:[],
      recievedMails:[],
      subject:"",
      to:[],
      body:""
      // message:"Type your mail"
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

  sendMail = async(event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    console.log("calling sendmail");
    // const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    // console.log("message : "+this.state.tobeSent);
    // await DMail.methods.sendMail(this.state.tobeSent).send({
    //   from: accounts[0],
    // });
    let toAddresses = this.state.to.split(";");
    console.log("Subject: "+this.state.subject);
    console.log("Body: "+this.state.body);
    console.log("To: "+toAddresses);
    await AccountManager.methods.sendMail(toAddresses, this.state.subject, this.state.body).send({
      from: accounts[0]
    });
    console.log("mail sent");
    // await lottery.methods.pickWinner().send({
    //   from: accounts[0],
    // });

    // this.setState({message: "mail sent"});
  };

  render(){
    return (
      <>
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
        <a class="navbar-brand" href="#">Offcanvas navbar</a>
      </div>
    </nav>
    <div class="d-flex align-items-start mt-2">
    <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button class="nav-link active" id="v-pills-Inbox-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Inbox" type="button" role="tab" aria-controls="v-pills-Inbox" aria-selected="true">Inbox</button>
      <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Sent</button>
      <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Drafts</button>
      <button class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Outbox</button>
    </div>
    <div class="tab-content w-auto" id="v-pills-tabContent">
      <div class="tab-pane fade show active" id="v-pills-Inbox" role="tabpanel" aria-labelledby="v-pills-Inbox-tab">{this.state.recievedMails.map((item)=>(
        
        <ul class="list-group">
          <li class="list-group-item d-flex flex-row justify-content-start align-items-center mw-100">
            <div class="w-25">
              <div class="fw-bold text-truncate">{item.subject}</div>
            </div>
            <div class="w-70">
              <div>{item.body}</div>
            </div>
            <div class="w-5">

            </div>
          </li>
        </ul>
      ))}</div>
      <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">{this.state.sentMails.map((item)=>(
        
        <ul class="list-group">
          <li class="list-group-item d-flex flex-row justify-content-start align-items-center mw-100">
            <div class="w-25">
              <div class="fw-bold text-truncate">{item.subject}</div>
            </div>
            <div class="w-70">
              <div>{item.body}</div>
            </div>
            <div class="w-5">

            </div>
          </li>
        </ul>
      ))}</div>
      <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
      <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
    </div>
  </div>
  </>
    );
  }

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
