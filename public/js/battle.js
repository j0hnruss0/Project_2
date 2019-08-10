function selectHeros(event) {
  var heroes = $("input[type='radio']:checked");
  // $(heroes).animate({
  //   marginLeft: "2%",
  // });
  for(var i = 0; i< heroes.length;  i++){
    if($(heroes[i]).hasClass('captainmarvel')){
      captainmarvelAnimate();

    }else if($(heroes[i]).hasClass('superman')){
      supermanAnimate();
    }
  }

  function captainmarvelAnimate(){
    $( ".captainmarvel" ).animate({
      marginLeft: "15%",
    });
  }

  function supermanAnimate(){
    $( ".superman" ).animate({
      marginLeft: "25%",
    });
  }

  for(var j = 0; j< heroes.length;  j++){
    if($(heroes[j]).hasClass('batman')){
      batmanAnimate();

    }else if($(heroes[j]).hasClass('superman2')){
      superman2Animate();
    }
  }

  function batmanAnimate(){
    $( ".batman" ).animate({
      marginLeft: "10%",
    });
  }

  function superman2Animate(){
    $( ".superman2" ).animate({
      marginLeft: "35%",
    });
  }

  for(var e = 0; e< heroes.length;  e++){
    if($(heroes[e]).hasClass('ironman')){
      ironmanAnimate();

    }else if($(heroes[e]).hasClass('blackpanther')){
      blackpantherAnimate();
    }
  }

  function ironmanAnimate(){
    $( ".ironman" ).animate({
      marginLeft: "32%",
    });
  }

  function blackpantherAnimate(){
    $( ".blackpanther" ).animate({
      marginLeft: "20%",
    });
  }

  for(let k = 0; k< heroes.length;  k++){
    if($(heroes[k]).hasClass('deadpool')){
      deadpoolAnimate();

    }else if($(heroes[k]).hasClass('xmen')){
      xmenAnimate();
    }
  }

  function deadpoolAnimate(){
    $( ".deadpool" ).animate({
      marginLeft: "30%",
    });
  }

  function xmenAnimate(){
    $( ".xmen" ).animate({
      marginLeft: "14%",
    });
  }
};

$( "#fight" ).on('click', selectHeros);

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
