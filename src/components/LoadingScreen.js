import React from 'react';
import _ from 'lodash';

class LoadingScreen extends React.Component {

    componentDidMount() {
        this.getLocalStorageSession();
    }

    async getLocalStorageSession() {
        var session = await localStorage.getItem("session");
        var username = await localStorage.getItem("username");
        if (_.isNull(session)) this.props.notLoggedIn();
        else {
          // Validate token
          // if (valid)
            this.props.loggedIn(session, username);
          // else
          //   this.props.notLoggedIn();
        }
    }

    render() {
      return (<div>Loading...</div>);
    }
    
  }
  
  export default LoadingScreen;
