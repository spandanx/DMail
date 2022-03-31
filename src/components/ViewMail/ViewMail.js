import React, { Component, useState, useEffect } from 'react';
import DropDown from './DropDown/DropDown';
import AccountManager from '../../AccountManager';
import web3 from '../../web3';
import ComposeMail from '../Mail/ComposeMail';
import { useNavigate, useLocation } from "react-router-dom";
import {BsArrowLeftCircleFill, BsTrashFill, BsFillReplyFill } from "react-icons/bs";

const ViewMail = (props) => {
// class ViewMail extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         rootMailAddress:"",
//         mailBasic:"",
//         mailAdvanced:""
//     };
//   }
    const navigate = useNavigate();
    console.log("props");
    console.log(props);
    const [mailBasic, setMailBasic] = useState('');
    const [mailAdvanced, setMailAdvanced] = useState('');
    const [rootMailAddress, setRootMailAddress] = useState('');
    const [mailAddress, setMailAddress] = useState('');
    const [currentAccount, setCurrentAccount] = useState('');
    const [replying, setReplying] = useState(false);
    const [replyMail, setReplyMail] = useState({});

    // const replyMail = {"key1":"val1", "key2":"val2"};

    let location = useLocation();
    console.log("location");
    console.log(location);

    // useEffect(()=>{
    //     console.log("useEffect() getting called of ViewMail.js");
    //     setMailAddress(location.state.mailAddress);
    //     fetchBasicDetails(location.state.mailAddress);
    //     fetchAdvancedDetails(location.state.mailAddress);
        // console.log(state);
    // });

    useEffect(() => {
        setMailAddress(location.state.mailAddress);
        fetchBasicDetails(location.state.mailAddress);
        fetchAdvancedDetails(location.state.mailAddress);
    }, [location.state.mailAddress]);

    // const getCurrentAccountAddress = () => {
        
    //     return acc;
    // }

  const getTime = (timestamp) => {

    let d = new Date(parseInt(timestamp));
    console.log("Date: "+timestamp);
    let datestring = "";
    let hour = ""+d.getHours();
    let minute = ""+d.getMinutes();
    if (hour.length==1){
        hour = "0"+hour;
    }
    if (minute.length==1){
        minute = "0"+minute;
    }
    datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
        hour + ":" + minute;
    //.toString().substring(2)
    // 16-5-2015 9:50
    return datestring;
  }

  const fetchBasicDetails = async(mailAddress) => {
    console.log("fetchAdvancedDetails: "+mailAddress);
    // let accounts = await web3.eth.getAccounts();
    let basicDetails = await AccountManager.methods.getMailBasicByAddress(mailAddress).call();
    // this.setState({advancedDetails:advancedDetails});
    console.log("basicDetails");
    console.log(basicDetails);
    // this.setState({mailBasic: basicDetails});
    setMailBasic(basicDetails);
    // this.state.mailBasic.push(basicDetails);
  }

  const fetchAdvancedDetails = async(mailAddress) => {
    console.log("fetchAdvancedDetails: "+mailAddress);
    // let accounts = await web3.eth.getAccounts();
    let advancedDetails = await AccountManager.methods.getMailAdvancedByAddress(mailAddress).call();
    // this.setState({advancedDetails:advancedDetails});
    console.log("advancedDetails");
    console.log(advancedDetails);
    // this.state.mailAdvanced.push(advancedDetails);
    // return advancedDetails;
    // this.setState({mailAdvanced: advancedDetails});
    setMailAdvanced(advancedDetails);
  }

  const fetchAllReferencedMails = async(rootAddress) => {
    //   let currentAddress = rootAddress;
    //   while (rootAddress!=="0x0000000000000000000000000000000000000000"){
    //         console.log("currentAddress: "+currentAddress);
    //         this.state.mailBasic.push(this.fetchBasicDetails(currentAddress));
    //         this.state.mailAdvanced.push(this.fetchAdvancedDetails());
    //         currentAddress = this.state.mailAdvanced[this.state.mailAdvanced.length-1].referenceMail;
    //   }
  }

//   const replyMail = async(referenceMail) => {
//     <ComposeMail referenceMail={referenceMail}></ComposeMail>
//   }

  const goback = () => {
      console.log("Goback");
      navigate(-1);
  }

//   const generateToForReply = (addresses, filterOut, letIn) => {
//       let toReturn  = [];
//       for (let i = 0; i<addresses.length; i++){
//           console.log(addresses[i]+" !== "+filterOut);
//           if (addresses[i]!==filterOut)
//             toReturn.push(addresses[i]);
//       }
//       toReturn.push(letIn);

//       console.log("addresses");
//       console.log(addresses);

//       console.log("filterOut");
//       console.log(filterOut);

//       console.log("letIn");
//       console.log(letIn);

//       console.log("toReturn");
//       console.log(toReturn);
      
//   }

  const getActiveAddress = () => {
      return web3.currentProvider.selectedAddress;
  }

  const enableReply = () => {
      console.log("Toogling");
      let mailDetails = {"subject":"RE: "+mailBasic.subject,
                        "cc":mailAdvanced.cc,
                        "to":[mailAdvanced.from],
                        "referenceMail": mailBasic.mailAddress
                        };
      setReplyMail(mailDetails);
      setReplying(true);
  }

  const disableReply = () => {
    console.log("Toogling");
  setReplying(false);
}

  const getMailComponent = (mailBasic, mailAdvanced, index) => {
      if (mailBasic && mailAdvanced){
    return (
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="mail-box">
                        <aside class="lg-side">
                        {/* <div class="inbox-head">
                            <center><h3>View Mail</h3></center>
                        </div> */}
                        <div class="inbox-body">
                            <div class="heading-inbox row my-4">
                                <div class="col-md-8">
                                    <div class="compose-btn">
                                        {/* <a class="btn btn-sm btn-primary" href="mail_compose.html" data-original-title="" title="" onClick={console.log("back button clicked")}><i class="fa fa-back"></i> Back</a> */}
                                        <span class="btn btn-sm btn-primary mx-1" onClick={()=>goback()}><BsArrowLeftCircleFill/> Back</span>
                                        {/* <button class="" data-original-title="" title="" ><i class="bi bi-arrow-left-circle-fill"></i></button> */}
                                        
                                        <button class="btn btn-sm btn-primary mx-1" data-original-title="" title="" onClick={()=>enableReply()}><BsFillReplyFill/> Reply</button>
                                        {/* <button title="" data-placement="top" data-toggle="tooltip" type="button" data-original-title="Print" class="btn  btn-sm tooltips"><i class="fa fa-print"></i> </button>
                                        <button title="" data-placement="top" data-toggle="tooltip" data-original-title="Trash" class="btn btn-sm tooltips"><i class="fa fa-trash-o"></i></button> */}
                                    </div>
                                </div>
                                <div class="col-md-4 text-end">
                                    <p class="date">{getTime(mailBasic.timestamp)}</p>
                                </div>
                                <div class="col-md-12">
                                    <h4> {mailBasic.subject}</h4>
                                </div>
                            </div>
                            <hr/>
                            <div class="sender-info">
                                <div class="row">
                                    <div class="col-md-12">
                                        <strong>{"<"+mailAdvanced?.from+">"}</strong>
                                        <span> </span>
                                        <div>
                                            to
                                            <strong> me</strong>
                                            <DropDown mailBasic={mailBasic} mailAdvanced={mailAdvanced}></DropDown>
                                        </div>
                                        <a class="sender-dropdown " href="javascript:;">
                                            <i class="fa fa-chevron-down"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="view-mail my-4">
                                {mailBasic.body}
                            </div>
                            <div class="compose-btn pull-left">
                                <a onClick={()=>enableReply()} class="btn btn-sm btn-primary" data-original-title="" title=""><BsFillReplyFill/> Reply</a>
                                <button class="btn btn-sm " data-original-title="" title=""><i class="fa fa-arrow-right"></i> Forward</button>
                                <button title="" data-placement="top" data-toggle="tooltip" type="button" data-original-title="Print" class="btn  btn-sm tooltips"><i class="fa fa-print"></i> </button>
                                <button title="" data-placement="top" data-toggle="tooltip" data-original-title="Trash" class="btn btn-sm tooltips"><i class="fa fa-trash-o"></i></button>
                            </div>
                            <div>
                                {replying ? 
                                <div class="border border-dark my-3">
                                    <button onClick={()=>disableReply()} class="btn btn-sm btn-danger float-end" data-original-title="" title=""><BsTrashFill/> Delete</button>
                                    <ComposeMail mail={replyMail}/>
                                </div>
                                : ''}
                            </div>
                        </div>
                    </aside>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    );
      }
      return (<div></div>);
  }

//   render() {
    //   if (rootMailAddress!=mailAddress){
    //     // this.state.mailBasic = this.props.mailBasic;
    //     console.log("Render Called ViewMail.js");
    //     console.log(this.props);
    //     // this.state.mailAdvanced = this.props.mailAdvanced;
    //     // this.setState({rootMailAddress: this.props.mailAddress});
    //     setRootMailAddress(mail);
    //     this.fetchBasicDetails(this.props.mailAddress);
    //     this.fetchAdvancedDetails(this.props.mailAddress);
    //     // this.fetchAllReferencedMails(this.props.mailAddress);
    //     // console.log("OpenedMail");
    //     // console.log(this.state.mailBasic);
    //   }
    //   console.log("history: ");
    //   console.log(this.props.history);
    // let toReturnMails = [];
    // for (let i = 0; i<this.state.mailBasic.length; i++){
    //     toReturnMails.push(this.getMailComponent(this.state.mailBasic[i], this.state.mailAdvanced[i], i));
    // }
    console.log("Before render");
    console.log(mailBasic);
    // if (this.state.mailBasic.length>0 && this.state.mailAdvanced.length>0){
        return (
            <>
            {getMailComponent(mailBasic, mailAdvanced, 0)}
            </>
        );
    // }
    // else{
    //     return (
    //         <>
    //         </>
    //     );
    // }
//   }
}

export default ViewMail;
