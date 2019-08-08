var db = require("../models");

module.exports = function(app) {
  //NEW ROUTES --------------------------------

  app.get("/api/players", function(req, res) {
    db.Player.findAll({}).then(function(dbPlayers) {
      res.json(dbPlayers);
    });
  });

  app.get("/api/player/:name", function(req, res) {
    db.Player.findOne({
      where: {
        name: req.params.name
      },
      include: [db.Character]
    }).then(function(dbPlayers) {
      res.json(dbPlayers);
    });
  });

  app.put("/api/player-team-boost/:id", function(req, res) {
    db.Player.increment(
      {
        teamSize: 1
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(function(dbPlayers) {
      res.json(dbPlayers);
    });
  });

  app.put("/api/player-team-cut/:id", function(req, res) {
    db.Player.decrement(
      {
        teamSize: 1
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(function(dbPlayers) {
      res.json(dbPlayers);
    });
  });

  app.put("/api/player/logout/:name", function(req, res) {
    db.Player.update(
      {
        loggedIn: false
      },
      {
        where: {
          name: req.params.name
        }
      }
    ).then(function(dbPlayers) {
      res.json(dbPlayers);
    });
  });

  app.put("/api/player/login/:name", function(req, res) {
    db.Player.update(
      {
        loggedIn: true
      },
      {
        where: {
          name: req.params.name
        }
      }
    ).then(function(dbPlayers) {
      res.json(dbPlayers);
    });
  });

  app.post("/api/players", function(req, res) {
    db.Player.create(req.body).then(function(dbPlayers) {
      res.json(dbPlayers);
    });
  });

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

  app.delete("/api/character/:name", function(req, res) {
    db.Character.destroy({
      where: {
        name: req.params.name
      }
    }).then(function(dbCharacters) {
      res.json(dbCharacters);
    });
  });

  app.get("/api/undrafted", function(req, res) {
    db.Undrafted.findAll({}).then(function(dbUndrafted) {
      res.json(dbUndrafted);
    });
  });
};
