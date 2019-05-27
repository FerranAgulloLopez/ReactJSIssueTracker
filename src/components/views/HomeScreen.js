import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import _ from "lodash";
import axios from "axios";
import AllIssues from './AllIssues';
import CreateIssue from './CreateIssue';
import LogOut from './LogOut';
import {host} from "../../externalLinks/apiserver"; 
import { Nav} from '../util/html_objects'

class HomeScreen extends React.Component {

  // !!!!!!!!!!!!!!!!!!! EL TOKEN SE ENCUENTRA EN this.props.token !!!!!!!!!!!!!!!!!!!!!!!!

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    if (window.location.href.includes("token") || window.location.href == "https://"+window.location.host+"/" || window.location.href == "http://"+window.location.host+"/") {
      window.location.href = "/AllIssues";
    }
    this.getUser();
  }

  async getUser() {
    var resp = await axios({
      method: 'get',
      url: host+"users/"+this.props.username,
      params: {}, 
      data: {}, 
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        Accept: 'application/json',
        "Content-Type": 'application/json'        
      },
    });
    var data = resp.data;
    this.setState({user: data});
  }

  render() {
    
    console.log("Current token: " + this.props.token);

    
    if (_.isNull(this.state.user)) {
      return (<div>Loading...</div>);
    }

    return (
      <div>
        <Router>
        <Nav user={this.state.user}/>
        <div>
          <Route path="/AllIssues" component={ (props) => <AllIssues {...props} token={this.props.token} /> } />
          <Route path="/CreateIssue" component= { (props) => <CreateIssue {...props} token={this.props.token} username={this.props.username}/> } />
          <Route path="/issue/" component= { (props) => <CreateIssue {...props} token={this.props.token} /> } />
          <Route path="/logout/" component= { (props) => <LogOut {...props} logOut={this.props.logOut} /> } />
        </div>
        </Router>
      </div>
    );
  }
  
}
  
  export default HomeScreen;
