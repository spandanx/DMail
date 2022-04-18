const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Before sending mail", function() {
  let dmail;
  let owner, addr1;
  before(async function () {
    [owner, addr1, _] = await ethers.getSigners();
    const dMail = await ethers.getContractFactory("AccountManager");
    dmail = await dMail.deploy();
    await dmail.deployed();
  });
  it("Should return false as account does not exist", async function () {
    expect(await dmail.checkIfAccountExists()).to.be.false;
  });
  it("Should return true as account exists", async function () {
    await dmail.connect(addr1).accountSignUp();
    expect(await dmail.connect(addr1).checkIfAccountExists()).to.be.true;
  });
  it("checks if default inbox size is zero", async function() {
    await dmail.accountSignUp();
    expect(await dmail.getSentMailLength()).to.equal(0);
  })
});
describe("Send Mail to multiple recipient", function() {
  let dmail;
  let owner, addr1, addr2;

  let subject = "Sample mail";
  let body = "Sample body";
  let timestamp  = 1650169630;
  let typeOfMail = "Normal";
  let referenceMail = "0x0000000000000000000000000000000000000000";
  let to = [];
  let cc = [];
  let bcc = [];

  before(async function () {
    [owner, addr1, addr2, _] = await ethers.getSigners();
    const dMail = await ethers.getContractFactory("AccountManager");
    dmail = await dMail.deploy();
    await dmail.deployed();
    await dmail.accountSignUp();
    await dmail.connect(addr1).accountSignUp();
    await dmail.connect(addr2).accountSignUp();
    to = [addr1.address, addr2.address];

    await dmail.sendMail(subject, body, timestamp,
       typeOfMail, referenceMail,
      to, cc, bcc);
  });
  it("checks if count of recieved mail of recipient is 1", async function () {
    expect(await dmail.connect(addr2).getRecievedMailLength()).to.equal(1);
  });
  it("checks if count of sent mail of sender is 1", async function () {
    expect(await dmail.getSentMailLength()).to.equal(1);
  });
  it("checks if subject of recieved mail of recipient is same as the subject of sent mail of sender", async function () {
    let pageSize = 1;
    let pageNumber = 0;
    let sentMails = await dmail.getSentMailBasic(pageSize, pageNumber);
    let recievedMails = await dmail.connect(addr2).getRecievedMailBasic(pageSize, pageNumber);
    expect(sentMails[0].subject).to.equal(subject);
    expect(recievedMails[0].subject).to.equal(subject);
  });
});