var $signIn = $("#sign-in");
var $playerSignUp = $("#player-signup");
var $playerPassword = $("#player-password");
var $findHeroes = $("#find-heroes");

// The API object contains methods for each kind of request we'll make
var API = {
  //NEW API METHODS ---------------------
  makePlayer: function(player) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/players",
      data: JSON.stringify(player)
    });
  },
  getAllPlayers: function() {
    return $.ajax({
      url: "api/players",
      type: "GET"
    });
  },
  draftNewHero: function(character) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/characters",
      data: JSON.stringify(character)
    });
  },
  increaseTeam: function(player) {
    return $.ajax({
      url: "api/players",
      type: "PUT",
      data: player
    });
  }
};

//TEST CODE HERE ------------------------------------------------
var signUpPlayer = function() {
  event.preventDefault();
  API.getAllPlayers().then(function(data) {
    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        if (
          data[i].name === $playerSignUp.val().trim() &&
          data[i].password === $playerPassword.val().trim()
        ) {
          alert("Welcome back, " + data[i].name + "!");
          window.location.href = "/draft/" + data[i].name;
          return;
        } else if (
          data[i].name === $playerSignUp.val().trim() &&
          data[i].password !== $playerPassword.val().trim()
        ) {
          alert("Wrong Password. Try again!");
          $playerPassword.val("");
          return;
        } else {
          alert("New player found");
          var player = {
            name: $playerSignUp.val().trim(),
            password: $playerPassword.val().trim(),
            teamSize: 0
          };
          API.makePlayer(player).then(function() {
            window.location.href = "/draft/" + player.name;
          });
          return;
        }
      }
    } else if (data.length === 0) {
      alert("New player found");
      var player = {
        name: $playerSignUp.val().trim(),
        password: $playerPassword.val().trim(),
        teamSize: 0
      };
      API.makePlayer(player).then(function() {
        window.location.href = "/draft/" + player.name;
      });
      return;
    }
  });
};

var searchHeroes = function() {
  event.preventDefault();
  var query = "https://www.superheroapi.com/api.php/669821696868712/";

  for (var i = 0; i < 20; i++) {
    $.ajax({
      url: query + Math.floor((Math.random() * 731) + 1),
      method: "GET"
    }).then(function(res) {
      $("#draft-board").append(
        "<div class='card superhero-card mt-2'><div class='card-body'><div class='d-inline-block mr-4 hero-profile'><img class='hero-pic' src='" +
          res.image.url +
          "' alt='photo not found' style='height: 150px;'><p class='hero-name'>" +
          res.name +
          "</p></div><div class='d-inline-block mb-4 hero-stats'><p>Strength: <span class='str'>" +
          res.powerstats.strength +
          "</span></p><p>Intelligence: <span class='int'>" +
          res.powerstats.intelligence +
          "</span></p><p>Skill: <span class='skl'>" +
          res.powerstats.combat +
          "</span></p></div></div></div>"
      );
    });
  }
};

//NOT FUNCTIONING YET--------
var draftHero = function(event) {
  event.preventDefault();
  var heroName = $(this).find(".hero-name").text();
  var heroPic = $(this).find(".hero-pic").attr("src");
  var heroStr = parseInt($(this).find(".str").text());
  var heroInt = parseInt($(this).find(".int").text());
  var heroSkill = parseInt($(this).find(".skl").text());
  var currentPlayer = window.location.pathname.split("/").pop();
  $.get("/api/player/" + currentPlayer, function(data) {
    console.log(data);
    var hero = {
      name: heroName,
      pic: heroPic,
      strength: heroStr,
      intelligence: heroInt,
      skill: heroSkill,
      PlayerId: data.id
    };
    $.post("/api/characters", hero, function() {
      console.log("Drafted!");
    });
    data.teamSize += 1;
    API.increaseTeam(data).then(function(res) {
      console.log("your team size is now " + res.teamSize);
    });
  });
};

// Add event listeners to the submit and delete buttons
$signIn.on("click", signUpPlayer);
$findHeroes.on("click", searchHeroes);
$(document).on("click", ".superhero-card", draftHero);