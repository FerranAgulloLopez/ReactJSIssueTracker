import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class LogInScreen extends React.Component {

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
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css" />
            <link rel="stylesheet" href="https://static.pingendo.com/bootstrap/bootstrap-4.3.1.css" />
            <div className="py-5 text-center" style={{backgroundImage: 'url("https://static.pingendo.com/cover-bubble-dark.svg")', backgroundSize: 'cover', position: 'fixed', bottom: 0, left: 0, right: 0, top: 0}}>
              <div className="container" style={{paddingTop: '150px'}}>
                <div className="row">
                  <div className="bg-white p-5 mx-auto col-md-8 col-10">
                    <h3 className="display-3">Issue Tracker</h3>
                    <p className="mb-3 lead">Welcome!</p>
                    <div>
                                    <p>Please choose a repository from the list below.</p>
                                    <ul>
                                        <li><Link to="/AllIssues">React</Link></li>
                                    </ul>
                                </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      );
  }
  
}
  
export default LogInScreen;