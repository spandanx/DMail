import React, {useState, useEffect} from 'react'
import web3 from '../web3';
import { useNavigate } from "react-router-dom";
import AccountManager from '../AccountManager';
import {BsCaretRightFill} from "react-icons/bs";

const Login = () => {

    const navigate = useNavigate();

    const [currentAddress, setCurrentAddress] = useState('');
    const [validAccount, setValidAccount] = useState(false);

    const getAccount = async() => {
        let accounts = await web3.eth.getAccounts();
        console.log("accounts");
        console.log(accounts);
        setCurrentAddress(accounts[0]);
        checkIfExists(accounts[0]);
    }

    const checkIfExists = async(account) => {
        let response = await AccountManager.methods.checkIfAccountExists().call({
            from: account
        });
        console.log("checkIfExists");
        console.log(response);
        setValidAccount(response);
    }

    useEffect(() => {
        sessionStorage.removeItem("activeTab");
        getAccount();
        // setCurrentAddress(window.ethereum.selectedAddress);
        // console.log("window.ethereum.selectedAddress changed");
        // console.log(window.ethereum.selectedAddress);

    });

    // web3.eth.getAccounts(accounts => {
    //     setCurrentAddress(accounts);
    //     console.log(accounts);
    //     console.log(window.ethereum.selectedAddress);
    // });

    console.log("Login getting called");
    // if (!window.ethereum){
    //     return (
    //         <div className='mx-5'>
    //             You have been logged out.
    //         </div>
    //     );
    // }
    // else{
    //     return (
    //         <div className='mx-5'>
    //             You are logged in.
    //         </div>
    //     );
    // }
    const signUp = async() => {
        await AccountManager.methods.accountSignUp().send({
            from: currentAddress
        });
        checkIfExists(currentAddress);
    }

    const goToMail = () => {
        navigate("/mail/inbox");
    }

    return (
            <div>
                {currentAddress && validAccount &&
                    <>
                    <div class = "p-12 d-flex justify-content-center mx-5 my-5">
                        <span class="py-1 px-1">Connected with </span>
                        <h4 class="px-1">{currentAddress}</h4>
                    </div>
                    <div class = "p-12 d-flex justify-content-center">
                        <button class="btn btn-sm btn-primary mx-1" data-original-title="" title="" onClick={()=>(goToMail())}> Go to Inbox <BsCaretRightFill/></button>
                    </div>
                    </>
                    }
                {currentAddress && !validAccount &&
                    <>
                    <div class = "p-12 d-flex justify-content-center mx-5 my-5">
                        <span class="py-1 px-1">You do not have an account </span>
                    </div>
                    <div class = "p-12 d-flex justify-content-center">
                        <button class="btn btn-sm btn-primary mx-1" data-original-title="" title="" onClick={()=>(signUp())}> Sign Up <BsCaretRightFill/></button>
                    </div>
                    </>
                    }
                {!currentAddress && 
                    <h4>You have been logged out.</h4>
                }
            </div>
    );
//   return (
//     <div>Login</div>
//   )
}

export default Login