import React, { Component } from 'react';
import ViewMail from './ViewMail';
// import { View, Text } from 'react-native';

class MailList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        openedMail:""
    };
  }

  async componentDidMount() {
        // console.log("this.state.openedMail");
        this.setState({opacity: ""});
        console.log(this.state.openedMail);
  }

  viewMail = async(event) => {
      this.setState({openedMail:event});
      console.log(event);
  }

  resetMail = async() => {
      this.state.openedMail = "";
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
                <td class="view-message  inbox-small-cells"><i class="fa fa-paperclip"></i></td>
                <td class="view-message  text-right">9:27 AM</td>
            </tr>
            ))}
        </tbody>
        </table>
        }

        {this.state.openedMail!=="" && 
            // <ViewMail mail={this.state.openedMail}></ViewMail>
            <div class="container">
            <div class="row">
                <div class="col-md-12">
                    {/* <!-- start:inbox detail --> */}
                    <div class="box">
                        <div class="mail-box">
                            
                            <aside class="lg-side">
                            <div class="inbox-head">
                                <center><h3>View Mail</h3></center>
                                {/* <form class="pull-right position" action="#">
                                    <div class="input-append">
                                        <input type="text" placeholder="Search Mail" class="sr-input"/>
                                        <button type="button" class="btn sr-btn" data-original-title="" title=""><i class="fa fa-search"></i></button>
                                    </div>
                                </form> */}
                            </div>
                            <div class="inbox-body">
                                <div class="heading-inbox row my-4">
                                    <div class="col-md-8">
                                        <div class="compose-btn">
                                            <a class="btn btn-sm btn-primary" href="mail_compose.html" data-original-title="" title="" onClick={this.resetMail}><i class="fa fa-back"></i> Back</a>
                                            <a class="btn btn-sm btn-primary" href="mail_compose.html" data-original-title="" title=""><i class="fa fa-reply"></i> Reply</a>
                                            <button title="" data-placement="top" data-toggle="tooltip" type="button" data-original-title="Print" class="btn  btn-sm tooltips"><i class="fa fa-print"></i> </button>
                                            <button title="" data-placement="top" data-toggle="tooltip" data-original-title="Trash" class="btn btn-sm tooltips"><i class="fa fa-trash-o"></i></button>
                                        </div>
                                    </div>
                                    <div class="col-md-4 text-right">
                                        <p class="date"> 8:02 PM 12 FEB 2014</p>
                                    </div>
                                    <div class="col-md-12">
                                        <h4> {this.state.openedMail.subject}</h4>
                                    </div>
                                </div>
                                <hr/>
                                <div class="sender-info">
                                    <div class="row">
                                        <div class="col-md-12">
                                            {/* <img alt="" src="https://bootdey.com/img/Content/avatar/avatar6.png"/> */}
                                            <strong>John Doe </strong>
                                            <span>[johndoe@gmail.com] </span>
                                            to
                                            <strong> me</strong>
                                            <a class="sender-dropdown " href="javascript:;">
                                                <i class="fa fa-chevron-down"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="view-mail my-4">
                                    {/* <p>Faucibus rutrum. Phasellus sodales vulputate urna, vel accumsan augue egestas ac. Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci. Donec ultrices faucibus rutrum. Phasellus sodales vulputate urna, vel accumsan augue egestas ac. Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci. Donec ultrices faucibus rutrum. Phasellus sodales vulputate urna, vel accumsan augue egestas ac. Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci. </p>
                                    <p>Consequat risus. Mauris sed congue orci. Donec ultrices <a href="#">flatlab</a>. Phasellus sodales vulputate urna, vel accumsan augue egestas ac. Donec
                                        <a href="#">vitae leo at sem lobortis porttitor eu consequat risus</a>. Mauris sed congue orci. Donec ultrices faucibus rutrum. Phasellus sodales vulputate urna, vel accumsan augue egestas ac. Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci. </p>
                                    <p>Modales vulputate urna, vel <a href="#">thevectorlab.net</a>. Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci. Donec ultrices faucibus rutrum. Phasellus sodales vulputate urna, vel accumsan augue egestas ac. Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci. </p> */}
                                    {this.state.openedMail.body}
                                </div>
                                {/* <div class="attachment-mail">
                                    <p>
                                        <span><i class="fa fa-paperclip"></i> 3 attachments — </span>
                                        <a href="#">Download all attachments</a>
                                        |
                                        <a href="#">View all images</a>
                                    </p>
                                    <ul>
                                        <li>
                                            <a href="#" class="atch-thumb">
                                                <img src="https://via.placeholder.com/128x100"/>
                                            </a>
                                            <div class="file-name">
                                                image-name.jpg
                                            </div>
                                            <span>12KB</span>
                                            <div class="links">
                                                <a href="#">View</a> -
                                                <a href="#">Download</a>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="#" class="atch-thumb">
                                                <img src="https://via.placeholder.com/128x100"/>
                                            </a>
                                            <div class="file-name">
                                                img_name.jpg
                                            </div>
                                            <span>40KB</span>
                                            <div class="links">
                                                <a href="#">View</a> -
                                                <a href="#">Download</a>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="#" class="atch-thumb">
                                                <img src="https://via.placeholder.com/128x100"/>
                                            </a>
                                            <div class="file-name">
                                                img_name.jpg
                                            </div>
                                            <span>30KB</span>
                                            <div class="links">
                                                <a href="#">View</a> -
                                                <a href="#">Download</a>
                                            </div>
                                        </li>
                                    </ul>
                                </div> */}
                                <div class="compose-btn pull-left">
                                    <a class="btn btn-sm btn-primary" href="mail_compose.html" data-original-title="" title=""><i class="fa fa-reply"></i> Reply</a>
                                    <button class="btn btn-sm " data-original-title="" title=""><i class="fa fa-arrow-right"></i> Forward</button>
                                    <button title="" data-placement="top" data-toggle="tooltip" type="button" data-original-title="Print" class="btn  btn-sm tooltips"><i class="fa fa-print"></i> </button>
                                    <button title="" data-placement="top" data-toggle="tooltip" data-original-title="Trash" class="btn btn-sm tooltips"><i class="fa fa-trash-o"></i></button>
                                </div>
                            </div>
                        </aside>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
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
