import React from 'react';
import { Nav, Footer, Metadata } from '../util/html_objects'
import IssueForm from './form/IssueForm'


class CreateIssue extends React.Component {

   render() {

      return (
        <div>
            <Metadata />
            <Nav    />
            <div className="py-5">
                <div className="container">
                  <div className="row" style={{}}>
                    <div className="col-md-1" style={{}}>
                    </div>
                    <div className="col-md-8 offset-md-1">
                      <div className="card bg-light mb-3" style={{paddingBottom: '20px'}}>
                        <div className="card-header" style={{fontSize: '20px', fontWeight: 'bold'}}>Issue
                        </div>
                        <div className="card-body">
                          <IssueForm />
                        </div>
                      </div>
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