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
      if (window.location.href.includes("token=")) {
        var token = window.location.href.replace(/.+token=/g, "");
        //alert("Your token: " + token);
        localStorage.setItem("session", token);
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

          <div className="py-5 text-center" style={{backgroundImage: 'url("https://static.pingendo.com/cover-bubble-dark.svg")', backgroundSize: 'cover', position: 'fixed', bottom: 0, left: 0, right: 0, top: 0}}>
            <div className="container" style={{paddingTop:"300px"}}>
                  <h1 style={{textAlign:"center"}}>Welcome to our Issue Tracker!</h1>
                  <h3 style={{textAlign:"center"}}><a style={{color:"#fff", padding:"10px", backgroundColor:"#307bff", width:"50px", borderRadius:"5px"}} href={`https://blooming-forest-68248.herokuapp.com/sessions/login?sessionId=${this.state.sessionID}&callback=http://localhost:3000/`}>Login</a></h3>
            </div>
          </div>

    );
  }
  
}

export default LogInScreen;
