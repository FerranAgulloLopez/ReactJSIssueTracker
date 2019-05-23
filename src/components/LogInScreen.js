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
      //this.debugLoginWithToken(); // Comentar esto si se quere probar el Login Page
      this.generateSessionID();
      this.checkIfBeenRedirected();
    }

    checkIfBeenRedirected() {

    }

  debugLoginWithToken() {
    var token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiSm9hbiBQYXN0b3IiLCJleHAiOjE1ODUzNzI0MTJ9.EtleRYQquUjdcKNUdsm-WxYP0iV3X9-6gS7Mv9dZjtU";
    localStorage.setItem("session", token);
    this.props.loggedIn(token);
  }

  generateSessionID() {
    this.sessionID = Math.trunc(Math.random()*10000);
    localStorage.setItem("sessionID", this.sessionID);
    this.setState({sessionID: this.sessionID});
  } 

  render() {

    return (
      <div>
        <div>
          <p>Github Username:</p>
          <input onChange={(event) => this.setState({username: event.target.value})} type='text' value={this.state.username}/>
        <a href={`https://blooming-forest-68248.herokuapp.com/sessions/login?sessionId=${this.state.sessionID}&callback=http://localhost:3000/&username${this.state.username}`}>Login</a>
        </div>
      </div>
    );
  }
  
}

export default LogInScreen;

//{this.renderRedirect()}
//<Redirect to={`https://blooming-forest-68248.herokuapp.com/sessions/login?sessionId=23543456&callback=http://localhost:3000/&username=joan3pastor`} />

/*
para guardar el token: 

  localStorage.setItem("session", token);
  this.props.loggedIn(token);

*/
