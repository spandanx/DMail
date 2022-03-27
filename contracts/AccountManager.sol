// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

// import {DMail} from "dmail.sol";
contract MailObj{
    struct MailBasic{
        string subject;
        uint timestamp;
        string body;
        address mailAddress;
    }
    struct MailAdvanced{
        address[] to;
        address[] cc;
        address[] bcc;
        string typeOfMail;
        address referenceMail;
        address from;
    }

    // address[] _to;
    // address[] _cc;
    // address[] _bcc;
    // string _typeOfMail;
    // address _referenceMail;
    // address _from;
    
    MailBasic _mailBasic;
    MailAdvanced _mailAdvanced;

    constructor(string memory subject, string memory body, uint timestamp) {
        _mailBasic = MailBasic({subject:subject, body:body, timestamp:timestamp, mailAddress:address(this)});
    }
    function setAdvanced(string memory typeOfMail, address referenceMail, address from, address[] memory to, address[] memory cc, address[] memory bcc) public{
        // _typeOfMail = typeOfMail;
        // _referenceMail = referenceMail;
        // _from = from;
        // _to = to;
        // _cc = cc;
        // _bcc = bcc;
        _mailAdvanced = MailAdvanced({typeOfMail:typeOfMail, referenceMail:referenceMail, from:from, to:to, cc:cc, bcc:bcc});
    }
    // function setTo(address[] memory to) public{
    //     _to = to;
    // }
    // function setCc(address[] memory cc) public{
    //     _cc = cc;
    // }
    // function setBcc(address[] memory bcc) public{
    //     _bcc = bcc;
    // }

    function getMailBasic() public view returns(MailBasic memory){
        return _mailBasic;
    }
    function getMailAdvanced() public view returns(MailAdvanced memory){
        return _mailAdvanced;
    }
}

contract MailAccount{
    address private _address;
    address[] public sent;
    address[] public recieved;
    // mapping(address=>)

    constructor() {
        _address = tx.origin;
    }

    function addRecievedMail(address mail) public{
        recieved.push(mail);
    }

    function addSentMail(address mail) public{
        sent.push(mail);
    }
    function getSentMails() public view returns(address[] memory){
        return sent;
    }
    function getRecievedMails() public view returns(address[] memory){
        return recieved;
    }
}


contract AccountManager {
    mapping(address => MailAccount) accounts;
    mapping(address => MailObj) mails;
    MailAccount[] arr;

    function accountSignUp() public{
        address addr = tx.origin;//msg.sender;
        require(address(accounts[addr])==address(0), "Account already present");
        accounts[addr] = new MailAccount();
        arr.push(accounts[addr]);
    }

    function checkIfAccountExists() public view returns(bool){
        address sender = tx.origin;
        return (address(accounts[sender])!=address(0));
    }

    // function check(address addr) public view returns(address){
    //     return address(accounts[addr]);
    // }
    // function check0() public view returns(address){
    //     return address(0);
    // }

    // function checkValid(address addr) public view returns(bool){
    //     return address(accounts[addr])==address(0);
    // }
    // modifier checkAddress(address addr, string memory message){

    // }
    //pagination to be done
    function getSentMailBasic() public view returns(MailObj.MailBasic[] memory){
        address addr = msg.sender;
        require(address(accounts[addr])!=address(0), "instance not found at given address");
        address[] memory mailAddresses = accounts[addr].getSentMails();
        MailObj.MailBasic[] memory mailArray = new MailObj.MailBasic[](mailAddresses.length);
        for (uint i = 0; i<mailAddresses.length; i++){
            mailArray[i] = mails[mailAddresses[i]].getMailBasic();
        }
        return mailArray;
    }
    //pagination to be done
    function getRecievedMailBasic() public view returns(MailObj.MailBasic[] memory){
        address addr = msg.sender;
        require(address(accounts[addr])!=address(0), "instance not found at given address");
        address[] memory mailAddresses = accounts[addr].getRecievedMails();
        MailObj.MailBasic[] memory mailArray = new MailObj.MailBasic[](mailAddresses.length);
        for (uint i = 0; i<mailAddresses.length; i++){
            mailArray[i] = mails[mailAddresses[i]].getMailBasic();
        }
        return mailArray;
    }
    // function getSentMailAddresses() public view returns(address[] memory){
    //     address sender = msg.sender;
    //     require(address(accounts[sender])!=address(0), "Sender not found");
    //     return accounts[sender].getSentMails();
    // }

    // function getRecievedMailAddresses() public view returns(address[] memory){
    //     address sender = msg.sender;
    //     require(address(accounts[sender])!=address(0), "Sender not found");
    //     return accounts[sender].getRecievedMails();
    // }

    function sendMail(string calldata subject, string calldata body, uint timestamp,
            string memory typeOfMail, address referenceMail,
            address[] memory to, address[] memory cc, address[] memory bcc
            ) public{
        address sender = msg.sender;
        require(address(accounts[sender])!=address(0), "Sender not found");
        // string message = string(bytes.concat(bytes("Reciever address"), "-", bytes(" not found")));
        // string addressString = abi.encodePacked(sender);
        // string message2 = string(abi.encodePacked("Reciever address", abi.encodePacked(sender), " not found"));
        for (uint i = 0; i<to.length; i++){
            require(address(accounts[to[i]])!=address(0), string(abi.encodePacked("Reciever address", abi.encodePacked(sender), " not found")));
        }
        // DMail.Mail memory mail = DMail.Mail({body: message});
        // address[] memory cc;
        // address[] memory bcc;
        MailObj mail = new MailObj({subject: subject, body: body, timestamp:timestamp});//to:to, cc:cc, bcc:bcc, referenceMail:address(0)
        mail.setAdvanced({typeOfMail:typeOfMail, referenceMail:referenceMail, from:sender, to:to, cc:cc, bcc:bcc});
        mails[address(mail)] = mail;
        // address mailAddress = address(mail);
        accounts[sender].addSentMail(address(mail));
        for (uint i = 0; i<to.length; i++){
            accounts[to[i]].addRecievedMail(address(mail));
        }
        for (uint i = 0; i<cc.length; i++){
            accounts[cc[i]].addRecievedMail(address(mail));
        }
        for (uint i = 0; i<bcc.length; i++){
            accounts[bcc[i]].addRecievedMail(address(mail));
        }

    }


    // function checkIfValidAccountAddress(address addr) public view returns(bool){
    //     return (address(accounts[addr])!=address(0));
    // }
    function getMailBasicByAddress (address addr) public view returns (MailObj.MailBasic memory){
        return mails[addr].getMailBasic();
    }
    function getMailAdvancedByAddress (address addr) public view returns (MailObj.MailAdvanced memory){
        return mails[addr].getMailAdvanced();
    }
    function getAllAccounts() public view returns (MailAccount[] memory){
        return arr;
    }
    // function getAccountInstance(address addr) public view returns (MailAccount){
    //     return accounts[addr];
    // }
}