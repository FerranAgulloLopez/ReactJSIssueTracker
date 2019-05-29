import React from 'react';
import '../../../styles/App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ApiRequest } from '../../util/api_requests'


class IssueForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            token: null,
            title: props.title,
            description: props.description,
            assignee: this.props.username,
            status: props.status,
            type: props.type,
            priority: props.priority,
            update: props.update,
            errorTitle: false,
            errorDescription: false,
            users: null
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.errorTitleMessage = 'The title field is required'
        this.errorDescriptionMessage = 'The description field is required'
    }

    handleSubmit() {
           if (this.checkValues()) {
               let url = 'issues'
               if (this.state.update) url +="?id="+ window.location.href.replace(/.+\//g, "");
               alert(url);
               let method = 'POST'
               if (this.state.update) method = 'PATCH'
               const state = this.state
               const data = {
                'title': this.state.title,
                'description': this.state.description,
                'assigne': this.state.assignee,
                'status': this.state.status,
                'tipus': this.state.type,
                'priority': this.state.priority
               }
               ApiRequest(url,method,data,this.handleResponse.bind(this),this.props.token)
           }
    }

    handleUsersResponse(json,url) {
        let usersName = []
        for (let user of json) {
            usersName.push(user.username)
        }
        this.setState({users: usersName})
    }

    returnUsersEnum() {
        let usersNames = this.state.users
        if (usersNames == null) {
            const url = 'users'
            const method = 'GET'
            ApiRequest(url,method,null,this.handleUsersResponse.bind(this),this.props.token)
            usersNames = []
        }
        return (
            <select name="assignee" value={this.state.assignee} onChange={this.handleChange}>
                {usersNames.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
        )
    }

    checkValues() {
        let errorTitle = false
        let errorDescription = false
        if (this.state.title == null || this.state.title === '') {
            errorTitle = true
        }
        if (this.state.description == null || this.state.description === '') {
            errorDescription = true
        }
        if (errorTitle || errorDescription) this.setState({errorTitle: errorTitle, errorDescription: errorDescription});
        return !(errorTitle || errorDescription)
    }

    checkError(type) {
        if (type === 'title' && this.state.errorTitle === true) {
            return (
                <div style={{color: 'red'}}>
                    <label>
                        {this.errorTitleMessage}
                    </label>
                </div>
            )
        } else {
            if (type === 'description' && this.state.errorDescription === true) {
                return (
                    <div>
                        <label style={{color: 'red'}}>
                            {this.errorDescriptionMessage}
                        </label>
                    </div>
                )
            }
        }
    }

    handleResponse() {
        window.location.href = "/AllIssues"
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
      };

   render() {
      return (

         <div className="form-group">
          <div>
              <label style={{fontSize: '17px'}}>
                  Title
              </label>
          </div>
          <input
             name="title"
             type="text_field"
             className="form-control"
             value={this.state.title}
             onChange={this.handleChange} />
          {this.checkError('title')}

         <br />
         <div>
               <label style={{fontSize: '17px'}}>
                   Description
               </label>
         </div>
         <input
            name="description"
            type="text_area"
            className="form-control"
            value={this.state.description}
            onChange={this.handleChange} />
         {this.checkError('description')}

         <br />
         <br />
         <table style={{width: '50%'}}>
         <tbody>
            <tr>
                <th></th>
                <th></th>
            </tr>
            <tr>
                <td>
                    <label style={{fontSize: '17px'}}>
                        Assignee
                    </label>
                </td>
                <td>
                    {this.returnUsersEnum()}
                </td>
            </tr>
            <br />
            <tr>
                <td>
                    <label style={{fontSize: '17px'}}>
                        Status
                    </label>
                </td>
                <td>
                    <select name="status" value={this.state.status} onChange={this.handleChange}>
                        <option value="NEW">NEW</option>
                        <option value="DUPLICATE">DUPLICATE</option>
                        <option value="RESOLVED">RESOLVED</option>
                        <option value="INVALID">INVALID</option>
                        <option value="ON HOLD">INVALID</option>
                    </select>
                </td>
            </tr>
            <br />
            <tr>
                <td>
                    <label style={{fontSize: '17px'}}>
                        Type
                    </label>
                </td>
                <td>
                    <select name="type" value={this.state.type} onChange={this.handleChange}>
                        <option value="BUG">BUG</option>
                        <option value="ENHANCEMENT">ENHANCEMENT</option>
                        <option value="PROPOSAL">PROPOSAL</option>
                        <option value="TASK">TASK</option>
                    </select>
                </td>
            </tr>
            <br />
            <tr>
                <td>
                    <label style={{fontSize: '17px'}}>
                        Priority
                    </label>
                </td>
                <td>
                    <select name="priority" value={this.state.priority} onChange={this.handleChange}>
                        <option value="MAJOR">MAJOR</option>
                        <option value="TRIVIAL">TRIVIAL</option>
                        <option value="MINOR">MINOR</option>
                        <option value="CRITICAL">CRITICAL</option>
                        <option value="BLOCKER">BLOCKER</option>
                    </select>
                </td>
            </tr>
         </tbody>
         </table>

         <br />
         <div className="row" style={{marginTop: '10px', marginLeft: '180px', marginRight: '200px'}}>
             <div className="col-md-6" style={{}}>
               <input type="submit" value="Submit" onClick={this.handleSubmit} className="btn btn-primary" style={{color: 'white', borderColor: 'black', backgroundColor: 'black'}}/>
             </div>
             <div className="col-md-2 offset-md-4" style={{}}>
               <Link to="/AllIssues"><input type="submit" value="Back" className="btn btn-primary" style={{color: 'white', borderColor: 'black', backgroundColor: 'black'}}/></Link>
             </div>
         </div>
        </div>
      );
   }
}

export default IssueForm;