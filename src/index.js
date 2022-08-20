import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './components/app';
import AllStoredUrls from './components/allstoredurls';
import UrlForwarding from './components/urlforwarding';

ReactDOM.render(
    <Router>
	<Switch>
	    <Route exact path='/' component={App} />
	    <Route path='/all' component={AllStoredUrls} />
	    <Route path='/a/:slug' component={UrlForwarding} />
	</Switch>
    </Router>    
  , document.querySelector('.app-wrapper'));
