
const models  = require("../models");
const express = require("express");
const router  = express.Router();
const sms = require('../controller/sms.js');
const wss = require('../bin/server').wss



router.get("/", (req, res) => {
  models.Entry.findAll({}).then((dbEntries) => {
     
    res.json(dbEntries)
    });
  
  
  });


router.get("/surf", (req, res) => {
  
  models.Entry.findAll({}).then((dbEntries) => {
    
      wss.broadcast(JSON.stringify(dbEntries))
      res.send('broadcast success')

    
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

