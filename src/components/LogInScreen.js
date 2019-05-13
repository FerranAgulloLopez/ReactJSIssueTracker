import React from 'react';
import _ from 'lodash';
import axios from 'axios'; 

class LogInScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      correo: "",
    };
  }

  render() {
    return (
      <div>Login Screen</div>
    );
  }
  
}
  
export default LogInScreen;