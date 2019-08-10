// var selectedHeroes = [];
function selectHeros(event) {
  var heroes = $("input[type='radio']:checked");
  // $(heroes).animate({
  //   marginLeft: "2%",
  // });
  for(let i = 0; i< heroes.length;  i++){
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

  for(let j = 0; j< heroes.length;  j++){
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

  for(let e = 0; e< heroes.length;  e++){
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
  
 
  /**
   * read the input selection value
   * add superhero selected to global array
   * superhero and which side
   */
}

// $( "#fight" ).click(function() {

//   /** (input === 2)
//    * checks if any superhero selected, at least 2. both should have same amount selected
//    * if so, animate them
//    * if not, display message that heros need to be selected
//    */

// }


// $( "#fight" ).click(function(event) {
//   selectHeros(event);
  // $( "#captainmarvel" ).animate({
  //   width: "60%",
  //   opacity: 0.8,
  //   marginLeft: "0.6in",
  //   borderWidth: "10px"
  // }, 1500 );
// });

$( "#fight" ).on('click', selectHeros);
  
  // $( "#captainmarvel" ).animate({
  //   width: "60%",
  //   opacity: 0.8,
  //   marginLeft: "0.6in",
  //   borderWidth: "10px"
  // }, 1500 );
// });

// $( "#fight" ).click(function() {
//   $( "#batman" ).animate({
//     width: "80%",
//     opacity: 0.6,
//     marginLeft: "0.2in",
//     borderWidth: "10px"
//   }, 1500 );
// });

// $( "#fight" ).click(function() {
//   $( "#ironman" ).animate({
//     width: "50%",
//     opacity: 0.7,
//     marginLeft: "4.0in",
//     borderWidth: "10px"
//   }, 1500 );
// });

// $( "#fight" ).click(function() {
//   $( "#deadpool" ).animate({
//     width: "40%",
//     opacity: 0.5,
//     marginLeft: "1.5in",
//     borderWidth: "10px"
//   }, 1500 );
// });

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