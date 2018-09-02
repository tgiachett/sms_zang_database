
var debug = require('debug')('express-sequelize');
var http = require('http');
var models = require('../models');
bodyParser = require("body-parser")
const express = require("express");
const router  = express.Router()
//The functions on app.js and server.js have been combined into server.js because of unresolved bug reproduced by trying to export the wss server as a module

/**
 * Get port from environment and store in Express.
 */
// dependencies 
	const path = require("path");
	const app = express()
	
	const db = require("../models"),
	routes = require("../routes"),
	users = require("../routes/users"),
	zang = require("../routes/zang"),
	api = require("../routes/api");
	
const WebSocket = require('ws');


 var port = normalizePort(process.env.PORT || '8082');
 

 app.set('port', port);
  /**
   * Create HTTP server.
   */

 

   var server = http.createServer(app);
   let wss = new WebSocket.Server({server});

   
    wss.on('connection', function connection(ws) {
     ws.send("Connected")
     console.log("connection")
   }) 

models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   */
   
  
  app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// static directory


app.use(express.static("./public"));
// app.use(express.static(path.join(__dirname, '/views')));
// const publicPath = path.join(__dirname, '/views');

// setup handlebars

// app.use("/", function (req, res, next) {
//   models.Entry.findAll({}).then((dbEntries) => {
//     wss.broadcast(JSON.stringify(dbEntries))
//     });
//   next()
// });
function globalDataUpdate () {
  models.Entry.findAll({}).then((dbEntries) => {
		console.log(wss)
		wss.broadcast = function broadcast(data) {
			wss.clients.forEach(function each(client) {
				if (client.readyState === WebSocket.OPEN) {
					client.send(data);
				}
			});
		};
		wss.broadcast(JSON.stringify(dbEntries))
		
		
	
	});
}

app.use("/", routes);
app.use("/api", api);
app.use("/users", users);
app.use('/zang', function (req, res, next) {
	globalDataUpdate()
	
  next()
})
app.use("/zang", zang);
   server.listen(port, function() {
    console.log('Express server listening on port ' + server.address().port);

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
module.exports = {
  port: port,
  server: server,
  wss: wss
}





