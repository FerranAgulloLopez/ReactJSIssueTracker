import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LogInScreen from './components/LogInScreen';
import AllIssues from './components/AllIssues';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={ LogInScreen } />
      <Route path="/AllIssues" component={ AllIssues } />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
