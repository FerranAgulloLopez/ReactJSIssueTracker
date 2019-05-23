import React from 'react';

class ShowIssue extends React.Component {

    render() {
        return (
            <div>
                {/*<%= stylesheet_link_tag "mime1" %>
<%= stylesheet_link_tag "mime2" %>*/}
                {/*<%
  if current_user.blank?

  else
    username = current_user.username;
    avatar_url = current_user.avatar_url;
  end
%>*/}
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css" />
                <link rel="stylesheet" href="https://static.pingendo.com/bootstrap/bootstrap-4.3.1.css" />
                <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
                {/* Necesario?
    
    */}
                <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                    <div className="container">
                        <button className="navbar-toggler navbar-toggler-right border-0 p-0" type="button" data-toggle="collapse" data-target="#navbar14">
                            <p align="center" className="navbar-brand mb-0 text-white">
                                <i className="fa d-inline fa-lg fa-stop-circle" /> ISSUE TRACKER
              </p>
                        </button>
                        <div className="collapse navbar-collapse" id="navbar14">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item"> <a className="nav-link" <!--href="<%= getHostFromIssues %>" -->&gt;Issues</a> </li>
              </ul>
                        <p className="d-none d-md-block lead mb-0  text-white"> <i className="fa d-inline fa-lg fa-stop-circle" /> <b> ISSUE TRACKER</b> </p>
                        <ul className="navbar-nav ml-auto">
                            {/*
                    <% if current_user.blank? %>
                    <li class="nav-item"> <a class="nav-link" href='<%= getHostFromIssues + ' sessions/new' %>'>Sign in</a> </li>
                    <% else %>
                    <li class="nav-item"> <a class="nav-link"><%= username %></a> </li>
                    <li class="nav-item"> <img src='<%= avatar_url%>' style="height:36px; border-radius:18px; margin-right:20px;" /> </li>
                    <li class="nav-item"> <a class="nav-link" href='<%= getHostFromIssues + ' sessions/new' %>'>Log Out</a> </li>
                    <% end %>*/}
                        </ul>
                    </div>
          </div>
        </nav>
            <div className="py-5" style={{ marginBottom: '40px' }}>
                <div className="container">
                    <div className="row" style={{}}>
                        <div className="col-md-1" style={{}} />
                        <div className="col-md-8 offset-md-1" style={{}}>
                            <div className="card bg-light mb-3">
                                <div className="card-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: '17px', fontWeight: 'bold' }}>
                                    <h>Issue</h>
                                    {/*-
                            <% if not current_user.blank? %>
                            <div style="display:flex; flex-direction:row; justify-content:space-between;">
                                <% if hasVoted %>
                                <%= link_to 'Downvote', request.original_url + '/unvote', :method => :post, class: "btn btn-primary", style: "color:white;border-color:black;background-color:black" %>
                                <% else %>
                                <%= link_to '+1', request.original_url + '/vote', :method => :post, class: "btn btn-primary", style: "color:white;border-color:black;background-color:black" %>
                                <% end %>
                                <div style="margin-left:10px;">
                                    <% if isFollowing(@issue) %>
                                    <%= link_to 'Unfollow', request.original_url + '/unfollow', :method => :post,class: "btn btn-primary", style: "color:white;border-color:black;background-color:black" %>
                                    <% else %>
                                    <%= link_to 'Follow', request.original_url + '/follow', :method => :post,class: "btn btn-primary", style: "color:white;border-color:black;background-color:black" %>
                                    <% end %>
                                </div>
                            </div>
                            <% end %>*/}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Title</h5>
                                    {/*<%= @issue.title %>*/}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Description</h5>
                                    {/*<%= @issue.description %>*/}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Created at</h5>
                                    {/*<%= @issue.created %>*/}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Assignee</h5>
                                    {/*<%= @issue.stringassign %>*/}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Updated at</h5>
                                    {/*<%= @issue.updated %>*/}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Type</h5>
                                    {/*<%= @issue.tipus %>*/}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Priority</h5>
                                    {/*<%= @issue.priority %>*/}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Status</h5>
                                    {/*<%= @issue.status %>*/}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Votes</h5>
                                    {/*<%= @issue.votes %>*/}
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
                                    {/*
                            <% if not current_user.blank? and @issue.user.username == current_user.username %>
                            <div>
                                <%= link_to 'Edit', edit_issue_path(@issue), class: "btn btn-primary", style: "color:white;border-color:black;background-color:black" %>
                                <%= link_to 'Delete', request.original_url, :method => :delete, class: "btn btn-primary", style: "color:white;border-color:black;background-color:black; margin-left:10px;" %>
                            </div>
                            <% end %>*/}
                                </div>
                                <div className="col-md-2 offset-md-4" style={{}}>
                                    {/*<%= link_to 'Back', issues_path, class: "btn btn-primary", style: "color:white;border-color:black;background-color:black;position: absolute;right: 15px;" %>*/}
                                </div>
                            </div>
                            {/*<% if not current_user.blank? %>
                    <div style="margin-top:20px">
                        <%= render 'form_comment', issue: @issue %>
                    </div>
                    <% end %>*/}
                            <div>
                                <hr />
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer" style={{ color: 'white', paddingTop: '25px', paddingBottom: '20px' }}>
                    <p style={{ textAlign: 'center' }}>©2019 IssueTracker For Student Purposes</p>
                </div>
            </div>
      </div >
        );
    }

}

export default ShowIssue;