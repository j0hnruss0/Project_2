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
    db.Player.findOne({ where: { name: req.params.name } }).then(function(dbExample) {
      res.render("draft", {
        msg: "Draft your Team!",
        currentPlayer: dbExample
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
