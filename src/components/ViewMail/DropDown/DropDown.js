import React, { Component } from 'react';

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // mailBasic:'',
        // mailAdvanced:''
    };
  }

  render() {
      console.log("Inside dropdown");
      console.log("Basic");
      console.log(this.props.mailBasic);
      console.log("Advanced");
      console.log(this.props.mailAdvanced);
    //   this.setState({mailBasic:this.props.mailBasic, mailAdvanced:this.props.mailAdvanced});
    return (
        <>
        <a class="dropdown-toggle mx-1" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                            
        </a>

        <ul class="dropdown-menu shadow-sm p-3 mb-5 bg-white rounded" aria-labelledby="dropdownMenuLink">
        <table class="table table-borderless">
            <tbody>
                {/* <tr class="unread"> */}
                    {/* <td class="inbox-small-cells">
                        <input type="checkbox" class="mail-checkbox"/>
                    </td>
                    <td class="inbox-small-cells"><i class="fa fa-star"></i></td> */}
                    <tr class="view-message  dont-show fw-bold">
                        <td>from:</td>
                        <td>{this.props.mailAdvanced.from}</td>
                    </tr>
                    {this.props.mailAdvanced.to? 
                        <tr class="view-message">
                            <td>To:</td>
                            <td>{this.props.mailAdvanced.to?.map((item)=>(
                                <span>{"<"+item+">"}</span>
                            ))}</td>
                        </tr>
                    : <></>}
                    {this.props.mailAdvanced.cc? 
                        <tr class="view-message ">
                            <td>Cc</td>
                            <td>{this.props.mailAdvanced.cc?.map((item)=>(
                                <span>{"<"+item+">"}</span>
                            ))}</td>
                        </tr>
                    : <></>}
                    {/* <tr class="view-message ">
                        <td>Bcc</td>
                        <td>{this.props.mailAdvanced.bcc?.map((item)=>(
                            <span>{"<"+item+">"}</span>
                        ))}</td>
                    </tr> */}
                    {/* <tr class="view-message  text-right">9:27 AM</tr> */}
                    {/* <tr class="view-message  text-right">to:        myemail@gmail.com</tr>
                    <tr class="view-message  text-right">date:      Date 26, 2022, 00 AM</tr>
                    <tr class="view-message  text-right">subject:       Subject</tr> */}
                {/* </tr> */}
            </tbody>
        </table>
            {/* <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li> */}
        </ul>
        </>
    );
  }
}

export default DropDown;
