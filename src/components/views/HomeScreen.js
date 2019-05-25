import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AllIssues from './AllIssues';
import CreateIssue from './CreateIssue';
import LogOut from './LogOut';

class HomeScreen extends React.Component {

  // !!!!!!!!!!!!!!!!!!! EL TOKEN SE ENCUENTRA EN this.props.token !!!!!!!!!!!!!!!!!!!!!!!!

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (window.location.href.includes("token") || window.location.href == "https://"+window.location.host+"/" || window.location.href == "http://"+window.location.host+"/") {
      window.location.href = "/AllIssues";
    }
  }

  render() {
    //alert(this.props.token);
    return (
      <Router>
      <div>
        <Route path="/AllIssues" component={ (props) => <AllIssues {...props} token={this.props.token} /> } />
        <Route path="/CreateIssue" component= { (props) => <CreateIssue {...props} token={this.props.token} /> } />
        <Route path="/issue/" component= { (props) => <CreateIssue {...props} token={this.props.token} /> } />
        <Route path="/logout/" component= { (props) => <LogOut {...props} logOut={this.props.logOut} /> } />
      </div>
    </Router>
    );
  }
  
}
  
  export default HomeScreen;
