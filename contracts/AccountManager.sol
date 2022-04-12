// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

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
        _mailAdvanced = MailAdvanced({typeOfMail:typeOfMail, referenceMail:referenceMail, from:from, to:to, cc:cc, bcc:bcc});
    }

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

    constructor() {
        _address = tx.origin;
    }

    function addRecievedMail(address mail) public{
        recieved.push(mail);
    }

    function getSentLength() public view returns (uint){
        return sent.length;
    }
    function getRecievedLength() public view returns (uint){
        return recieved.length;
    }

    function addSentMail(address mail) public{
        sent.push(mail);
    }
    function min(uint a, uint b) internal pure returns (uint){
        return a<b? a : b;
    }
    function max(uint a, uint b) internal pure returns (uint){
        return a>b? a : b;
    }

    // function dummy(uint pageSize, uint pageNumber) public view returns(uint[] memory){
    //     uint offset = pageNumber * pageSize;
    //     uint length = sent.length;
    //     uint[] memory toReturn = new uint[](0);
    //     if (pageSize<=0){
    //         return toReturn;
    //     }
    //     if (pageNumber<0){
    //         return toReturn;
    //     }
    //     if (offset>=length){
    //         return toReturn;
    //     }

    //     uint endIndex = length;
    //     if (length>=offset){
    //         endIndex = length - offset;
    //     }
    //     //  = max(length - offset, 0);
    //     uint startIndex = 0;
    //     if (endIndex>=pageSize){
    //         startIndex = endIndex - pageSize;
    //     }
    //     uint[] memory ans = new uint[](2);
    //     ans[0] = startIndex;
    //     ans[1] = endIndex;
    //     return ans;
    // }

    function getSentMails(uint pageSize, uint pageNumber) public view returns(address[] memory){
        uint offset = pageNumber * pageSize;
        uint length = sent.length;
        address[] memory toReturn = new address[](0);
        if (pageSize<=0){
            return toReturn;
        }
        if (pageNumber<0){
            return toReturn;
        }
        if (offset>=length){
            return toReturn;
        }

        uint endIndex = length;
        if (length>=offset){
            endIndex = length - offset;
        }
        //  = max(length - offset, 0);
        uint startIndex = 0;
        if (endIndex>=pageSize){
            startIndex = endIndex - pageSize;
        }
        // startIndex = max(endIndex - pageSize, 0);
        address[] memory ans = new address[](endIndex - startIndex);
        for (uint i = 0; i<ans.length; i++){
            ans[i] = sent[endIndex-i-1];
        }
        return ans;
    }
    function getRecievedMails(uint pageSize, uint pageNumber) public view returns(address[] memory){
        uint offset = pageNumber * pageSize;
        uint length = recieved.length;
        address[] memory toReturn = new address[](0);
        if (pageSize<=0){
            return toReturn;
        }
        if (pageNumber<0){
            return toReturn;
        }
        if (offset>=length){
            return toReturn;
        }

        uint endIndex = length;
        if (length>=offset){
            endIndex = length - offset;
        }
        //  = max(length - offset, 0);
        uint startIndex = 0;
        if (endIndex>=pageSize){
            startIndex = endIndex - pageSize;
        }
        // startIndex = max(endIndex - pageSize, 0);
        address[] memory ans = new address[](endIndex - startIndex);
        for (uint i = 0; i<ans.length; i++){
            ans[i] = recieved[endIndex-i-1];
        }
        return ans;
    }
}


contract AccountManager {
    mapping(address => MailAccount) accounts;
    mapping(address => MailObj) mails;
    mapping(address => bool) visited;
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
    function getSentMailBasic(uint pageSize, uint pageNumber) public view returns(MailObj.MailBasic[] memory){
        address addr = msg.sender;
        require(address(accounts[addr])!=address(0), "instance not found at given address");
        address[] memory mailAddresses = accounts[addr].getSentMails(pageSize, pageNumber);
        MailObj.MailBasic[] memory mailArray = new MailObj.MailBasic[](mailAddresses.length);
        for (uint i = 0; i<mailAddresses.length; i++){
            mailArray[i] = mails[mailAddresses[i]].getMailBasic();
        }
        return mailArray;
    }
    //pagination to be done
    function getRecievedMailBasic(uint pageSize, uint pageNumber) public view returns(MailObj.MailBasic[] memory){
        address addr = msg.sender;
        require(address(accounts[addr])!=address(0), "instance not found at given address");
        address[] memory mailAddresses = accounts[addr].getRecievedMails(pageSize, pageNumber);
        MailObj.MailBasic[] memory mailArray = new MailObj.MailBasic[](mailAddresses.length);
        for (uint i = 0; i<mailAddresses.length; i++){
            mailArray[i] = mails[mailAddresses[i]].getMailBasic();
        }
        return mailArray;
    }
    function getRecievedMailLength() public view returns (uint){
        address sender = msg.sender;
        require(address(accounts[sender])!=address(0), "Sender not found");
        return accounts[sender].getRecievedLength();
    }

    function getSentMailLength() public view returns (uint){
        address sender = msg.sender;
        require(address(accounts[sender])!=address(0), "Sender not found");
        return accounts[sender].getSentLength();
    }
    function getSentMailAddresses(uint pageSize, uint pageNumber) public view returns(address[] memory){
        address sender = msg.sender;
        require(address(accounts[sender])!=address(0), "Sender not found");
        return accounts[sender].getSentMails(pageSize, pageNumber);
    }

    // function getSentDummy(uint pageSize, uint pageNumber) public view returns(uint[] memory){
    //     address sender = msg.sender;
    //     require(address(accounts[sender])!=address(0), "Sender not found");
    //     return accounts[sender].dummy(pageSize, pageNumber);
    // }

    function getRecievedMailAddresses(uint pageSize, uint pageNumber) public view returns(address[] memory){
        address sender = msg.sender;
        require(address(accounts[sender])!=address(0), "Sender not found");
        return accounts[sender].getRecievedMails(pageSize, pageNumber);
    }

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
            if (!visited[to[i]]){
                visited[to[i]] = true;
                accounts[to[i]].addRecievedMail(address(mail));
            }
        }
        for (uint i = 0; i<cc.length; i++){
            if (!visited[cc[i]]){
                visited[cc[i]] = true;
                accounts[cc[i]].addRecievedMail(address(mail));
            }
        }
        for (uint i = 0; i<bcc.length; i++){
            if (!visited[bcc[i]]){
                visited[bcc[i]] = true;
                accounts[bcc[i]].addRecievedMail(address(mail));
            }
        }

        //resetting all map values to false
        for (uint i = 0; i<to.length; i++){
            visited[to[i]] = false;
        }
        for (uint i = 0; i<cc.length; i++){
            visited[cc[i]] = false;
        }
        for (uint i = 0; i<bcc.length; i++){
            visited[bcc[i]] = false;
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