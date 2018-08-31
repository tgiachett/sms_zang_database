// dependencies 
const express = require("express"),
	bodyParser = require("body-parser"),
	path = require("path");
	
	const app = express()
	
	const db = require("./models"),
	routes = require("./routes"),
	users = require("./routes/users"),
	zang = require("./routes/zang"),
	api = require("./routes/api");
	const models = require('./models');
const wss = require('./websocket');
	// setup body-parser
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
app.use("/", routes);
app.use("/api", api);
app.use("/users", users);
app.use("/zang", zang);

module.exports = app;