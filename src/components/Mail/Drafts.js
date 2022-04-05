import React, { Component } from 'react';
// import {NotificationContainer, NotificationManager} from 'react-notifications';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notification from '../Notification';

const DraftsComponent = () => {
// class DraftsComponent extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   };
  // }

  const notify = () => {
    // let text = 
    toast.info('✔️ Wow so easy!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    // NotificationManager.success('Success message', 'Title here')
  }

  // render() {
    sessionStorage.setItem("activeTab", 3);
    return (
      // <h4>Outbox coming soon..</h4>
      <>
      {/* <button className='btn btn-success'
        onClick={()=>notify()}>Click
      </button> */}
      <button className='btn btn-success'
        onClick={() => (<Notification func={notify()}/>)}>Click
      </button>
      {/* <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        /> */}
      </>
    );
  }
// }

export default DraftsComponent;
