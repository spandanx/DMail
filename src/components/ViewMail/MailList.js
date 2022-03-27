import React, { Component } from 'react';
import ViewMail from './ViewMail';
import AccountManager from '../../AccountManager';
import web3 from '../../web3';

class MailList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        openedMail:'',
        advancedDetails:'',
        months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    };
  }

  async componentDidMount() {
        // console.log("this.state.openedMail");
        this.setState({opacity: ""});
        console.log(this.state.openedMail);
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

  render() {
    return (
        <>
        {this.state.openedMail==="" && 

        <table class="table table-inbox table-hover">
        <tbody>
            {this.props.mail.map((item)=>(
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
        }

        {this.state.openedMail!=="" && 
            // <ViewMail mail={this.state.openedMail}></ViewMail>
            <ViewMail mailBasic={this.state.openedMail} mailAdvanced={this.state.advancedDetails}></ViewMail>
        }
        </>
    );
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
