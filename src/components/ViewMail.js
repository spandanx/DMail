import React, { Component } from 'react';

class ViewMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
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
                                        <a class="btn btn-sm btn-primary" href="mail_compose.html" data-original-title="" title=""><i class="fa fa-reply"></i> Reply</a>
                                        <button title="" data-placement="top" data-toggle="tooltip" type="button" data-original-title="Print" class="btn  btn-sm tooltips"><i class="fa fa-print"></i> </button>
                                        <button title="" data-placement="top" data-toggle="tooltip" data-original-title="Trash" class="btn btn-sm tooltips"><i class="fa fa-trash-o"></i></button>
                                    </div>
                                </div>
                                <div class="col-md-4 text-right">
                                    <p class="date"> 8:02 PM 12 FEB 2014</p>
                                </div>
                                <div class="col-md-12">
                                    <h4> {this.props.mail.subject}</h4>
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
                                {this.props.mail.body}
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
    );
  }
}

export default ViewMail;
