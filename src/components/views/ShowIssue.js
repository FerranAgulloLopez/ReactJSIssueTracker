import React from 'react';
import { Nav, Footer, Metadata } from '../util/html_objects'
import axios from "axios";
import {host} from "../../externalLinks/apiserver"; 
import _ from "lodash";
import moment from 'moment';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const FileDownload = require('js-file-download');



class ShowIssue extends React.Component {
  
  constructor(props) {
  super(props);
  this.state = {
    issue: null,
    avatarLoggedUser: this.props.avatar,
    value:'',
    comments: [],
    userCommentActual: null,
    id: null,
    pictureList: [],
    updateComent:{
      open: false,
      idComment: 0,
      index: 0,
    },
    editCommentText:"",
      status:"",
    errorMessage: false
  };
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleUpdateStatus = this.handleUpdateStatus.bind(this);
  }

  componentDidMount() {
    this.asyncCDM();
  }

  async asyncCDM() {
    await this.getIssue();
    await this.getComments();
    await this.createPictureList();
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
          url: host+"issues/"+this.state.id+"/comments",
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

  async getComments() {
      console.log("Getting Comments...");
      var resp = await axios({
          method: 'get',
          url: host+"issues/"+this.state.id+"/comments",
          params: {}, 
          data: {}, 
          headers: {
              Authorization: 'Bearer ' + this.props.token,
              Accept: 'application/json',
              "Content-Type": 'application/json'        
          },
      });
      var data = resp.data;
      console.log(data);
      this.setState({comments: data});
  }
   
  async downvote(){
          var resp = await axios({
          method: 'post',
          url: host+"issues/"+this.state.id+"/unvote",
          params: {}, 
          data: {}, 
          headers: {
              Authorization: 'Bearer ' + this.props.token,
              Accept: 'application/json',
              "Content-Type": 'application/json'        
          },
          });
          window.location.href = window.location.href;
  }

  async vote(){
      var resp = await axios({
          method: 'post',
          url: host+"issues/"+this.state.id+"/vote",
          params: {}, 
          data: {}, 
          headers: {
              Authorization: 'Bearer ' + this.props.token,
              Accept: 'application/json',
              "Content-Type": 'application/json'        
          },
      });
      window.location.href = window.location.href;
  }

  async unfollow(){
      var resp = await axios({
          method: 'post',
          url: host+"issues/"+this.state.id+"/unfollow",
          params: {}, 
          data: {}, 
          headers: {
              Authorization: 'Bearer ' + this.props.token,
              Accept: 'application/json',
              "Content-Type": 'application/json'        
          },
      });
      window.location.href = window.location.href;
  }

  async follow(){
      var resp = await axios({
          method: 'post',
          url: host+"issues/"+this.state.id+"/follow",
          params: {}, 
          data: {}, 
          headers: {
              Authorization: 'Bearer ' + this.props.token,
              Accept: 'application/json',
              "Content-Type": 'application/json',        
          },
      });
      window.location.href = window.location.href;
  }

  goToEdit(){
      window.location.href = window.location.href.replace("ShowIssue", "EditIssue");
  }

  back(){
      window.location.href = window.location.href.replace("ShowIssue/"+this.state.id, "AllIssues");
  }

  async delete(){
      var resp = await axios({
          method: 'delete',
          url: host+"issues/"+this.state.id,
          params: {}, 
          data: {}, 
          headers: {
              Authorization: 'Bearer ' + this.props.token,
              Accept: 'application/json',
              "Content-Type": 'application/json',        
          },
      });
      window.location.href = '/AllIssues'
  }

  async createPictureList() {
    var list = [];
    for (var i = 0; i < this.state.comments.length; ++i) {
      list.push(0);
    }
    for (var i = 0; i < this.state.comments.length; ++i) {
      var resp = await axios({
        method: 'get',
        url: `${host}users/${this.state.comments[i]._links.creator.href.replace("/users/","")}`,
        params: {}, 
        data: {}, 
        headers: {
          Authorization: 'Bearer ' + this.props.token,
          Accept: 'application/json',
          "Content-Type": 'application/json',        
        },
        selectedFile: null,
      });
      list[i] = resp.data.avatar_url;
      
    }
    console.log("avatars:");
    console.log(list);
    this.setState({pictureList:list});
  }

  async deleteMSG(id, index) {
    var resp = await axios({
      method: 'delete',
      url: host+"issues/"+this.state.id+"/comments/"+id,
      params: {}, 
      data: {}, 
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        Accept: 'application/json',
        "Content-Type": 'application/json'        
      },
    });
    var MSGs = this.state.comments;
    MSGs.splice(index,1);
    var PHOTOs = this.state.pictureList;
    PHOTOs.splice(index,1);
    console.log(MSGs);
    this.setState({comments:MSGs, pictureList:PHOTOs});
  }

