import React, { Component } from 'react';
import { useLocation } from "react-router-dom";

function OutboxComponent(props) {
  const location = useLocation();
  console.log("STATE: ");
  console.log(location);

  // const par = useParams();
  // console.log("PARAMS: ");
  // console.log(par);

  return (
    <h4>Outbox coming soon..</h4>
  );
}
// class OutboxComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

//   render() {
//     return (
//       <p>Outbox coming Soon</p>
//     );
//   }
// }

export default OutboxComponent;
