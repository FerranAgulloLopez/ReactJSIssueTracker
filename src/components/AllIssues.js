import React from 'react';
import { Nav, Footer } from './util/util'

class AllIssues extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      correo: "",
    };
  }


    render() {
      return (
        <div>
                <meta charSet="utf-8" />
                <title>Issues</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css" />
                <link rel="stylesheet" href="https://static.pingendo.com/bootstrap/bootstrap-4.3.1.css" />
                <Nav />
                <div style={{margin: 'auto', marginTop: '60px', width: '1200px', maxWidth: '90%', marginBottom: '40px'}}>
                  <p id="notice">notice</p>
                  <h1 style={{marginBottom: '30px'}}>Issues</h1>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>
                          <img src="https://image.flaticon.com/icons/svg/32/32195.svg" style={{height: '15px'}} />
                        </th>
                        <th style={{width: '60px'}}>
                          <img src="https://image.flaticon.com/icons/svg/32/32195.svg" style={{height: '15px'}} />
                        </th>
                        <th style={{width: '60px'}}>
                          <img src="https://image.flaticon.com/icons/svg/32/32195.svg" style={{height: '15px'}} />
                        </th>
                        <th style={{width: '60px'}}>
                          <img src="https://image.flaticon.com/icons/svg/32/32195.svg" style={{height: '15px'}} />
                        </th>
                        <th style={{width: '85px'}}>
                          <img src="https://image.flaticon.com/icons/svg/32/32195.svg" style={{height: '15px'}} />
                        </th>
                        <th style={{width: '160px'}}>
                          <img src="https://image.flaticon.com/icons/svg/32/32195.svg" style={{height: '15px'}} />
                        </th>
                        <th style={{width: '120px'}}>
                          <img src="https://image.flaticon.com/icons/svg/32/32195.svg" style={{height: '15px'}} />
                        </th>
                        <th style={{width: '120px'}}>
                          <img src="https://image.flaticon.com/icons/svg/32/32195.svg" style={{height: '15px'}} />
                        </th>
                        <th style={{width: '120px'}}>
                          <img src="https://image.flaticon.com/icons/svg/159/159604.svg" style={{color: '#666', height: '26px'}} />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
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

  }

 export default AllIssues;