import React from 'react';
import { Nav, Footer, Metadata } from '../util/html_objects'
import axios from "axios";
import {host} from "../../externalLinks/apiserver"; 
import _ from "lodash";


class ShowIssue extends React.Component {
  
    constructor(props) {
    super(props);
    this.state = {
        issue: null,
        value:'',
        comments: [],
        userCommentActual: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.postComment();
        event.preventDefault();
    }

    async postComment() {
        var resp = await axios({
            method: 'post',
            url: host+"issues/"+"2"+"/comments",
            params: {}, 
            data: {
                "text":this.state.value
            }, 
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                Accept: 'application/json',
                "Content-Type": 'application/json'        
            },
        });
        var data = resp.data;
        this.setState({issue: data});
    }

    componentDidMount() {
        this.getComments();
        this.getIssue();
    }

  async getIssue() {
    var resp = await axios({
      method: 'get',
      url: host+"issues/"+"2",
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

  async getComments() {
      var resp = await axios({
          method: 'get',
          url: host+"issues/"+"2"+"/comments",
          params: {}, 
          data: {}, 
          headers: {
              Authorization: 'Bearer ' + this.props.token,
              Accept: 'application/json',
              "Content-Type": 'application/json'        
          },
      });
      var data = resp.data;
      this.setState({comments: data});
  }
   
  async downvote(){
      console.log("DOWNVOTE");
          var resp = await axios({
          method: 'post',
          url: host+"issues/"+"2"+"/unvote",
          params: {}, 
          data: {}, 
          headers: {
              Authorization: 'Bearer ' + this.props.token,
              Accept: 'application/json',
              "Content-Type": 'application/json'        
          },
      });
  }

  async vote(){
      console.log("VOTE");
      var resp = await axios({
          method: 'post',
          url: host+"issues/"+"2"+"/vote",
          params: {}, 
          data: {}, 
          headers: {
              Authorization: 'Bearer ' + this.props.token,
              Accept: 'application/json',
              "Content-Type": 'application/json'        
          },
      });
  }

  async unfollow(){
      var resp = await axios({
          method: 'post',
          url: host+"issues/"+"2"+"/unfollow",
          params: {}, 
          data: {}, 
          headers: {
              Authorization: 'Bearer ' + this.props.token,
              Accept: 'application/json',
              "Content-Type": 'application/json'        
          },
      });
  }

  async follow(){
      var resp = await axios({
          method: 'post',
          url: host+"issues/"+"2"+"/follow",
          params: {}, 
          data: {}, 
          headers: {
              Authorization: 'Bearer ' + this.props.token,
              Accept: 'application/json',
              "Content-Type": 'application/json'        
          },
      });
  }

  async getUserCommentActual(user){
        var resp = await axios({
            method: 'get',
            url: host+user,
            params: {},
            data: {},
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
      });
      var data = resp.data;
      this.setState({userCommentActual: data});
  }

  llamarAGetUserCommentActual(user){
    this.getUserCommentActual(user);
  }

  showComments(){
      return (
          <div className="container">
              {this.state.comments.map(comment => (
              <div className="row">
              {this.llamarAGetUserCommentActual(comment._links.creator.href)}
                <div className="col-sm-1">
                    <div className="thumbnail">
                        {this.userCommentActual? <img className="img-responsive user-photo" src={this.state.userCommentActual.avatar_url}/>:null}
                    </div>
                </div>
               </div>

              ))}
          </div>
      )

      {/*<% if @issue.present? %>
                                <div class="container">
                                    <% comment=@issue.comment %>
                                    <% for item in comment %>
                                    <div class="row">
                                        <div class="col-sm-1">
                                            <div class="thumbnail">
                                                <img class="img-responsive user-photo" src='<%= item.user.avatar_url %>'>
                                            </div><!-- /thumbnail --
                                        </div><!-- /col-sm-1 --
                                        <div class="col-sm-5">
                                            <div class="panel panel-default" style="width:200%">
                                                <div class="panel-heading">
                                                    <strong><%= item.user.username %></strong> <span class="text-muted"><%= item.created_at %></span>
                                                    <% if !current_user.blank? %>
                                                    <% if current_user.username == item.user.username %>
                                                    <%= link_to 'Edit', request.original_url+ '/comments/' + item.id.to_s, :method => :post, class: "btn btn-primary", style: "color:black;border-color:#ffffff;background-color:#ffffff;top:6px;right:65px;position:absolute" %>
                                                    <%= link_to 'Delete', request.original_url + '/comments/' + item.id.to_s, :method => :delete, class: "btn btn-primary", style: "color:black;border-color:#ffffff;background-color:#ffffff;top:6px;right:10px;position:absolute" %>
                                                    <% end %>
                                                    <% end %>
                                                </div>
                                                <div class="panel-body">
                                                    <%=item.text%>
                                                    <hr>
                                                    <% if (!item.post.blank?) %>
                                                    <% for files in item.post%>
                                                    <a href="<%= getHostFromIssues+files.attachment_identifier.url  %>" download> Click here to download the attachment</a>
                                                    <%  end%>
                                                    <%  end%>
                                                </div><!-- /panel-body --
                                            </div><!-- /panel panel-default --
                                        </div><!-- /col-sm-5 --
                                    </div><!-- /row --
                                    <%end%>
                                </div><!-- /container --
                                <% end %>*/}
  }


  
  render() {
      if (_.isNull(this.state.issue)) {
          return (<div>Loading...</div>);
      }
        return (
            <div>
            {/*console.log(this.state.issue.voted_by_user)*/}
            {/*console.log(this.state.issue.followed_by_user)*/}
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css" />
                <link rel="stylesheet" href="https://static.pingendo.com/bootstrap/bootstrap-4.3.1.css" />
                <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
                
            <div className="py-5" style={{ marginBottom: '40px' }}>
                <div className="container">
                    <div className="row" style={{}}>
                        <div className="col-md-1" style={{}} />
                        <div className="col-md-8 offset-md-1" style={{}}>
                            <div className="card bg-light mb-3">
                                <div className="card-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: '17px', fontWeight: 'bold' }}>
                                
                                    <h>Issue</h>
                                    {
                                      this.props.username? <div>
                                      {
                                          this.state.issue.voted_by_user? <button onClick={this.downvote.bind(this)}>Downvote</button>:<button onClick={this.vote.bind(this)}>Vote</button>
                                      }
                                      <div>
                                      {
                                          this.state.issue.followed_by_user? <button onClick={this.unfollow.bind(this)}>Unfollow</button>:<button onClick={this.follow.bind(this)}>Follow</button>
                                      }
                                      </div>
                                      </div>:null
                                    }
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Title</h5>
                                    {this.state.issue.title}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Description</h5>
                                    {this.state.issue.description}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Created at</h5>
                                    {this.state.issue.created}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Assignee</h5>
                                    {this.state.issue.stringassign}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Updated at</h5>
                                    {this.state.issue.updated}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Type</h5>
                                    {this.state.issue.tipus}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Priority</h5>
                                    {this.state.issue.priority}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Status</h5>
                                    {this.state.issue.status}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Votes</h5>
                                    {this.state.issue.votes}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Followed by</h5>
                                    {/*<% watch=@issue.watch
                            cont = 0
                            @coma = ", ".html_safe
                            for item in watch
                            user=item.user %>
                            <%= if cont != 0
                            @coma end%>
                            <%= user.username%>
                            <% cont = cont + 1
                            end%>*/}
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: '25px' }}>
                                <div className="col-md-6" style={{}}>
                                    {
                                        (this.props.username && this.state.issue.username == this.props.username)? <div>
                                            <button onClick={this.edit.bind(this)}>Edit</button>
                                            <button onClick={this.delete.bind(this)}>Delete</button>
                                        </div>:null
                                    }
                                    
                                </div>
                                <div className="col-md-2 offset-md-4" style={{}}>
                                    <button onClick={this.back}>Back</button>
                                </div>
                            </div>
                                    {
                                        this.props.username? <form onSubmit={this.handleSubmit}>
                                        <textarea type="text" value={this.state.value} onChange={this.handleChange} />
                                        <input type="submit" value="Create" />
                                        </form>:null
                                    }
                            <div>
                                <hr />

                            {this.showComments()}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer" style={{ color: 'white', paddingTop: '25px', paddingBottom: '20px' }}>
                    <p style={{ textAlign: 'center' }}>�2019 IssueTracker For Student Purposes</p>
                </div>
            </div>
      </div >
        );
    }

}

export default ShowIssue;