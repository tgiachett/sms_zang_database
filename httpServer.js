const http = require('http');
const express = require('express')
const app = express();

const port = normalizePort(process.env.PORT || '8082');
 

app.set('port', port);
const server = http.createServer(app);

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

module.exports = {
  server: server,
  app: app,
  port: port
}