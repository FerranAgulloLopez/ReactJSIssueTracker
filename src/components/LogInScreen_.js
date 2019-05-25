import React from 'react';
import _ from 'lodash';

class LogInScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      sessionID: "",
    };
    this.sessionID = null;
  }
  
    componentDidMount() {
      this.generateSessionID();
      this.checkIfBeenRedirected();
    }

    async checkIfBeenRedirected() {
      if (window.location.href.includes("token")) {
        var token = window.location.href.replace(/.+token/g, "");
        localStorage.setItem("session", token);
        console.log("Your token: " + token);
        this.props.loggedIn(token);
      }
    }

  generateSessionID() {
    this.sessionID = Math.trunc(Math.random()*1000000);
    localStorage.setItem("sessionID", this.sessionID);
    this.setState({sessionID: this.sessionID});
  } 

  render() {

    return (
      <div>
        <div>
          <p>Github Name:</p>
          <input onChange={(event) => this.setState({username: event.target.value})} type='text' value={this.state.username}/>
        <a href={`https://blooming-forest-68248.herokuapp.com/sessions/login?sessionId=${this.state.sessionID}&callback=http://localhost:3000/&username=${this.state.username}`}>Login</a>
        </div>
      </div>
    );
  }
  
}

export default LogInScreen;
