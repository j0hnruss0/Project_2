var db = require("../models");
var jwt = require('jsonwebtoken'); //---AUTH TOKEN
var tokenList = {}; //---AUTH TOKEN
var config = require(__dirname + "/../config/config.json")[env] //---AUTH TOKEN
var env = process.env.NODE_ENV || "development"; //---AUTH TOKEN

module.exports = function(app) {
  //NEW ROUTES --------------------------------

  app.get("/api/players", function(req, res) {
    db.Player.findAll({}).then(function(dbPlayers) {
      res.json(dbPlayers);
    });
  });

  app.get("/api/players/:id", function(req, res) {
    db.Player.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Character]
    }).then(function(dbPlayers) {
      res.json(dbPlayers);
    });
  });

  app.get("/api/player/:name", function(req, res) {
    db.Player.update({
      teamSize: req.body.teamSize
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPlayers) {
      res.json(dbPlayers);
    });
  });

  app.post("/api/players", function(req, res) {
    db.Player.create(req.body).then(function(dbPlayers) {
      res.json(dbPlayers);
    });
  });
  //NON FUNCTIONING ROUTE, PUT REQUESTS-------------

  app.get("/api/characters", function(req, res) {
    db.Character.findAll({}).then(function(dbCharacters) {
      res.json(dbCharacters);
    });
  });

  app.post("/api/characters", function(req, res) {
    db.Character.create(req.body).then(function(dbCharacters) {
      res.json(dbCharacters);
    });
  });

  app.get("/api/characters/:PlayerId", function(req, res) {
    db.Character.findOne({
      where: {
        PlayerId: req.params.PlayerId
      }
    }).then(function(dbCharacters) {
      res.json(dbCharacters);
    });
  });
};
