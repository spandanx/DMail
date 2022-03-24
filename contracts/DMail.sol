// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

contract DMail{
    struct Mail{
        // string subject;
        // address[] to;
        // address[] cc;
        // address[] bcc;
        string body;
    }

    // string _mailId;
    address _address;
    Mail[] sent;
    Mail[] recieved;

    constructor() {
        _address = msg.sender;
    }

    function sendMail(string calldata message) public{
        Mail memory mail = Mail({body: message});
        sent.push(mail);
    }
    function getSentMails() public view returns(Mail[] memory){
        // uint len = sent.length;
        // if (sent.length==0){
        //     return "";
        // }
        // return sent[sent.length-1].body;
        return sent;
        // return sent[0].body;
        // return "Dummy";
    }
}