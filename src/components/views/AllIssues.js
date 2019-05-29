import React from 'react';
import { Nav, Footer, Metadata } from '../util/html_objects'
import { ApiRequest } from '../util/api_requests'
import '../../styles/App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class AllIssues extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          issues_json: [],
          last_url: null,
          filters: [],
          search: true,
          images: new Map(),
          showToken: false
        };
        this.clickToken = this.clickToken.bind(this)
        this.deleteFilters = this.deleteFilters.bind(this)
    }

   render() {
      if (this.state.search) {this.searchIssues();}
      let issues_html = []
      for (let issue of this.state.issues_json) {
        issues_html.push(this.printIssue(issue))
      }
      return (
        <div>
        <Metadata />
        <title>Issues</title>
        <div style={{margin: 'auto', marginTop: '60px', width: '1200px', maxWidth: '90%', marginBottom: '40px'}}>
          <h1 style={{marginBottom: '30px'}}>Issues</h1>
          <div>
              <button onClick={this.clickToken} className="btn btn-primary" style={{color: 'black', borderColor: '#D3D3D3', backgroundColor: '#D3D3D3', marginBottom: '10px'}}>Generate API Token</button>
              {this.generateToken()}
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                  {this.showTableTitles('Title','ordered_by_title')}
                </th>
                <th style={{width: '60px'}}>
                  {this.showTableTitles('T','ordered_by_tipus')}
                </th>
                <th style={{width: '60px'}}>
                  {this.showTableTitles('P','ordered_by_priority')}
                </th>
                <th style={{width: '60px'}}>
                  {this.showTableTitles('Status','ordered_by_status')}
                </th>
                <th style={{width: '85px'}}>
                  {this.showTableTitles('Votes','ordered_by_votes')}
                </th>
                <th style={{width: '160px'}}>
                  {this.showTableTitles('Assignee','ordered_by_assignee')}
                </th>
                <th style={{width: '120px'}}>
                  {this.showTableTitles('Created','ordered_by_created')}
                </th>
                <th style={{width: '120px'}}>
                  {this.showTableTitles('Updated','ordered_by_updated')}
                </th>
                <th style={{width: '120px'}}>
                  {this.showTableTitles('Watching','ordered_by_follow')}
                </th>
              </tr>
            </thead>
            <tbody>
                {issues_html}
            </tbody>
          </table>
          <br />
          <div style={{display: 'flex', flexDirection: 'row', paddingBottom: '100px'}}>
              <Link to="/CreateIssue"> <input type="submit" className="btn btn-primary" value="Create new issue" style={{color: 'white', borderColor: 'black', backgroundColor: 'black'}} /> </Link>
              {this.showDeleteFiltersButton()}
          </div>
        </div>
        <Footer />
      </div>
      );
   }

   clickToken() {
        let aux = !this.state.showToken
        this.setState({showToken: aux, search: false})
   }

   showDeleteFiltersButton() {
        if (this.state.filters.length > 0) {
            return (
                <div style={{marginLeft: '10px'}}>
                    <input type="submit" onClick={this.deleteFilters} className="btn btn-primary" value="Delete filters" style={{position: 'absolute', marginBottom: '100px', color: 'white', borderColor: 'black', backgroundColor: 'black'}} />
                </div>
            )
        }
   }

   deleteFilters() {
        this.setState({
            filters: [],
            search: true
        })
   }

   generateToken() {
        if (this.state.showToken) {
            return (
                <div className="card bg-light mb-3">
                    <div className="card-header" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: '17px', fontWeight: 'bold'}}>
                      <strong>API access</strong>
                    </div>
                    <div className="card-body">
                      <p>You can check the operations clicking in this <a href="https://blooming-forest-68248.herokuapp.com/api-docs/index.html">link</a>. Use this generated key to acces the different methods:
                      {' '+this.props.token}
                      </p>
                    </div>
                </div>
            )
        }
   }

   handleResponse(response,url) {
       this.setState({
           issues_json: response,
           last_url: url,
           search: false
       });
   }

   handleUsersResponse(response,url) {
        let images = new Map()
        for (let user of response) {
            let username = user.username
            let image = user.avatar_url
            images.set(username,image)
        }
        this.setState({
            images: images,
            search: false
        })
   }

   searchIssues() {
       let url = 'issues'
       let filters = this.state.filters
       if (filters.length > 0) {
        url += '?' + filters[0]
        if (filters.length > 1) {
            for (let filter of filters) {
                if (!url.includes(filter)) url += '&' + filter
            }
        }
       }
       const method = 'GET'
       const data = null
       ApiRequest(url,method,data,this.handleResponse.bind(this),this.props.token)
       url = 'users'
       ApiRequest(url,method,data,this.handleUsersResponse.bind(this),this.props.token)
   }

   printIssue(issue) {
       let follow = 'Following'
       if (!issue.followed_by_user) follow = 'Not following'
       let assign = issue._links.assign.href.replace('/users/','')
       let image = this.state.images.get(assign)
       let style = {
            color: '#666'
       }
       return (
           <tr>
             <th scope="row"><Link to={`/ShowIssue/${issue.id}`} style={{color: '#444'}}>{issue.title}</Link></th>
                 <td><label className="myLink" onClick={() => this.addFilter('tipus='+issue.tipus)} style={style}>{issue.tipus}</label></td>
                 <td><label className="myLink" onClick={() => this.addFilter('priority='+issue.priority)} style={style}>{issue.priority}</label></td>
                 <td><label className="myLink" onClick={() => this.addFilter('status='+issue.status)} style={style}>{issue.status}</label></td>
                 <td><label style={style}>{issue.votes}</label></td>
                 <td>
                    <div className="has-link">
                    <img src={image} style={{height: '26px', borderRadius: '13px'}} />
                    <label className="myLink" onClick={() => this.addFilter('assign='+assign)} style={style}>{' '+assign}</label>
                    </div>
                 </td>
                 <td><label style={style}>{issue.created}</label></td>
                 <td><label style={style}>{issue.updated}</label></td>
                 <td><label style={style}>{follow}</label></td>
           </tr>
       )
   }

   showTableTitles(word,order) {
   let style = {
        fontFamily: 'verdana',
        fontSize: '120%',
        color: '#585858'
   }
     let url = this.state.last_url
     if (url != null && url.includes(order)) {
        return (
            <div>
                <label className='myLink' onClick={() => this.addFilter(order)} style={style}>{word}</label>
                <img src="https://image.flaticon.com/icons/svg/32/32195.svg" style={{height: '15px'}} />
            </div>
        )
     } else {
        return (
            <div>
                <label className='myLink' onClick={() => this.addFilter(order)} style={style}>{word}</label>
            </div>
        )
     }
   }

   addFilter(filter) {
    let new_filters = this.state.filters
    if (filter.includes('order')) {
        if (new_filters.includes(filter)) {
            new_filters = new_filters.filter(function(el){return el !== filter;});
        } else {
            new_filters = new_filters.filter(function(el){return !el.includes('order');});
            new_filters.push(filter)
        }
    } else {
        new_filters.push(filter)
    }
    this.setState({
            filters: new_filters,
            search: true
    })
   }
  }

 export default AllIssues;