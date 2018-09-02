const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const models = require('./models');
const wss = require('./websocket.js')

const db = require("./models"),
	routes = require("./routes"),
	users = require("./routes/users"),
	zang = require("./routes/zang"),
	api = require("./routes/api");

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