import React, { Component } from 'react';
import web3 from '../web3';
import AccountManager from '../AccountManager';

class ComposeMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        subject:"",
        to:"",
        cc:"",
        bcc:"",
        body:""
    };
  }

  sendMail = async(event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    console.log("calling sendmail");

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

  render() {
    return (
        <form class="form-horizontal container" role="form">
        <p class="text-center">New Message</p>
        <div class="form-group row my-3">
          <div class="col-sm-12">
            <input type="text" class="form-control select2-offscreen" id="to" placeholder="To" tabindex="-1"
                value={this.state.to} 
                onChange={(event) => this.setState({ to: event.target.value })}
            />
          </div>
        </div>
        <div class="form-group row my-3">
          {/* <label for="cc" class="col-sm-1 control-label py-1">CC:</label> */}
          <div class="col-sm-12">
            <input type="text" class="form-control select2-offscreen" id="cc" placeholder="Cc" tabindex="-1"
                value={this.state.cc} 
                onChange={(event) => this.setState({ cc: event.target.value })}
            />
          </div>
        </div>
        <div class="form-group row my-3">
          {/* <label for="bcc" class="col-sm-1 control-label py-1">BCC:</label> */}
          <div class="col-sm-12">
            <input type="text" class="form-control select2-offscreen" id="bcc" placeholder="Bcc" tabindex="-1"
                value={this.state.bcc} 
                onChange={(event) => this.setState({ bcc: event.target.value })}
            />
          </div>
        </div>
        <div class="form-group row my-3">
          {/* <label for="bcc" class="col-sm-1 control-label py-1">BCC:</label> */}
          <div class="col-sm-12">
            <input type="email" class="form-control select2-offscreen" id="bcc" placeholder="Subject" tabindex="-1"
                value={this.state.subject} 
                onChange={(event) => this.setState({ subject: event.target.value })}/>
          </div>
        </div>
        <div class="form-group row my-3">
          <div class="col-sm-12">
                <textarea class="form-control" id="message" name="body" rows="8" placeholder="Body"
                    value={this.state.body} 
                    onChange={(event) => this.setState({ body: event.target.value })}
                ></textarea>
            </div>
        </div>

        <div class="form-group row my-3 justify-content-center">
          <div class="col-sm-12">
              {/* <div class="form-group"> */}
                  <button type="submit" class="btn btn-success" onClick={this.sendMail}>Send</button>
                  <button type="submit" class="btn btn-light">Draft</button>
                  <button type="submit" class="btn btn-danger">Discard</button>
              {/* </div> */}
          {/* </div> */}
              </div>
          </div>
      </form>
    );
  }
}

export default ComposeMail;
