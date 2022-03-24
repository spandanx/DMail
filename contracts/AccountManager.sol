// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

// import {DMail} from "dmail.sol";
contract MailObj{
    struct Mail{
        string subject;
        address[] to;
        address[] cc;
        address[] bcc;
        string body;
        address referenceMail;
    }
    Mail mail;
    constructor(string memory subject, address[] memory to, address[] memory cc, address[] memory bcc, string memory body, address referenceMail) {
        mail = Mail({subject:subject, to:to, cc:cc, bcc:bcc, body:body, referenceMail:referenceMail});
    }
    function getMail() public view returns(Mail memory){
        return mail;
    }
}

contract MailAccount{
    address private _address;
    address[] public sent;
    address[] public recieved;

    constructor() {
        _address = tx.origin;
    }

    function addRecievedMail(address mail) public{
        recieved.push(mail);
    }

    function addSendMail(address mail) public{
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
    function getSentMail() public view returns(MailObj.Mail[] memory){
        address addr = msg.sender;
        require(address(accounts[addr])!=address(0), "instance not found at given address");
        address[] memory mailAddresses = accounts[addr].getSentMails();
        MailObj.Mail[] memory mailArray = new MailObj.Mail[](mailAddresses.length);
        for (uint i = 0; i<mailAddresses.length; i++){
            mailArray[i] = mails[mailAddresses[i]].getMail();
        }
        return mailArray;
    }
    //pagination to be done
    function getRecievedMail() public view returns(MailObj.Mail[] memory){
        address addr = msg.sender;
        require(address(accounts[addr])!=address(0), "instance not found at given address");
        address[] memory mailAddresses = accounts[addr].getRecievedMails();
        MailObj.Mail[] memory mailArray = new MailObj.Mail[](mailAddresses.length);
        for (uint i = 0; i<mailAddresses.length; i++){
            mailArray[i] = mails[mailAddresses[i]].getMail();
        }
        return mailArray;
    }
    function getSentMailAddresses() public view returns(address[] memory){
        address sender = msg.sender;
        require(address(accounts[sender])!=address(0), "Sender not found");
        return accounts[sender].getSentMails();
    }

    function getRecievedMailAddresses() public view returns(address[] memory){
        address sender = msg.sender;
        require(address(accounts[sender])!=address(0), "Sender not found");
        return accounts[sender].getRecievedMails();
    }

    function sendMail(address[] calldata to, string calldata subject, string calldata body) public{
        address sender = msg.sender;
        require(address(accounts[sender])!=address(0), "Sender not found");
        // string message = string(bytes.concat(bytes("Reciever address"), "-", bytes(" not found")));
        // string addressString = abi.encodePacked(sender);
        // string message2 = string(abi.encodePacked("Reciever address", abi.encodePacked(sender), " not found"));
        for (uint i = 0; i<to.length; i++){
            require(address(accounts[to[i]])!=address(0), string(abi.encodePacked("Reciever address", abi.encodePacked(sender), " not found")));
        }
        // DMail.Mail memory mail = DMail.Mail({body: message});
        address[] memory cc;
        address[] memory bcc;
        MailObj mail = new MailObj({subject: subject, to:to, cc:cc, bcc:bcc, body: body, referenceMail:address(0)});
        mails[address(mail)] = mail;
        // address mailAddress = address(mail);
        accounts[sender].addSendMail(address(mail));
        for (uint i = 0; i<to.length; i++){
            accounts[to[i]].addRecievedMail(address(mail));
        }
    }


    // function checkIfValidAccountAddress(address addr) public view returns(bool){
    //     return (address(accounts[addr])!=address(0));
    // }
    function getMailByAddress (address addr) public view returns (MailObj.Mail memory){
        return mails[addr].getMail();
    }
    function getAllAccounts() public view returns (MailAccount[] memory){
        return arr;
    }
    // function getAccountInstance(address addr) public view returns (MailAccount){
    //     return accounts[addr];
    // }
}