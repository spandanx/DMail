import React, {useEffect, useState} from 'react'
// import 'react-notifications/lib/notifications.css';
// import {NotificationContainer, NotificationManager} from 'react-notifications';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
//   let flag = false;
//   let counter = 0;
const Notification = (props) => {

    // const [alerts, setAlert] = useState(props.func);
    // setItems();
    // check();
    // checkKeys();

    // const [notification, setNotification] = useState(["messsage1"]);

    // useEffect(() => {
    //     console.log("UseEffect Called as counter changed");
    //     setNotification(getArray());
    // },[counter]);

    // const getArray = () => {
    //     let arr = [];
    //     for (var i = 0; i < localStorage.length; i++){
    //         if (sessionStorage.key(i).substring(0,12) == 'notification') {
    //             arr.push(sessionStorage.key(i));
    //         }
    //     }
    //     // setNotification(arr);
    //     return arr;
    // }
    
    // const addItem = async(key, value, time) => {
    //     console.log("Key added");
    //     counter = (counter+1)%10;
    //     setNotification(getArray());
    //     // getArray();
    //     sessionStorage.setItem(key, value);
    //     await sleep(time);
    //     sessionStorage.removeItem(key);
    //     console.log("Key removed");
    //     counter = (counter+1)%10;
    //     setNotification(getArray());
    //     // getArray();
    // }

    // const custom = async() => {
    //     console.log("Called Custom");
    //     addItem("notification1", "message1", 5000);
    //     // await sleep(10000);
    //     addItem("notification2", "message2", 5000);
    // }


    // addItem("notification1", "message1", 5000);
    // addItem("notification2", "message2", 5000);
    // let notifications = getArray();//JSON.parse(localStorage.getItem("notifications"));
    // let notifications = ;
    // if (!flag){
    //     custom();
    //     flag = true;
    // }
    const callNotification = async() => {
      if (props.func){
        await props.func();
      }
    }
    callNotification();
  return (
    <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
  )
}

export default Notification