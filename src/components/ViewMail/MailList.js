import React, { Component } from 'react';
import ViewMail from './ViewMail';
import AccountManager from '../../AccountManager';
import web3 from '../../web3';

class MailList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        openedMail:'',
        mailList:[],
        advancedDetails:'',
        months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        mailType:"",
        mailLength:0,
        pageSize:2,
        currentPage:0
    };
  }

  async componentDidMount() {
        console.log("ComponentMounted MailList.js");
        console.log("props: ");
        console.log(this.props.mailType);
        console.log(this.props.mail);
        this.setState({opacity: ""});
        console.log(this.state.openedMail);
  }

  getSentMailLength = async() => {
    let accounts = await web3.eth.getAccounts();
    let len = await AccountManager.methods.getSentMailLength().call({
      from : accounts[0]
    });
    this.setState({mailLength: len});
    console.log("sentMail length: "+len);
  }

  getRecievedMailLength = async() => {
    let accounts = await web3.eth.getAccounts();
    let len = await AccountManager.methods.getRecievedMailLength().call({
      from : accounts[0]
    });
    this.setState({mailLength: len});
    console.log("recievedMail length: "+len);
  }

  fetchSentMail = async() => {
    // console.log("SentMails");
    let accounts = await web3.eth.getAccounts();
    let mails = await AccountManager.methods.getSentMailBasic(this.state.pageSize,this.state.currentPage).call({
      from : accounts[0]
    });
    this.setState({mailList: mails});
    // console.log(mails);
  }
  fetchRecievedMail = async() => {
    // console.log("RecievedMails");
    let accounts = await web3.eth.getAccounts();
    let mails = await AccountManager.methods.getRecievedMailBasic(this.state.pageSize,this.state.currentPage).call({
      from : accounts[0]
    });
    this.setState({mailList: mails});
    // console.log(mails);
  }

  fetchAdvancedDetails = async(mailAddress) => {
    console.log("fetchAdvancedDetails: "+mailAddress);
    let accounts = await web3.eth.getAccounts();
    let advancedDetails = await AccountManager.methods.getMailAdvancedByAddress(mailAddress).call();
    this.setState({advancedDetails:advancedDetails});
    console.log(advancedDetails);
  }

  viewMail = async(event) => {
    this.fetchAdvancedDetails(event.mailAddress);
    this.setState({openedMail:event});
    console.log("calling viewMail()");
    console.log(event);
  }

  resetMail = async() => {
      this.state.openedMail = "";
  }

  getTime = (timestamp) => {
    let now = new Date();
    console.log("Now: "+now.getTime());
    let d = new Date(parseInt(timestamp));
    console.log("Date: "+timestamp);
    console.log(d);
    // var d = new Date();
    let datestring = "";
    
    if (d.getDate()===now.getDate() && d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear()){
        datestring = d.getHours() + ":" + d.getMinutes();
    }
    else if(d.getDate()<now.getDate() && d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear()){
        console.log(this.state.months);
        datestring = this.state.months[d.getMonth()] +" "+ d.getDate();
    }
    // else if(d.getFullYear()!=now.getFullYear()){
    //     datestring = 
    // }
    else{
        datestring = (d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear().toString().substring(2);
        // d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
        // d.getHours() + ":" + d.getMinutes();
    }
    //.toString().substring(2)
    // 16-5-2015 9:50
    return datestring;
  }

  pages() {
    const pageNumbers = [];
    pageNumbers.push(
      <li onClick={() => this.goToPreviousPage()} class={"page-item " + (this.state.currentPage===0 ? 'disabled' : '')}>
        <a class="page-link" href="#">Previous</a>
      </li>
    );
    for (let i = 0; i<Math.ceil(this.state.mailLength/this.state.pageSize); i++){
      pageNumbers.push(
        <li onClick={() => this.goToPage(i)} class={"page-item " + (this.state.currentPage===i ? 'active' : '')} aria-current="page">
          <a class="page-link" href="#">{i+1}</a>
        </li>
      );
    }

    pageNumbers.push(
      <li onClick={() => this.goToNextPage()} class={"page-item " + (this.state.currentPage===Math.ceil(this.state.mailLength/this.state.pageSize)-1 ? 'disabled' : '')}>
        <a class="page-link" href="#">Next</a>
      </li>
    );

    return pageNumbers;
  }

  goToNextPage(){
    // this.setState({currentPage: this.state.currentPage+1});
    if (this.state.currentPage<Math.ceil(this.state.mailLength/this.state.pageSize)-1){
      this.goToPage(this.state.currentPage+1);
    }
  }

  goToPreviousPage(){
    // this.setState({currentPage: this.state.currentPage-1});
    if (this.state.currentPage>0){
      this.goToPage(this.state.currentPage-1);
    }
  }

  goToPage = async(pageNumber) => {
    this.setState({currentPage: pageNumber});
    if (this.state.mailType==="Inbox"){
      this.getRecievedMailLength();
      this.fetchRecievedMail();
    }
    else{
      this.getSentMailLength();
      this.fetchSentMail();
    }
  }

  render() {
    if (this.state.openedMail===""){
      if (this.props.mailType!=this.state.mailType){
        console.log("MailList render()");
        this.state.mailType = this.props.mailType;
        if (this.state.mailType==="Inbox"){
          this.getRecievedMailLength();
          this.fetchRecievedMail();
        }
        else{
          this.getSentMailLength();
          this.fetchSentMail();
        }
      }
    return (
        <div>
          {this.state.mailLength!=0 && 
            <ul class="pagination">
              {this.pages()}
            </ul>
          }
          <table class="table table-inbox table-hover">
          <tbody>
              {this.state.mailList.map((item)=>(
                  <tr class="unread" onClick={() => this.viewMail(item)}>
                  <td class="inbox-small-cells">
                      <input type="checkbox" class="mail-checkbox"/>
                  </td>
                  <td class="inbox-small-cells"><i class="fa fa-star"></i></td>
                  <td class="view-message  dont-show fw-bold">{item.subject}</td>
                  <td class="view-message ">{item.body}</td>
                  {/* <td class="view-message  inbox-small-cells"><i class="fa fa-paperclip"></i></td> */}
                  <td class="view-message  text-right">{this.getTime(item.timestamp)}</td>
              </tr>
              ))}
          </tbody>
          </table>
          {this.state.mailLength!=0 && 
            <ul class="pagination">
              {this.pages()}
            </ul>
          }
        </div>
        );
        }
        else{
          return (
            <ViewMail mailBasic={this.state.openedMail} mailAdvanced={this.state.advancedDetails}></ViewMail>
          );
      }
  }

// render() {
//     return (
//         <tr class="row pt-2 shadow-sm m-2 bg-white rounded">
//             <td class="fw-bold col-sm-3 col-xs-3 text-truncate">
//                 {this.props.mail.subject}
//             </td>
//             <td class="col-sm-9 col-xs-9">
//                 {this.props.mail.body}
//             </td>
//         </tr>
//     );
//   }


}

export default MailList;
