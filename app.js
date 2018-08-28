// dependencies 
const express = require("express"),
	bodyParser = require("body-parser"),
	exphbs = require("express-handlebars"),
	path = require("path");

const db = require("./models"),
	routes = require("./routes"),
	users = require("./routes/users"),
	zang = require("./routes/zang"),
	api = require("./routes/api");

const app = express();





// setup body-parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// static directory
app.use(express.static("./public"));
// app.use(express.static(path.join(__dirname, '/views')));
// const publicPath = path.join(__dirname, '/views');

// setup handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/", routes);
app.use("/api", api);
app.use("/users", users);
app.use("/zang", zang);




module.exports = app;