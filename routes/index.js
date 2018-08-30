
const models  = require("../models");
const express = require("express");
const router  = express.Router();
const sms = require('../controller/sms.js');
const wss = require('../bin/server.js')

router.get("/", (req, res) => {
  models.Entry.findAll({}).then((dbEntries) => {
     console.log(wss)
    wss.broadcast(JSON.stringify(dbEntries))
    });
  
  
  });


router.get("/surf", (req, res) => {
  
  models.Entry.findAll({}).then((dbEntries) => {
    wss.broadcast(JSON.stringify(dbEntries))
    });
  });


router.get("/about", (req, res) => {
  models.User.findAll({}).then((users) => {
    res.render("index", {
      title: "placeholder",
      users: users
    });
  });
});

router.get("/faq", (req, res) => {
  models.User.findAll({}).then((users) => {
    res.render("index", {
      title: "placeholder",
      users: users
    });
  });
});

module.exports = router;

