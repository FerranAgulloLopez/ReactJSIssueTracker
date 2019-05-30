import React from 'react';
import { Nav, Footer, Metadata } from '../util/html_objects'
import IssueForm from './form/IssueForm'
import {host} from "../../externalLinks/apiserver"; 
import axios from "axios";
import _ from "lodash";


class CreateIssue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            issue: null,
        };
    }

    componentDidMount() {
        this.getIssue();
    }

    async getIssue() {
        var id = window.location.href.replace(/.+\//g, "");
        this.setState({id});
        var resp = await axios({
            method: 'get',
            url: host+"issues/"+id,
            params: {}, 
            data: {}, 
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                Accept: 'application/json',
                "Content-Type": 'application/json'        
            },
        });
        var data = resp.data;
        this.setState({issue: data});
    }

    render() {

       if (_.isNull(this.state.issue)) {
           return (<div>Loading...</div>);
       }
      return (
        <div>
            <Metadata />
            <div className="py-5" style={{marginTop: '20px'}}>
                <div className="container" style={{marginTop: '1px'}}>
                  <h3 style={{}}><center>New Issue</center></h3>
                  <div className="row">
                    <div className="col-md-1" style={{}} />
                    <div className="col-md-8 offset-md-1" style={{}}>
                      <IssueForm
                        title={this.state.issue.title}
                        description={this.state.issue.description}
                        status={this.state.issue.status}
                        type={this.state.issue.tipus}
                        priority={this.state.issue.priority}
                        update={true}
                        token={this.props.token}
                        username={this.props.username}
                      />
                    </div>
                  </div>
                </div>
              </div>
            <Footer />
        </div>
      );
   }
   }

 export default CreateIssue;