import React, { Component } from 'react';
// import { useWeb3React } from "@web3-react/core"
import {Link, useNavigate} from "react-router-dom";

const TopNavBar =() => {
  
  const navigate = useNavigate();
// class TopNavBar extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   };
  // }

  window.ethereum.on('accountsChanged', function (accounts) {
    console.log("Account Changed");
    console.log(accounts);
    navigate("/login");
  });

  // window.ethereum.on('networkChanged', function (networkId) {
  //   console.log("Network Changed");
  //   console.log(networkId);
  // });

  const disconnect = async() => {
    console.log("Clicked on disconnect");
    // window.ethereum.disconnect();
    // try {
    //   deactivate();
    // } catch (ex) {
    //   console.log(ex)
    // }
  }

  // render() {
    return (
      <Link to="/" className="text-decoration-none">
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand">DMail</a>
                {/* <span className="navbar-brand">{web3.eth.accounts[0]}</span> */}
                {/* <a href="/login" className="navbar-brand">Logout</a> */}
            </div>
        </nav>
      </Link>
    );
  // }
}

export default TopNavBar;