  async showEditModal(id, index, text) {
    this.setState({
      updateComent:{
        open: true,
        idComment: id,
        index: index,
      }, 
      editCommentText:text,
    });
  }

  closeEditModal() {
    this.setState({updateComent:{
      open: false,
      idComment: 0,
      index: 0,
    }});
  }

  async updateEditModal() {
    var resp = await axios({
      method: 'patch',
      url: host+"issues/"+this.state.id+"/comments/"+this.state.updateComent.idComment,
      params: {}, 
      data: {
        text: this.state.editCommentText,
      }, 
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        Accept: 'application/json',
        "Content-Type": 'application/json'        
      },
    });

    this.getComments();
    this.closeEditModal();
  }

  async createComment() {
    let value = this.state.value
    this.setState({value: ''})
    if (this.state.value == null || this.state.value == '') {
        this.setState({errorMessage: true})
    } else {
        this.setState({errorMessage: false})
        var resp = await axios({
          method: 'post',
          url: host+"issues/"+this.state.id+"/comments",
          params: {},
          data: {
            text: value,
          },
          headers: {
            Authorization: 'Bearer ' + this.props.token,
            Accept: 'application/json',
            "Content-Type": 'application/json'
          },
        });

        if (this.state.selectedFile != null) {// Hay fichero adjunto
          var id = resp.data.id;
          const data = new FormData()
          data.append('file', this.state.selectedFile)
          var resp = await axios({
            method: 'patch',
            url: host+"issues/"+this.state.id+"/comments/file/"+id,
            params: {},
            data,
            headers: {
              Authorization: 'Bearer ' + this.props.token,
              Accept: 'application/json',
              "Content-Type": 'application/json'
            },
          });
        }

        await this.getComments();
        await this.createPictureList();
        this.setState({selectedFile:null});
    }
  }

  showError() {
    if (this.state.errorMessage) {
        return(
            <li><label style={{color: 'red'}}> This field is required </label></li>
        )
    }
  }


  showWriteComment() {
    return (
      <div style={{marginTop: '70px',marginBottom: '20px'}}>
        <ul id="first" style={{columnWidth: '10px'}}>
            <li><img src={this.state.avatarLoggedUser} style={{height: '50px', borderRadius: '30px', marginBottom: '0px'}} /></li>
        </ul>
        <ul id="second" style={{columnWidth: '550px'}}>
            <li><textarea className="form-control" type="text" value={this.state.value} onChange={this.handleChange} placeholder="What do you want to say?" style={{width: '100%'}}/></li>
            {this.showError()}
            <li>Attachment: <input type="file" name="file" onChange={(event) => {this.setState({selectedFile: event.target.files[0], loaded: 0});}} style={{marginTop: '10px'}}/></li>
            <li><button type="button" text="Post" className="btn btn-primary" style={{color: 'black', borderColor: '#ffffff', backgroundColor: '#ffffff', borderColor: 'black', marginTop: '10px'}} onClick={() => {this.createComment();}}>Submit</button></li>
        </ul>
              <div style={{color: 'white'}}>Just wondering whats going on</div>

      </div>
    );
  }

  async downloadFile(id, name) {
    var resp = await axios({
      method: 'get',
      url: host+`uploads/post/attachment_identifier/${id}/${name}`,
      params: {}, 
      data: {}, 
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        Accept: 'application/json',
        "Content-Type": 'application/json'        
      },
    });

    FileDownload(resp.data, name);

  }

  showComments(){
    if (_.isEmpty(this.state.comments) || _.isEmpty(this.state.pictureList)) return <div />;
    var htmlComments = this.state.comments.map((comment, index) => {
      const un = comment._links.creator.href.replace("/users/", "");
      if (!_.isEmpty(comment._embedded)) {
        // calculate name:
        var fileName = comment._embedded.attachment.href.replace(/.+\//g, "");
        // calculate id:
        var fileId = comment._embedded.attachment.href.replace("/uploads/post/attachment_identifier/", "").replace("/"+fileName,"");
      }
      return (
      <div key={index} className="card" style={{marginTop:30}}>
          <div class="card-header">
              <img src={this.state.pictureList[index]} style={{width:30, height:30, borderRadius:6}}/>
              <div style={{fontWeight:"bold", display:"inline"}}>   {un}   </div>
              <div style={{display:"inline", fontSize: 14}}>{moment(comment.updated_at).fromNow()} </div>
              {(un == this.props.username) ? (
                <div style={{display:"inline", right:0, position:"absolute", marginRight:10}}>
                  <button type="button" className="btn btn-primary" style={{color: 'black', borderColor: '#ffffff', backgroundColor: '#ffffff', top: '0px', right: '85px', position: 'absolute'}} onClick={() => {this.showEditModal(comment.id, index, comment.text);}}>Edit</button>
                  <button type="button" className="btn btn-primary" style={{color: 'black', borderColor: '#ffffff', backgroundColor: '#ffffff', top: '0px', right: '3px', position: 'absolute'}} onClick={() => {this.deleteMSG(comment.id, index);}}>Delete</button>
                </div>
              ) : (<div/>)}
              
          </div>
          <div className="card-body">
            <div>{comment.text}</div>
      {(!_.isEmpty(comment._embedded)) ? (
        <div>
        <hr/>
        <div className="myLink" style={{fontWeight:"bold", color:"darkblue"}} onClick={() => {this.downloadFile(fileId, fileName)}}>{fileName}</div>
      </div>
      ) : <div/>}
          </div>
      </div>
      );
    })
    return htmlComments;
}

    handleUpdateStatus(event){
        alert(event.target.value);
        this.setState({status: event.target.value});
        alert(this.state.status);
        this.updateStatus();
    }

    async updateStatus(){
        var resp = await axios({
            method: 'patch',
            url: host+"issues/"+this.state.id,
            params: {}, 
            data: {
                "title":this.state.issue.title,
                "description":this.state.issue.description,
                "status":this.state.status,
                "tipus": this.state.issue.tipus,
                "priority": this.state.issue.priority,
                "assigne": this.state.issue._links.assign.href.replace(/.+\//g, "")}, 
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                Accept: 'application/json',
                "Content-Type": 'application/json',        
            },
        });
    }

  render() {
    console.log(this.state.value);

      if (_.isNull(this.state.issue)) {
          return (<div>Loading...</div>);
      }
        return (
            <div>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css" />
                <link rel="stylesheet" href="https://static.pingendo.com/bootstrap/bootstrap-4.3.1.css" />
                {/* <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" /> */}
                
                { //Modal For edit comment
                (this.state.updateComent.open) ? (
                  <div style={{position:"fixed", top:200, zIndex:10000, width:"100%", display:"flex", justifyContent: "center"}}>
                    <div style={{padding: 30, borderRadius: 15,  backgroundColor:"#ddd",}}>
                    <div style={{fontWeight:"bold"}}>Edit your message:</div>
                    <input style={{width:400}} type="textarea" value={this.state.editCommentText} onChange={(event) => this.setState({editCommentText: event.target.value})}/>
                    <button type="button" className="btn btn-dark" style={{marginLeft:6}} onClick={() => {this.updateEditModal();}}>Update</button>
                    <button type="button" className="btn btn-dark" style={{marginLeft:6}} onClick={() => {this.closeEditModal();}}>Cancel</button>
                    </div>
                  </div>
                ) : (<div/>)}

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
                                this.state.issue.voted_by_user? <button type="button" className="btn btn-dark" style={{marginRight: '5px'}} onClick={this.downvote.bind(this)}>Downvote</button>:<button type="button" className="btn btn-dark" style={{marginRight: '5px'}} onClick={this.vote.bind(this)}>Vote</button>
                                      }
                                      {
                                this.state.issue.followed_by_user? <button type="button" className="btn btn-dark" style={{marginRight: '5px'}} onClick={this.unfollow.bind(this)}>Unfollow</button>:<button type="button" className="btn btn-dark" style={{marginRight: '5px'}} onClick={this.follow.bind(this)}>Follow</button>
                                      }
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
                                    {this.state.issue._links.assign.href.replace(/.+\//g, "")}
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
                        <tr>
                            <td>
                            </td>
                            <td>
                                <select name="status"  onChange={this.handleUpdateStatus}>
                                    <option value="NEW">NEW</option>
                                    <option value="DUPLICATE">DUPLICATE</option>
                                    <option value="RESOLVED">RESOLVED</option>
                                    <option value="INVALID">INVALID</option>
                                    <option value="ON HOLD">ON HOLD</option>
                                </select>
                            </td>
                        </tr>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Votes</h5>
                                    {this.state.issue.votes}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Followed by</h5>
                                    {
                                        this.state.issue.followed_by_user? <label>{this.props.username}</label>:null
                                    }
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
                                        (this.props.username && this.state.issue._links.creator.href.replace(/.+\//g, "") == this.props.username)? <div>
                                            <button type="button" className="btn btn-dark" style={{marginRight: '5px'}} onClick={this.goToEdit}>Edit</button>
                                            <button type="button" className="btn btn-dark" onClick={this.delete.bind(this)}>Delete</button>
                                        </div>:null
                                    }

                                </div>
                                <div className="col-md-2 offset-md-4" style={{}}>
                                    <button type="button" className="btn btn-dark" onClick={this.back.bind(this)}>Back</button>
                                </div>
                              </div>
                            <div>
                                {this.showWriteComment()}
                            </div>
                            <hr />
                            <div>
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
