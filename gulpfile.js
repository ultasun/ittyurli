// https://browsersync.io/docs/options#option-middleware
// https://github.com/AveVlad/gulp-connect/issues/112

// this file should not be worked on. instead, IttyURLi should be adapted to
// utilize CINDI (https://github.com/ultasun/cindi)

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    express = require('express');
var redis = require('redis');
var client = redis.createClient();
client.on('error', function(error) {
    console.error(error);
});

var app = express();

app.get('/redis', function(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    if(req.query.op === 'get') {
	client.get(
	    req.query.key, function(err, value) {
		if(err !== null) {
		    res.send(err)
		} else {
		    res.send(value);
		}
	    });
    } else if(req.query.op === 'set') {
	client.set(
	    req.query.key, req.query.value, function(err, value) {
		if(err !== null) {
		    res.send(err);
		} else {
		    res.send(value);
		}
	    });
    } else if(req.query.op === 'getset') {
	client.getset(
	    req.query.key, req.query.value, function(err, value) {
		res.send(value);
	    });
    } else if(req.query.op === 'keys') {
	client.keys(
	    req.query.query, function(err, value) {
		res.send(value);
	    });
    }
});

gulp.task('serve', function() {
    connect.server({
	port: 8081,
	host: '0.0.0.0',
	root: 'app',
	middleware: function(connect, opt) {
	    return [app];
	}
    });
});

