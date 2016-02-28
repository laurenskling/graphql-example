var graphqlHTTP = require('express-graphql');
import { Schema } from './api/schema';

var config = require('./webpack.config');
var path = require('path');
var express = require('express');
var webpack = require('webpack');

var host = '0.0.0.0';
var port = '8080';
var hostWithPort = host + ':' + port;

var app = express();
var compiler = webpack(config);

// setup the frontend
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  stats: { colors: true }
}));

// because hotloading is cool
app.use(require('webpack-hot-middleware')(compiler));

// This is where GraphQL requests go to
app.get('/data', graphqlHTTP({ schema: Schema, pretty: true }));

// Send back the html if anything else
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// start the server
app.listen(port, host, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at ' + hostWithPort);
});
