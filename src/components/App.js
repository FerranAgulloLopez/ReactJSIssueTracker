import React from 'react';

import LoadingScreen from "./LoadingScreen";
import HomeScreen from "./views/HomeScreen";
import LogInScreen from "./LogInScreen_";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loggedIn: false,
      sessionToken: null,
      username: null,
    };
  }

  notLoggedInHandler() {
    this.setState({loading: false, loggedIn: false});
  }

  loggedInHandler(session, username) {
    this.setState({loading: false, loggedIn: true, sessionToken: session, username});
  }

  logOut() {
    localStorage.removeItem("session");
    this.setState({loading: false, loggedIn: false});
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingScreen 
          notLoggedIn={this.notLoggedInHandler.bind(this)}
          loggedIn={this.loggedInHandler.bind(this)}/>
      );
    }
    if (this.state.loggedIn) {
      return (
        <HomeScreen 
          token={this.state.sessionToken}
          username={this.state.username}
          logOut={this.logOut.bind(this)}/>
      );
    }
    if (!this.state.loggedIn) {
      return (
        <LogInScreen 
          loggedIn={this.loggedInHandler.bind(this)}/>
      )
    }
  }
}

export default App;
