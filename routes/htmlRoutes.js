var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Player.findAll({}).then(function(dbPlayers) {
      res.render("index", {
        msg: "Welcome to Superhero Draft!",
        players: dbPlayers
      });
    });
  });

  app.get("/draft/:name", function(req, res) {
    db.Player.findOne({
      where: { name: req.params.name },
      include: [db.Character]
    }).then(function(dbPlayer) {
      if (dbPlayer.loggedIn === true) {
        res.render("draft", {
          msg: "Draft your Team!",
          currentPlayer: dbPlayer
        });
      } else {
        res.render("no-login", {
          msg: "You cannot access this page!"
        });
      }
    });
  });

  app.get("/battle/:name", function(req, res) {
    db.Player.findOne({
      where: { name: req.params.name },
      include: [db.Character]
    }).then(function(dbPlayer) {
      if (dbPlayer.loggedIn === true) {
        res.render("battle", {
          msg: "Prepare for Battle",
          currentPlayer: dbPlayer
        });
      } else {
        res.render("no-login", {
          msg: "You cannot access this page!"
        });
      }
    });
  });

  app.get("/survey", function(req, res) {
    db.Character.findAll({}).then(function(dbCharacters) {
      res.render("survey", {
        msg: "Take the survey!",
        characters: dbCharacters
      });
    });
  });

  app.get("/logout/:name", function(req, res) {
    db.Player.findOne({
      where: { name: req.params.name }
    }).then(function(dbPlayer) {
      res.render("logout", {
        msg: "Come back again!",
        player: dbPlayer
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
