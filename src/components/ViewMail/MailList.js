import React, { Component, useState, useEffect } from 'react';
import ViewMail from './ViewMail';
import AccountManager from '../../AccountManager';
import web3 from '../../web3';
import { useNavigate } from 'react-router-dom';

const MailList = (props) => {
// class MailList extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //       openedMail:'',
  //       mailList:[],
  //       advancedDetails:'',
  //       months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  //       mailType:"",
  //       mailLength:0,
  //       pageSize:2,
  //       currentPage:0
  //   };
  // }
  const navigate = useNavigate();

  const [openedMail, setOpenedMail] = useState('');
  const [mailList, setmailList] = useState('');
  const [advancedDetails, setadvancedDetails] = useState('');
  const [mailType, setmailType] = useState('');
  const [mailLength, setmailLength] = useState(0);
  const [currentPage, setcurrentPage] = useState(0);

  const pageSize = 2;
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  // async componentDidMount() {
  //       console.log("ComponentMounted MailList.js");
  //       console.log("props: ");
  //       console.log(this.props.mailType);
  //       console.log(this.props.mail);
  //       this.setState({opacity: ""});
  //       console.log(this.state.openedMail);
  // }

  useEffect(() => {
      console.log("useEffect() props.mailType called");
      setmailType(props.mailType);
      if (props.mailType==="Inbox"){
        console.log("Displaying recieved Mails or Inbox, useEffect() props.mailType");
        getRecievedMailLength();
        fetchRecievedMail();
      }
      else{
        console.log("Displaying sent Mails, useEffect() props.mailType");
        getSentMailLength();
        fetchSentMail();
      }
  }, [props.mailType]);

  useEffect(()=>{
    console.log("useEffect() currentPage called");
    if (props.mailType==="Inbox"){
      console.log("Displaying recieved Mails or Inbox, useEffect() currentPage");
      getRecievedMailLength();
      fetchRecievedMail();
    }
    else{
      console.log("Displaying sent Mails, useEffect() currentPage");
      getSentMailLength();
      fetchSentMail();
    }
  }, [currentPage]);

  const getSentMailLength = async() => {
    let accounts = await web3.eth.getAccounts();
    let len = await AccountManager.methods.getSentMailLength().call({
      from : accounts[0]
    });
    setmailLength(len);
    // this.setState({mailLength: len});
    console.log("sentMail length: "+len);
  }

  const getRecievedMailLength = async() => {
    let accounts = await web3.eth.getAccounts();
    let len = await AccountManager.methods.getRecievedMailLength().call({
      from : accounts[0]
    });
    setmailLength(len);
    // this.setState({mailLength: len});
    console.log("recievedMail length: "+len);
  }

  const fetchSentMail = async() => {
    console.log("getSentMailBasic arguments:");
    console.log("pageSize: "+pageSize);
    console.log("currentPage: "+currentPage);
    let accounts = await web3.eth.getAccounts();
    let mails = await AccountManager.methods.getSentMailBasic(pageSize, currentPage).call({
      from : accounts[0]
    });
    setmailList(mails);
    // this.setState({mailList: mails});
    console.log("fetched fetchSentMail");
    console.log(mails);
  }
  const fetchRecievedMail = async() => {
    console.log("getRecievedMailBasic arguments:");
    console.log("pageSize: "+pageSize);
    console.log("currentPage: "+currentPage);
    let accounts = await web3.eth.getAccounts();
    let mails = await AccountManager.methods.getRecievedMailBasic(pageSize, currentPage).call({
      from : accounts[0]
    });
    setmailList(mails);
    // this.setState({mailList: mails});
    console.log("fetched fetchRecievedMail");
    console.log(mails);
  }

  // fetchAdvancedDetails = async(mailAddress) => {
  //   console.log("fetchAdvancedDetails: "+mailAddress);
  //   let accounts = await web3.eth.getAccounts();
  //   let advancedDetails = await AccountManager.methods.getMailAdvancedByAddress(mailAddress).call();
  //   this.setState({advancedDetails:advancedDetails});
  //   console.log(advancedDetails);
  // }

  const viewMail = async(event) => {
    // this.fetchAdvancedDetails(event.mailAddress);
    // setOpenedMail(event);
    // this.setState({openedMail:event});
    // console.log("calling viewMail()");
    // console.log(event);
    navigate("/view-mail", {state: {mailAddress:event.mailAddress}});
  }

  // const resetMail = async() => {
  //     this.state.openedMail = "";
  // }

  const getTime = (timestamp) => {
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
        console.log(months);
        datestring = months[d.getMonth()] +" "+ d.getDate();
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

  const pages = () =>  {
    const pageNumbers = [];
    pageNumbers.push(
      <li key={"page-previous"} onClick={() => goToPreviousPage()} class={"page-item " + (currentPage===0 ? 'disabled' : '')}>
        <a class="page-link" href="#">Previous</a>
      </li>
    );
    for (let i = 0; i<Math.ceil(mailLength/pageSize); i++){
      pageNumbers.push(
        <li key={"page-"+i} onClick={() => goToPage(i)} class={"page-item " + (currentPage===i ? 'active' : '')} aria-current="page">
          <a class="page-link" href="#">{i+1}</a>
        </li>
      );
    }

    pageNumbers.push(
      <li key={"page-next"} onClick={() => goToNextPage()} class={"page-item " + (currentPage===Math.ceil(mailLength/pageSize)-1 ? 'disabled' : '')}>
        <a class="page-link" href="#">Next</a>
      </li>
    );

    return pageNumbers;
  }

  const goToNextPage = () => {
    // this.setState({currentPage: this.state.currentPage+1});
    if (currentPage<Math.ceil(mailLength/pageSize)-1){
      goToPage(currentPage+1);
    }
  }

  const goToPreviousPage = () => {
    // this.setState({currentPage: this.state.currentPage-1});
    if (currentPage>0){
      goToPage(currentPage-1);
    }
  }

  const goToPage = async(pageNumber) => {
    setcurrentPage(pageNumber);
    console.log("CurrentPage recieved: "+pageNumber);
    console.log(currentPage);
    // this.setState({currentPage: pageNumber});
    // if (mailType==="Inbox"){
    //   getRecievedMailLength();
    //   fetchRecievedMail();
    // }
    // else{
    //   getSentMailLength();
    //   fetchSentMail();
    // }
  }

  // render() {
    // if (this.state.openedMail===""){
    //   if (this.props.mailType!=this.state.mailType){
    //     console.log("MailList render()");
    //     this.state.mailType = this.props.mailType;
    //     if (this.state.mailType==="Inbox"){
    //       this.getRecievedMailLength();
    //       this.fetchRecievedMail();
    //     }
    //     else{
    //       this.getSentMailLength();
    //       this.fetchSentMail();
    //     }
    //   }
    return (
        <div>
          {mailLength!=0 && mailList &&
            <ul class="pagination">
              {pages()}
            </ul>
          }
          <table class="table table-inbox table-hover">
          <tbody>
              {mailList.length ? mailList.map((item)=>(
                  <tr key={item.mailAddress} class="unread" onClick={() => viewMail(item)}>
                  <td class="inbox-small-cells">
                      <input type="checkbox" class="mail-checkbox"/>
                  </td>
                  <td class="inbox-small-cells"><i class="fa fa-star"></i></td>
                  <td class="view-message  dont-show fw-bold">{item.subject}</td>
                  <td class="view-message">{item.body}</td>
                  <td class="view-message text-right">{getTime(item.timestamp)}</td>
              </tr>
              )) : <></>}
          </tbody>
          </table>
          {mailLength!=0 && 
            <ul class="pagination">
              {pages()}
            </ul>
          }
        </div>
        );
      //   }
      //   else{
      //     return (
      //       // <ViewMail mailBasic={this.state.openedMail} mailAdvanced={this.state.advancedDetails}></ViewMail>
      //       <ViewMail mailAddress={this.state.openedMail.mailAddress}></ViewMail>
      //     );
      //     //mailAddress
      // }
  // }

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
