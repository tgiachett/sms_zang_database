const WebSocket = require('ws');



let wss = new WebSocket.Server({port: 8081});



wss.broadcast = function broadcast(data) {
   wss.clients.forEach(function each(client) {
     if (client.readyState === WebSocket.OPEN) {
       client.send(data);
     }
   });
 };
 
 
//  wss.on('connection', function connection(ws) {
   

//   console.log("connection")
//    router.get("/", (req, res) => {
//      models.Entry.findAll({}).then((dbEntries) => {
//         console.log(ws)
//        ws.broadcast(JSON.stringify(dbEntries))
//        });
     
     
//      });


   
//    ws.on('message', function incoming(message) {
     
//      console.log('received: %s', message);
     
//    });
  
//  });

 module.exports = wss

