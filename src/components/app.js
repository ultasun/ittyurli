import React, { Component } from 'react';
import axios from 'axios';

import { USER_DEFINED_HTTP_SERVER_ROOT } from '../../user-env';
import { USER_DEFINED_MIDDLEWARE_SERVER_ROOT } from '../../user-env';

const HTTP_SERVER_ROOT = USER_DEFINED_HTTP_SERVER_ROOT;
const MIDDLEWARE_SERVER_ROOT = USER_DEFINED_MIDDLEWARE_SERVER_ROOT;

export default class App extends Component {
    constructor(props) {
	super(props);

	this.state = {
	    originalUrl: '',
	    newShortUrl: ''
	}

	this.handleSubmit = this.handleSubmit.bind(this);
	this.generateRandomLetter = this.generateRandomLetter.bind(this);
	this.generateRandomString = this.generateRandomString.bind(this);
	this.pushToRedis = this.pushToRedis.bind(this);
	this.getLastGeneratedUrl = this.getLastGeneratedUrl.bind(this);
    }

    getLastGeneratedUrl() {
	return this.state.newShortUrl;
    }

    generateRandomLetter() {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz';
	const randomInt = parseInt(Math.random() * alphabet.length);
	const randomLetter = alphabet.substring(randomInt, randomInt + 1);
	return randomLetter;
    }

    generateRandomString(ofLength) {
	let stringResult = "";
	for (let i = 0; i < ofLength; i++) {
	    stringResult += this.generateRandomLetter();
	}
	return stringResult;
    }

    pushToRedis(originalUrl) {
	let randomString = this.generateRandomString(6);
	axios.get(
	    MIDDLEWARE_SERVER_ROOT + `redis?op=set&key=${randomString}`
		+`&value=${originalUrl}`)
	    .then(response => {
		this.setState({
		    newShortUrl: (HTTP_SERVER_ROOT + `a/${randomString}`)
		});
	    })
	    .catch(error => {
		console.log('pushToRedis error', error);
	    });
    }

    handleSubmit(event) {
	event.preventDefault();
	this.pushToRedis(event.target.originalUrl.value);
	event.target.originalUrl.value = '';
    }
    
    render() {
	return (
	    <div className='app'>
		<div className='heading'>
		    <h1>IttyURLi</h1>
		    <h2>A URL shortener</h2>
		    <h3>See all posted links&nbsp;
			<a href="/all">here</a>.
		    </h3>
		</div>
		<div className='appFormArea'>
		    <form
			className='longUrlSubmission'
			onSubmit={this.handleSubmit}>
			<input
			    name='originalUrl'
			    className='originalUrlField'
			    placeholder='Long URL goes here' />
			<button
			    className='shortenButton'
			    action='submit'>
			    Shorten
			</button>
		    </form>
		</div>
		<div className='appResultArea'>
		    { this.getLastGeneratedUrl() ? (
			<div>
			    <h2>Your shortened URL: </h2>
			    <h4>
				<a href={
				       this.getLastGeneratedUrl()
					   .substring(
					       HTTP_SERVER_ROOT.length)}>
				    {this.getLastGeneratedUrl()}
				</a>
			    </h4>
			    <h3>Thank you for using the service!</h3>
			</div>
		    ) : ( null ) }
		</div>
		<p>View the&nbsp;
		    <a href="https://github.com/ultasun/ittyurli">
			source
		    </a>, or&nbsp;
		    <a href="https://hub.docker.com/r/ultasun/ittyurli">
			get this Docker image!
		    </a>
		</p>
	    </div>
	);
    }
}
