import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

// function getSessionStorageOrDefault(key, defaultValue) {
//     const stored = sessionStorage.getItem(key);
//     if (!stored) {
//       return defaultValue;
//     }
//     return JSON.parse(stored);
//   }

function NavigateButtonComponent(props) {

    const navigate = useNavigate();
    

    // const [activeTab, setActiveTab] = React.useState(getSessionStorageOrDefault('activeTab', 0));
    const [activeTab, setActiveTab] = React.useState(-1);

    // const getActiveTab = () => {
    //     console.log("In session:");
    //     console.log(sessionStorage.getItem("activeTab"));
    //     return sessionStorage.getItem("activeTab");
    // }

    const goToPage = (path, index) => {
        // sessionStorage.setItem("activeTab", index);
        // setActiveTab(index);
        navigate(path, {state: {mno:"abc"}});
    }

  return (
    <button onClick={() => goToPage(props.path, props.index)} class={"nav-link " + (activeTab===props.index ? 'active' : '')} id="v-pills-Inbox-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Inbox" type="button" role="tab" aria-controls="v-pills-Inbox" aria-selected="true">{props.text}</button>
  )
}

export default NavigateButtonComponent