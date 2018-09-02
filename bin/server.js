
var debug = require('debug')('express-sequelize');
var http = require('http');
var models = require('../models');
bodyParser = require("body-parser")
const express = require("express");
const router  = express.Router()
const server = require('../httpServer').server
const appSetup = require('../app.js');
const app = require('../httpServer').app
const wssMod = require('../websocket')
const port = require('../httpServer').port
//The functions on app.js and server.js have been combined into server.js because of unresolved bug reproduced by trying to export the wss server as a module

/**
 * Get port from environment and store in Express.
 */
// dependencies 
	const path = require("path");
	
	
	const db = require("../models"),
	routes = require("../routes"),
	users = require("../routes/users"),
	zang = require("../routes/zang"),
	api = require("../routes/api");
	
const WebSocket = require('ws');

wss = wssMod.server(server)


   
    wss.on('connection', function connection(ws) {
     ws.send("Connected")
     console.log("connection")
   }) 

models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   */
   
  

   server.listen(port, function() {
    console.log('Express server listening on port ' + server.address().port);

  });
  app.use(appSetup)
  server.on('error', onError);
  server.on('listening', onListening);

});




/**
 * Normalize a port into a number, string, or false.
 */



/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

//CHAI MOCHA TEST export
module.exports = {
  port: port,
  server: server,
  wss: wss
}





