import React from 'react';


class LogOut extends React.Component {

  componentWillMount() {
    this.props.logOut();
    window.location.href = "/";
  }

  componentWillUpdate() {
    this.props.logOut();
    window.location.href = "/";
  }

  render() {
    return (<div/>);
  }
}

 export default LogOut;