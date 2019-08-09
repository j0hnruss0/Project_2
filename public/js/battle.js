$("#fight").click(function() {
  $("#captainmarvel").animate(
    {
      width: "60%",
      opacity: 0.4,
      marginLeft: "0.6in",
      borderWidth: "10px"
    },
    1500
  );
});

$( "#fight" ).click(function() {
  $( "#batman" ).animate({
    width: "60%",
    opacity: 0.4,
    marginLeft: "0.6in",
    borderWidth: "10px"
  }, 1500 );
});

$( "#fight" ).click(function() {
  $( "#ironman" ).animate({
    width: "60%",
    opacity: 0.4,
    marginLeft: "0.6in",
    borderWidth: "10px"
  }, 1500 );
});

$( "#fight" ).click(function() {
  $( "#deadpool" ).animate({
    width: "60%",
    opacity: 0.4,
    marginLeft: "0.6in",
    borderWidth: "10px"
  }, 1500 );
});

$("#new-battle").on("click", function() {
  var currentPlayer = window.location.pathname.split("/").pop();
  $.ajax({
    url: "../api/players",
    type: "GET"
  }).then(function(data) {
    $("#opponent-buttons").empty();
    for (var i = 0; i < data.length; i++) {
      if (data[i].name !== currentPlayer && data[i].teamSize === 3) {
        $("#opponent-buttons").append(
          "<button class='btn btn-danger opp-button'>" +
            data[i].name +
            "</button>"
        );
      }
    }
  });
});

$(document).on("click", ".opp-button", function() {
  console.log($(this).text());
  var opponent = $(this).text();
  $.ajax({
    url: "../api/player/" + opponent,
    type: "GET"
  }).then(function(oppData) {
    $("#Superman").attr("src", oppData.Characters[0].pic);
    $("#Superman2").attr("src", oppData.Characters[1].pic);
    $("#Black-Panther").attr("src", oppData.Characters[2].pic);
  });
});

// $( "#left" ).click(function() {
//     $( "#Captain-Marvel" ).animate({
//       opacity: 0.25,
//       left: "+=50",
//       height: "toggle"
//     }, 5000, function() {
//       // Animation complete.
//     });
//   });

  // $( "#left" ).click(function() {
  //   $( "#Captain-Marvel" ).animate({
  //     width: "60%",
  //     opacity: 0.4,
  //     marginLeft: "0.6in",
  //     borderWidth: "10px"
  //   }, 1500 );
  // });

  // $( "#right" ).click(function() {
  //   $( "#Superman" ).animate({
  //     width: "60%",
  //     opacity: 0.4,
  //     marginRight: "0.6in",
  //     borderWidth: "10px"
  //   }, 1500 );
  // });

  // $( "#left2" ).click(function() {
  //   $( "#Batman" ).animate({
  //     width: "60%",
  //     opacity: 0.4,
  //     marginLeft: "0.6in",
  //     borderWidth: "10px"
  //   }, 1500 );
  // });

  // $( "#right2" ).click(function() {
  //   $( "#Superman2" ).animate({
  //     width: "60%",
  //     opacity: 0.4,
  //     marginRight: "0.6in",
  //     borderWidth: "10px"
  //   }, 1500 );
  // });

  // $( "#left3" ).click(function() {
  //   $( "#Iron-Man" ).animate({
  //     width: "60%",
  //     opacity: 0.4,
  //     marginLeft: "0.6in",
  //     borderWidth: "10px"
  //   }, 1500 );
  // });

  // $( "#right3" ).click(function() {
  //   $( "#Black-Panther" ).animate({
  //     width: "60%",
  //     opacity: 0.4,
  //     marginRight: "0.6in",
  //     borderWidth: "10px"
  //   }, 1500 );
  // });

  // $( "#left4" ).click(function() {
  //   $( "#Deadpool" ).animate({
  //     width: "60%",
  //     opacity: 0.4,
  //     marginLeft: "0.6in",
  //     borderWidth: "10px"
  //   }, 1500 );
  // });

  // $( "#right4" ).click(function() {
  //   $( "#X-Men" ).animate({
  //     width: "60%",
  //     opacity: 0.4,
  //     marginRight: "0.6in",
  //     borderWidth: "10px"
  //   }, 1500 );
  // });