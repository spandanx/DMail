// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

// import {DMail} from "./DMail.sol";

contract DMail{

    struct Mail{
        string body;
    }

    // string _mailId;
    address private _address;
    Mail[] private sent;
    Mail[] private recieved;
    bool public validInstance = false;


    constructor() {
        _address = msg.sender;
        validInstance = true;
    }

    function addRecievedMail(Mail calldata mail) public{
        recieved.push(mail);
    }

    function addSendMail(Mail calldata mail) public{
        sent.push(mail);
    }

    function sendMail(string calldata message) public{
        Mail memory mail = Mail({body: message});
        sent.push(mail);
    }
    function getSentMails() public view returns(Mail[] memory){
        return sent;
    }
    function getRecievedMails() public view returns(Mail[] memory){
        return recieved;
    }
}

contract MailAccount {
    
    mapping(address => DMail) accounts;
    DMail[] arr;

    function accountSignUp() public{
        address addr = msg.sender;
        accounts[addr] = new DMail();
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

    //pagination to be done
    function getSentMail() public view returns(DMail.Mail[] memory){
        address addr = msg.sender;
        require(address(accounts[addr])!=address(0), "instance not found at given address");
        return accounts[addr].getSentMails();
    }
    //pagination to be done
    function getRecievedMail() public view returns(DMail.Mail[] memory){
        address addr = msg.sender;
        require(address(accounts[addr])!=address(0), "instance not found at given address");
        return accounts[addr].getRecievedMails();
    }

    function sendMail(address sender, address reciever, string calldata message) public{
        require(address(accounts[sender])!=address(0), "Sender not found");
        require(address(accounts[reciever])!=address(0), "Reciever not found");

        DMail.Mail memory mail = DMail.Mail({body: message});
        accounts[sender].addSendMail(mail);
        accounts[reciever].addRecievedMail(mail);
    }

    function checkIfValidAddress(address addr) public view returns(bool){
        return (address(accounts[addr])!=address(0));
    }

    function getAllAccounts() public view returns (DMail[] memory){
        return arr;
    }

    function getAccountInstance(address addr) public view returns (DMail){
        return accounts[addr];
    }
}