var app = require('../app');
var debug = require('debug')('express-sequelize');
var http = require('http');
var models = require('../models');
bodyParser = require("body-parser")
const WebSocket = require('ws');
const express = require("express");
const router  = express.Router()
/**
 * Get port from environment and store in Express.
 */




 var port = normalizePort(process.env.PORT || '8082');
 wss = new WebSocket.Server({ port: port });
  
 wss.broadcast = function broadcast(data) {
   wss.clients.forEach(function each(client) {
     if (client.readyState === WebSocket.OPEN) {
       client.send(data);
     }
   });
 };
 
 
 wss.on('connection', function connection(ws) {
   


   router.get("/", (req, res) => {
     models.Entry.findAll({}).then((dbEntries) => {
        console.log(ws)
       ws.broadcast(JSON.stringify(dbEntries))
       });
     
     
     });


   
   ws.on('message', function incoming(message) {
     
     console.log('received: %s', message);
     
   });
  
 });


 app.set('port', port);
  /**
   * Create HTTP server.
   */



   var server = http.createServer(app);

models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   */
  
  
  
  
  exports.broadcast = {
    broadcast: function(data) {
      return wss.broadcast(data)
    },
  
  }
  
   server.listen(port, function() {
    debug('Express server listening on port ' + server.address().port);
  });
  server.on('error', onError);
  server.on('listening', onListening);

});




/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

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
module.exports = port;



