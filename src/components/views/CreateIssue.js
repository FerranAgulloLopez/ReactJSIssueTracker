import React from 'react';
import { Nav, Footer, Metadata } from '../util/html_objects'
import IssueForm from './form/IssueForm'


class CreateIssue extends React.Component {

   render() {

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
                        title={''}
                        description={''}
                        status={'NEW'}
                        type={'BUG'}
                        priority={'MAJOR'}
                        update={false}
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