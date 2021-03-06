import React, { Component, useState, useEffect } from 'react';
import web3 from '../../web3';
import AccountManager from '../../AccountManager';
import { useLocation, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notification from '../Notification';
import { TiTick } from "react-icons/ti";
import { BsExclamation } from "react-icons/bs";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const ComposeMail = (props) => {
// class ComposeMail extends Component {

  const navigate = useNavigate();

  console.log("ComposeMail props");
  console.log(props);

  const [subject, setSubject] = useState('');
  const [to, setTo]= useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [body, setBody] = useState('');
  const [referenceMail, setReferenceMail] = useState("0x0000000000000000000000000000000000000000");
  const [redirect, setRedirect] = useState(props.redirect? props.redirect : '/mail/inbox');
  const [redirectMailAdddress, setRedirectMailAdddress] = useState(props.mailAddress? props.mailAddress : '');

  // const [validTo, setValidTo] = useState(false);
  // const [validCc, setValidCc] = useState(false);
  // const [validBcc, setValidBcc] = useState(true);

  const [validToMsg, setValidToMsg] = useState('');
  const [validCcMsg, setValidCcMsg] = useState('');
  const [validBccMsg, setValidBccMsg] = useState('');

  const sampleMsg = "Address 0xcDD7ef1e4a8A5E291ca318960B1Da3DF93acd48F is not valid";

  const [validForm, setValidForm] = useState(false);
  // const [closeButton, setCloseButton] = useState(props.closeButton? props.closeButton : '');

  console.log("REDIRECT-PAGE");
  console.log(props);

  useEffect(() => {
    sessionStorage.setItem("activeTab", 0);
    console.log("Mail Provided");
    if (props && props.mail){
      setSubject(props.mail.subject? props.mail.subject : '');
      setCc(props.mail.cc? props.mail.cc.join("; ") : '');
      setTo(props.mail.to? props.mail.to.join("; ") : '');
      setReferenceMail(props.mail.referenceMail ? props.mail.referenceMail: '');
    }
}, [props.mail]);
  
  const sendMail = async(event) => {
    event.preventDefault();

    toast.info('Sending mail...', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    let date = (new Date()).getTime();
    let currentTimestamp = date;
    
    const accounts = await web3.eth.getAccounts();
    console.log("calling sendmail");

    let toAddresses = !to ? [] : to.split(';').map(function(adr) {
      return adr.trim();
    });
    let ccAddresses = !cc ? [] : cc.split(';').map(function(adr) {
      return adr.trim();
    });
    let bccAddresses = !bcc ? [] : bcc.split(';').map(function(adr) {
      return adr.trim();
    });

    console.log("Subject: "+subject);
    console.log("Body: "+body);
    console.log("currentTimestamp: "+currentTimestamp);
    console.log("toAddresses: "+toAddresses);
    console.log("ccAddresses: "+ccAddresses);
    console.log("bccAddresses: "+bccAddresses);
    // console.log("To: "+toAddresses);
    //string calldata subject, string calldata body, uint timestamp,
    // string memory typeOfMail, address referenceMail,
    // address[] memory to, address[] memory cc, address[] memory bcc
    // await AccountManager.methods.sendMail(toAddresses, this.state.subject, this.state.body).send({
    //   from: accounts[0]
    // });
    // await AccountManager.methods.sendMail(this.state.subject, this.state.body, currentTimestamp,
    //   "Dummy", "0x0000000000000000000000000000000000000000", 
    //   toAddresses, ccAddresses, bccAddresses).send({
    //   from: accounts[0]
    // });
    try{
      let status = await AccountManager.methods.sendMail(subject, body, currentTimestamp,
        "Dummy", referenceMail, 
        toAddresses, ccAddresses, bccAddresses).send({
        from: accounts[0]
      });

      console.log("STATUS:");
      console.log(status);
      toast.success('Mail sent', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } catch (error) {
      toast.error('Could not send the mail!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      console.log("FAILED");
      console.log(error);
    }
    // setSubject("");
    // setTo("");
    // setCc("");
    // setBcc("");
    // setBody("");
    // setRefernceMail("");
    console.log("sendMail execution done");
    // await lottery.methods.pickWinner().send({
    //   from: accounts[0],
    // });

    // this.setState({message: "mail sent"});
  };

    const sendMailViaNotification = async(event) => {
      // if (closeButton){
      //   closeButton();
      // }
      sessionStorage.setItem("activeTab", 1);//changing activeTab
      if (props.closeButton){
        props.closeButton();
      }
      // props.closeButton
      <Notification func = {sendMail(event)}/>
      navigate(redirect, {state: {mailAddress:redirectMailAdddress}});
    }

    const goToInbox = () => {
      // <Notification func = {notify()}/>
      sessionStorage.setItem("activeTab", 1);//changing activeTab
      navigate("/mail/inbox");
    }

    useEffect(() => {
      validateToAddress(to);
    }, [to]);

      useEffect(() => {
        validateCcAddress(cc);
    }, [cc]);

    useEffect(() => {
      validateBccAddress(bcc);
    }, [bcc]);

    const validateToAddress = async(address) => {
      let msg = "";
      if (address){
        address.split(';').map(async function(adr) {
          try{
            let status = await AccountManager.methods.checkIfAccountExists().call({
              from: adr.trim()
            });
            console.log("Current address: "+ address.trim() +" Valid: "+status);
            if (!status){
              msg = "address "+adr.trim() + " is not valid";
              setValidForm(false);
              setValidToMsg(msg);
              return;
            }
          }
          catch (e) {
            msg = "address "+adr.trim() + " is not valid";
            setValidForm(false);
            setValidToMsg(msg);
            console.log("Current address: "+ address.trim() +" Valid: false");
            return;
          }
        });
      }
      setValidToMsg(msg);
      // setValidForm(true);
    }

    const validateCcAddress = async(address) => {
      let msg = "";
      if (address){
        address.split(';').map(async function(adr) {
          try{
            let status = await AccountManager.methods.checkIfAccountExists().call({
              from: adr.trim()
            });
            console.log("Current address: "+ address.trim() +" Valid: "+status);
            if (!status){
              msg = "address "+adr.trim() + " is not valid";
              setValidCcMsg(msg);
              setValidForm(false);
              return;
            }
          }
          catch (e) {
            msg = "address "+adr.trim() + " is not valid";
            setValidCcMsg(msg);
            setValidForm(false);
            console.log("Current address: "+ address.trim() +" Valid: false");
            return;
          }
        });
      }
      setValidCcMsg(msg);
      // setValidForm(true);
    }

    const validateBccAddress = async(address) => {
      let msg = "";
      if (address){
        address.split(';').map(async function(adr) {
          try{
            let status = await AccountManager.methods.checkIfAccountExists().call({
              from: adr.trim()
            });
            console.log("Current address: "+ address.trim() +" Valid: "+status);
            if (!status){
              msg = "address "+adr.trim() + " is not valid";
              setValidBccMsg(msg);
              setValidForm(false);
              return;
            }
          }
          catch (e) {
            msg = "address "+adr.trim() + " is not valid";
            setValidBccMsg(msg);
            setValidForm(false);
            console.log("Current address: "+ address.trim() +" Valid: false");
            return;
          }
        });
      }
      setValidBccMsg(msg);
      // setValidForm(true);
    }

    useEffect(() => {
      // validateToAddress(to);
      // validateCcAddress(cc);
      // validateBccAddress(bcc);

      if (to!=='' && subject!=='' && body!==''){
        console.log("validToMsg: "+validToMsg);
        if (validToMsg=='' && validCcMsg=='' && validBccMsg==''){
          // console.log("Is Null");
          setValidForm(true);
        }
        else{
          console.log("Is Null");
          setValidForm(false);
        }
      }
      else{
        // console.log("MARK--0");
        // if (validToMsg!=''){
        //   setValidForm(true);
        //   console.log("MARK--1");
        //   return;
        // }
        // if (cc!='' && validCcMsg!=''){
        //   setValidForm(true);
        //   return;
        // }
        // if (bcc!='' && validBccMsg!=''){
        //   setValidForm(true);
        //   return;
        // }
        setValidForm(false);
      }
  }, [to, subject, body, validToMsg, validCcMsg, validBccMsg]);

    return (
        <form class="form-horizontal container" role="form">
          {/* <p>Reference: {refernceMail}</p> */}
        <p class="text-center">New Message</p>
        <div class="form-group row my-3">
          <div class="col-sm-11">
            <input type="text" class="form-control select2-offscreen" id="to" placeholder="To" tabIndex="-1"
                value={to} 
                onChange={(event) => setTo(event.target.value)}
            />
          </div>
          <div class="col-sm-1">
                  {!validToMsg && 
                    <div title={"Valid"} data-toggle="popover" data-trigger="hover" data-content="Some content"><TiTick color='green'/></div>
                  }
                  {validToMsg && 
                    <div title={validToMsg} data-toggle="popover" data-trigger="hover" data-content="Some content"><BsExclamation color='red'/></div>
                  }
              </div>
        </div>
        <div class="form-group row my-3">
            <div class="col-sm-11">
                <input type="text" class="form-control select2-offscreen" id="cc" placeholder="Cc" tabIndex="-1"
                    value={cc} 
                    onChange={(event) => setCc(event.target.value)}
                />
            </div>
            <div class="col-sm-1">
                  {!validCcMsg && 
                    <div title={"Valid"} data-toggle="popover" data-trigger="hover" data-content="Some content"><TiTick color='green'/></div>
                  }
                  {validCcMsg && 
                    <div title={sampleMsg} data-toggle="popover" data-trigger="hover" data-content="Some content"><BsExclamation color='red'/></div>
                  }
              </div>
        </div>
        <div class="form-group row my-3">
          <div class="col-sm-11">
            <input type="text" class="form-control select2-offscreen" id="bcc" placeholder="Bcc" tabIndex="-1"
                value={bcc}
                onChange={(event) => setBcc(event.target.value)}
            />
          </div>
          <div class="col-sm-1">
            {!validBccMsg && 
              <a href="#" title={"Valid"} data-toggle="popover" data-trigger="hover" data-content="Some content"><TiTick color='green'/></a>
            }
            {validBccMsg && 
              <a href="#" title={sampleMsg} data-toggle="popover" data-trigger="hover" data-content="Some content"><BsExclamation color='red'/></a>
            }
            </div>
        </div>
        <div class="form-group row my-3">
          <div class="col-sm-11">
            <input type="text" class="form-control select2-offscreen" id="bcc" placeholder="Subject" tabIndex="-1"
                value={subject} 
                onChange={(event) => setSubject(event.target.value)}/>
          </div>
        </div>
        <div class="form-group row my-3">
          <div class="col-sm-11">
                <textarea class="form-control" id="message" name="body" rows="8" placeholder="Body"
                    value={body} 
                    onChange={(event) => setBody(event.target.value)}
                ></textarea>
            </div>
        </div>

        <div class="form-group row my-3 justify-content-center">
          <div class="col-sm-11">
              {/* <div class="form-group"> */}
                  <button disabled={!validForm} class="btn btn-success mx-1" onClick={sendMailViaNotification}>Send</button>
                  {/* <button type="submit" class="btn btn-light mx-1">Draft</button> */}
                  <button type="submit" class="btn btn-danger mx-1" onClick={()=>goToInbox()}>Discard</button>
              {/* </div> */}
          {/* </div> */}
              </div>
          </div>
      </form>
    );
  // }
}

export default ComposeMail;
