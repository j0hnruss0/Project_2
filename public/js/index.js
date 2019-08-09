var $signIn = $("#sign-in");
var $findHeroes = $("#find-heroes");
var $makeYourOwn = $("#alt-draft");

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
  logOut: function(player) {
    return $.ajax({
      url: "api/player/logout/" + player,
      type: "PUT"
    });
  },
  logIn: function(player) {
    return $.ajax({
      url: "api/player/login/" + player,
      type: "PUT"
    });
  }
};

//TEST CODE HERE ------------------------------------------------
var signUpPlayer = function() {
  event.preventDefault();
  var allUsers = [];
  var thisPlayer = $("#player-signup")
    .val()
    .trim();
  var thisPassword = $("#player-password")
    .val()
    .trim();
  API.getAllPlayers().then(function(data) {
    if (data.length === 0 && thisPassword !== "") {
      alert("Thanks for joining! Welcome to Superhero Draft!");
      var player = {
        name: thisPlayer,
        password: thisPassword,
        teamSize: 0,
        loggedIn: true
      };
      API.makePlayer(player).then(function() {
        window.location.href = "/draft/" + player.name;
      });
      return;
    } else if (data.length > 0 && thisPassword !== "") {
      for (var i = 0; i < data.length; i++) {
        allUsers.push(data[i].name);
      }
      for (var j = 0; j < allUsers.length; j++) {
        if (allUsers[j] === thisPlayer && data[j].password === thisPassword) {
          API.logIn(data[j].name).then(function() {
            window.location.href = "/draft/" + data[j].name;
          });
          return;
        } else if (allUsers[j] === thisPlayer && allUsers[j] !== thisPassword) {
          alert("Wrong Password. Try again!");
          $playerPassword.val("");
          return;
        } else if (thisPlayer === "" || thisPassword === "") {
          alert("Sorry, not a valid username/password!");
          return;
        }
        if (!allUsers.includes(thisPlayer) && thisPassword !== "") {
          alert("Thanks for joining! Welcome to Superhero Draft!");
          var player = {
            name: thisPlayer,
            password: thisPassword,
            teamSize: 0,
            loggedIn: true
          };
          API.makePlayer(player).then(function() {
            window.location.href = "/draft/" + player.name;
          });
          return;
        } else if (!allUsers.includes(thisPlayer) && thisPassword === "") {
          alert("You need a password to sign up!");
        }
      }
    } else if (thisPassword === "") {
      alert("You need a password to sign-in!");
    }
  });
};

var searchHeroes = function() {
  event.preventDefault();
  var query = "https://www.superheroapi.com/api.php/669821696868712/";
  var allHeroes = [];
  $.get("/api/characters", function(heroRes) {
    for (var h = 0; h < heroRes.length; h++) {
      allHeroes.push(heroRes[h].name);
    }
    return allHeroes;
  });
  for (var i = 0; i < 20; i++) {
    $.ajax({
      url: query + Math.floor(Math.random() * 731 + 1),
      method: "GET"
    }).then(function(res) {
      if (!allHeroes.includes(res.name)) {
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
      }
    });
  }
};

//Experiment draft with self-made Superhero API
var alternateDraft = function() {
  event.preventDefault();
  var allHeroes = [];
  $.get("/api/characters", function(heroRes) {
    for (var h = 0; h < heroRes.length; h++) {
      allHeroes.push(heroRes[h].name);
    }
    return allHeroes;
  });
  for (var i = 0; i < 20; i++) {
    $.ajax({
      url: "api/undrafted",
      method: "GET"
    }).then(function(res) {
      if (!allHeroes.includes(res.name)) {
        $("#draft-board").append(
          "<div class='card superhero-card mt-2'><div class='card-body'><div class='d-inline-block mr-4 hero-profile'><img class='hero-pic' src='" +
            res.pic +
            "' alt='photo not found' style='height: 150px;'><p class='hero-name'>" +
            res.name +
            "</p></div><div class='d-inline-block mb-4 hero-stats'><p>Strength: <span class='str'>" +
            res.strength +
            "</span></p><p>Intelligence: <span class='int'>" +
            res.intelligence +
            "</span></p><p>Skill: <span class='skl'>" +
            res.combat +
            "</span></p></div></div></div>"
        );
      }
    });
  }
};

