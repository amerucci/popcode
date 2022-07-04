//VARIABLE
var elem = document.getElementById("myBar");  
var score = document.getElementById("loadedpercent"); 
var loaderContenainer = document.querySelector(".loaderContenainer") 
var instructions = document.querySelector(".instructions")
var loader = document.querySelector("#loader")
var startGame = document.querySelector("#startGame")
var game = document.querySelector("#game")

//FUNCTIONS
function move() {
    var width = 1;
    var id = setInterval(frame, 33);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++; 
        elem.style.width = width + '%';
       score.innerHTML = width * 1  + '%'; 
      }
    }
  }

  function showContent() {
    loaderContenainer.style.display = "none";
    instructions.style.display = "flex";
  }

  function enterGame(){
    loader.style.display = "none"
    game.style.display = "flex"
  }

//ACTIONS

window.onload = move;
setTimeout(showContent, 4000);
startGame.addEventListener("click",enterGame);


     
 