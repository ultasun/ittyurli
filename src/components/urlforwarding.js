import React, { Component } from 'react';
import axios from 'axios';

import { USER_DEFINED_MIDDLEWARE_SERVER_ROOT } from '../../user-env';
const MIDDLEWARE_SERVER_ROOT = USER_DEFINED_MIDDLEWARE_SERVER_ROOT;

export default class UrlForwarding extends Component {
    constructor(props) {
	super(props);

	this.state = {
	    longUrl: ''
	};
	this.getLongUrl = this.getLongUrl.bind(this);
    }

    getLongUrl() {
	var result = '';
	axios.get(
	    MIDDLEWARE_SERVER_ROOT + "redis?op=get&key="
		+ this.props.match.params.slug)
	    .then(response => {
		this.setState({ longUrl: response.data });
	    })
	    .catch(error => {
		console.log('getLongUrl error', error);
	    });
	return result;
    }

    componentWillMount() {
	this.getLongUrl();
    }

    render() {
	if(this.state.longUrl !== '') {
	    window.location.replace(this.state.longUrl);
	}
	return (<div><h3>Thank you for using IttyURLi.</h3></div>);
    }
}