var draftHero = function(event) {
  event.preventDefault();
  $(this).addClass("picked-card");
  var heroName = $(this)
    .find(".hero-name")
    .text();
  var heroPic = $(this)
    .find(".hero-pic")
    .attr("src");
  var heroStr = parseInt(
    $(this)
      .find(".str")
      .text()
  );
  var heroInt = parseInt(
    $(this)
      .find(".int")
      .text()
  );
  var heroSkill = parseInt(
    $(this)
      .find(".skl")
      .text()
  );
  if (isNaN(heroStr) === true) {
    heroStr = Math.floor(Math.random() * 100);
  }
  if (isNaN(heroInt) === true) {
    heroInt = Math.floor(Math.random() * 100);
  }
  if (isNaN(heroSkill) === true) {
    heroSkill = Math.floor(Math.random() * 100);
  }
  var currentPlayer = window.location.pathname.split("/").pop();
  $.get("/api/player/" + currentPlayer, function(data) {
    var hero = {
      name: heroName,
      pic: heroPic,
      strength: heroStr,
      intelligence: heroInt,
      skill: heroSkill,
      PlayerId: data.id,
      votes: 0
    };
    if (data.teamSize < 3) {
      data.teamSize += 1;
      $.post("/api/characters", hero, function() {
        console.log("Drafted!");
      });
      $.ajax({
        url: "../api/player-team-boost/" + data.id,
        type: "PUT",
        data: data.id
      }).then(function() {
        console.log("your team size is now " + data.teamSize);
        currentRoster(currentPlayer);
      });
      $(".picked-card").remove();
    } else if (data.teamSize >= 3) {
      alert("Sorry, you can't draft anymore characters, your team is full!");
    }
  });
};

var makeHero = function(event) {
  event.preventDefault();
  if (
    $("#str-pick").val() !== $("#int-pick").val() &&
    $("#int-pick").val() !== $("#skl-pick").val() &&
    $("#skl-pick").val() !== $("#str-pick").val()
  ) {
    var heroName = $("#custom-name")
      .val()
      .trim();
    var heroPic = $("#custom-pic")
      .val()
      .trim();
    var heroStr = calculatePower($("#str-pick").val());
    var heroInt = calculatePower($("#int-pick").val());
    var heroSkill = calculatePower($("#skl-pick").val());

    var currentPlayer = window.location.pathname.split("/").pop();
    $.get("/api/player/" + currentPlayer, function(data) {
      var hero = {
        name: heroName,
        pic: heroPic,
        strength: heroStr,
        intelligence: heroInt,
        skill: heroSkill,
        PlayerId: data.id,
        votes: 0
      };
      if (data.teamSize < 3) {
        data.teamSize += 1;
        $.post("/api/characters", hero, function() {
          console.log("Drafted!");
        }).then(function() {
          $.ajax({
            url: "../api/player-team-boost/" + data.id,
            type: "PUT",
            data: data.id
          }).then(function() {
            console.log("your team size is now " + data.teamSize);
            currentRoster(currentPlayer);
          });
        });
        $(".picked-card").remove();
      } else if (data.teamSize >= 3) {
        alert("Sorry, you can't draft anymore characters, your team is full!");
      }
    });
  } else if (
    $("#custom-name")
      .val()
      .trim() === "" ||
    $("#custom-pic")
      .val()
      .trim() === ""
  ) {
    alert("Please enter a name and picture!");
  } else {
    alert(
      "Please reselect the character's strongest, average, and weakest stats. Choose one of each!"
    );
  }
};

var deleteHero = function(event) {
  event.preventDefault();
  event.stopPropagation();
  var currentPlayer = window.location.pathname.split("/").pop();
  var heroToDelete = $(this).attr("id");
  console.log(heroToDelete);
  $.ajax({
    method: "DELETE",
    url: "/api/character/" + heroToDelete
  }).then(function() {
    console.log("Character deleted");
  });
  $.get("/api/player/" + currentPlayer, function(data) {
    data.teamSize -= 1;
    $.ajax({
      url: "../api/player-team-cut/" + data.id,
      type: "PUT",
      data: data.id
    }).then(function() {
      console.log("your team size is now " + data.teamSize);
    });
  });
  currentRoster(currentPlayer);
};

var calculatePower = function(stat) {
  if (stat === "Strongest stat") {
    stat = Math.floor(Math.random() * (100 - 70 + 1)) + 70;
  }
  if (stat === "Average stat") {
    stat = Math.floor(Math.random() * (70 - 50 + 1)) + 50;
  }
  if (stat === "Weakest stat") {
    stat = Math.floor(Math.random() * 50);
  }

  return stat;
};

var currentRoster = function(currentPlayer) {
  $("#lineup").empty();
  $.get("/api/player/" + currentPlayer, function(data) {
    for (var i = 0; i < data.Characters.length; i++) {
      $("#lineup").append(
        "<li style='list-style-type: none;'>" +
        "<img class='hero-pic' src='" +
          data.Characters[i].pic +
          "' alt='photo not found' style='height: 50px;' class='img-thumbnail rounded-circle'></img>" +
          data.Characters[i].name +
          "&nbsp;&nbsp;&nbsp;<button id='" +
          data.Characters[i].name +
          "' class='btn delete-hero'>Delete</button></li>"
      );
    }
  });
};

$makeYourOwn.on("click", makeHero);
$signIn.on("click", signUpPlayer);
$findHeroes.on("click", searchHeroes);
//$findHeroes.on("click", alternateDraft);
$(document).on("click", ".superhero-card", draftHero);
$(document).on("click", ".delete-hero", deleteHero);
