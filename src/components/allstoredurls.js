import React, { Component } from 'react';
import axios from 'axios';

import { USER_DEFINED_HTTP_SERVER_ROOT } from '../../user-env';
import { USER_DEFINED_MIDDLEWARE_SERVER_ROOT } from '../../user-env';

const HTTP_SERVER_ROOT = USER_DEFINED_HTTP_SERVER_ROOT;
const MIDDLEWARE_SERVER_ROOT = USER_DEFINED_MIDDLEWARE_SERVER_ROOT;

export default class AllStoredUrls extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    allKeys: ''
	}
	this.getAllUrls = this.getAllUrls.bind(this);
	this.buildAllUrls = this.buildAllUrls.bind(this);
	this.addUrlPrefix = this.addUrlPrefix.bind(this);
    }

    getAllUrls() {
	axios.get(
	    MIDDLEWARE_SERVER_ROOT + "redis?op=keys&query=*")
	    .then(response => {
		this.setState({ allKeys: response.data });
	    })
	    .catch(error => {
		console.log('getAllUrls error', error);
	    });
    }

    addUrlPrefix(e) {
	return HTTP_SERVER_ROOT + "a/" + e;
    }

    getLongUrl(theKey) {
	var result = '';
	axios.get(MIDDLEWARE_SERVER_ROOT + "redis?op=get&key=" + theKey)
	    .then(response => {
		result = response.data;
		var liItem = document.getElementById(theKey);
		liItem.innerHTML = result;
	    })
	    .catch(error => {
		console.log('getLongUrl error while building list', error);
	    });
	return result;
    }

    buildAllUrls() {
	if(this.state.allKeys !== '') {
	    return this.state.allKeys.map(e => {
		return (<li className="urlListElement">
			    <ul>
				<li>
				    <a href={this.addUrlPrefix(e)}>
					{this.addUrlPrefix(e)}
				    </a>
				</li>
				<li>
				    ...links to...
				</li>
				<li className="yellowLi" id={e}>
				    <i>{this.getLongUrl(e)}</i>
				</li>
			    </ul>
			</li>);
	    });
	} else { return '' }
    }

    componentWillMount() {
	this.getAllUrls();
    }

    render() {
	return (
	    <div className='app'>
		<div className='heading'>
		    <h1>IttyURLi</h1>
		    <h2>A URL shortener</h2>
		    <h3 className="appResultArea">All shortened links</h3>
		</div>
		<div className='allStoredLinks'>
		    <ul>
			{this.buildAllUrls()}
		    </ul>
		</div>
	    </div>
	);
    }
}
