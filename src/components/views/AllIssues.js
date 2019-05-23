import React from 'react';
import { Nav, Footer } from '../util/html_objects'
import { ApiRequest } from '../util/api_requests'
import '../../styles/App.css';

class AllIssues extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          issues_json: null,
          last_url: null,
          filters: [],
          search: true
        };
    }

   render() {
      if (this.state.search) {this.searchIssues();}
      let issues_html = []
      if (this.state.issues_json != null) {
        for (let issue of this.state.issues_json) {
            issues_html.push(this.printIssue(issue))
        }
      }
      return (
        <div>
        {this.returnMetadata()}
        <Nav />
        <div style={{margin: 'auto', marginTop: '60px', width: '1200px', maxWidth: '90%', marginBottom: '40px'}}>
          <p>token</p>
          <h1 style={{marginBottom: '30px'}}>Issues</h1>
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
                  {this.showTableTitles('Assignee','ordered_by_user')}
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
            <tbody>{issues_html}</tbody>
          </table>
          <br />
          <div style={{display: 'flex', flexDirection: 'row', paddingBottom: '100px'}}>
            <div style={{marginLeft: '10px'}}>
              <p style={{color: 'darkred'}}>You need to be logged in to create a new issue</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      );
   }

   handleResponse(response,url) {
       this.setState({
           issues_json: response,
           last_url: url,
           search: false
       });
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
       ApiRequest(url,method,data,this.handleResponse.bind(this))
   }

   printIssue(json) {
       let follow = 'Following'
       if (!json.followed_by_user) follow = 'Not following'
       return (
           <tr>
             <th scope="row">{json.title}</th>
             <td>{json.tipus}</td>
             <td>{json.priority}</td>
             <td>{json.status}</td>
             <td>{json.votes}</td>
             <td>name</td>
             <td>{json.created_at}</td>
             <td>{json.updated_at}</td>
             <td>follow</td>
           </tr>
       )
   }

   showTableTitles(word,order) {
     let url = this.state.last_url
     if (url != null && url.includes(order)) {
        return (
            <div>
                <button className='transparent-button' onClick={() => this.addFilter(order)}>{word}</button>
                <img src="https://image.flaticon.com/icons/svg/32/32195.svg" style={{height: '15px'}} />
            </div>
        )
     } else {
        return (
            <div>
                <button className='transparent-button' onClick={() => this.addFilter(order)}>{word}</button>
            </div>
        )
     }
   }

   addFilter(filter) {
    if (!this.state.filters.includes(filter)) {
        //let new_filters = this.state.filters.slice()
        let new_filters = []
        new_filters.push(filter)
        this.setState({
            filters: new_filters,
            search: true
        })
    } else {
        //let new_filters = this.state.filters.slice()
        let new_filters = []
        this.setState({
            filters: new_filters,
            search: true
        })
    }
   }

   returnMetadata() {
    return (
        <div>
            <meta charSet='utf-8'/>
            <title>'Issues'</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css" />
            <link rel="stylesheet" href="https://static.pingendo.com/bootstrap/bootstrap-4.3.1.css" />
        </div>
    )
   }


  }

 export default AllIssues;