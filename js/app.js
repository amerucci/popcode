//VARIABLE
var elem = document.getElementById("myBar");
var score = document.getElementById("loadedpercent");
var loaderContenainer = document.querySelector(".loaderContenainer");
var instructions = document.querySelector(".instructions");
var loader = document.querySelector("#loader");
var startGame = document.querySelector("#startGame");
var game = document.querySelector("#game");
var inGame = false;
var isTyping = false;
var theAnswer = document.querySelector("#theAnswer");
var close = document.querySelector("#close");
var languageFound = document.querySelector(".languageFound");
let languages = [
  "javascript",
  "html",
  "css",
  "python",
  "java",
  "bash",
  "powershell",
  "c#",
  "php",
  "c++",
  "typescript",
  "c",
  "ruby",
  "go",
  "assembly",
  "swift",
  "kotlin",
  "r",
  "vba",
  "objective-c",
  "scala",
  "rust",
  "dart",
  "elixir",
  "clojure",
  "webassembly",
  "sql",
];
var languageFrounded = [];
let scoreFind = document.querySelector(".scoreFind");
let scoreErrorOne = document.querySelector(".scoreErrorOne");
let scoreErrorTwo = document.querySelector(".scoreErrorTwo");
let scoreErrorThree = document.querySelector(".scoreErrorThree");
let zoomProgress = document.querySelector(".zoomProgress");
let checkBox = document.querySelector("#autocloseLabelCheckBox");
let checked = false;

let founded = 0;
let errors = 0;

window.addEventListener("load", function () {
  scoreFind.innerHTML = founded;
});

//FUNCTIONS

function restartGame(){
    languageFrounded = [];
    founded = 0;
    errors = 0;
    inGame = true
    document.querySelector("#youWin").style =
    "display:none;";
    document.querySelector("#youLose").style =
    "display:none;";
    scoreFind.innerHTML = "00"
    scoreErrorOne.style = "color:#FFF";
    scoreErrorTwo.style = "color:#FFF";
    scoreErrorThree.style = "color:#FFF";

  document.querySelector("#explaination").style = "display:none";
  checked = false;


}

function move() {
  var width = 1;
  var id = setInterval(frame, 33);

  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + "%";
      score.innerHTML = width * 1 + "%";
    }
  }
}

function showContent() {
  loaderContenainer.style.display = "none";
  instructions.style.display = "flex";
}

function hideAlreadyFind() {
  document.querySelector("#aleradyFounded").style = "display:none";
  theAnswer.value = "";
}

function autoHide() {
  document.querySelector("#explaination").style = "display:none";
  theAnswer.value = "";
}

function enterGame() {
  loader.style.display = "none";
  game.style.display = "flex";
  inGame = true;
}

async function getDescription() {
  inGame = false
  let response = await fetch("./js/languages.json");
  if (response.ok) {
    let data = await response.json();
    //console.log(data.languages.langage)
    const index = data.languages.langage.findIndex((object) => {
      return object.name === theAnswer.value.toLowerCase().replace("é", "e");
    });

    console.log(data.languages.langage[index].description);
    document.querySelector(".explainationTitle").innerHTML =
      data.languages.langage[index].name;
    document.querySelector(".explainationText").innerHTML =
      data.languages.langage[index].description;
    document.querySelector(".explainationPicture").innerHTML =
      "<img src='" + data.languages.langage[index].picture + "' />";

    theAnswer.value = "";
  } else {
    console.log("error");
  }
}

/**********************
 * FUNCTION GETLEGALS *
 **********************/

async function getLegals() {
  inGame = false
  let response = await fetch("./js/languages.json");
  if (response.ok) {
    let data = await response.json();
    let explainationTitle = document.querySelectorAll(".explainationTitle");
    let explainationText = document.querySelectorAll(".explainationText");
    explainationTitle[1].innerHTML = data.legals.legal[0].title;
    explainationText[1].innerHTML = data.legals.legal[0].content;
  } else {
    console.log("error");
  }
}

/****************************
 * FUNCTION GETCONFIDENTIAL *
 ****************************/

async function getConfidential() {
  let response = await fetch("./js/languages.json");
  if (response.ok) {
    let data = await response.json();
    let explainationTitle = document.querySelectorAll(".explainationTitle");
    let explainationText = document.querySelectorAll(".explainationText");
    explainationTitle[1].innerHTML = data.legals.confidential[0].title;
    explainationText[1].innerHTML = data.legals.confidential[0].content;
  } else {
    console.log("error");
  }
}

function checkLanguage() {
  console.log(languageFrounded);
  let language = theAnswer.value;
  let find = false;
  let alreadyFounded = false;
  if (languages.indexOf(language.toLowerCase().replace("é", "e")) === -1) {
    console.log("n'est pas dans le tableau");
    find = false;
  } else {
    console.log(language + " est dans le tableau");
    if (languageFrounded.indexOf(language) === -1) {
      languageFrounded.push(language.toLowerCase().replace("é", "e"));
      find = true;
      alreadyFounded = false;
    } else {
      find = true;
      alreadyFounded = true;
    }
  }
  if (find === true && alreadyFounded === false) {
    founded += 1;
    if (founded < 10) {
      scoreFind.innerHTML = "0" + founded;
    } else {
      scoreFind.innerHTML = founded;
    }

    if (founded == 27) {
      document.querySelector("#youWin").style =
        "display:flex;     background: rgba(0, 0, 0, 1);";

      inGame = false;
    }

    document.querySelector("#explaination").style = "display:flex";
    document.querySelector(".explainationTitle").innerHTML = language;
    getDescription();
    if (checked == true) {
      autoHide();
    }
  } else if (find === true && alreadyFounded === true) {
    document.querySelector("#aleradyFounded").style = "display:flex";
    setTimeout(hideAlreadyFind, 800);
  } else {
    theAnswer.value = "";
    errors += 1;
    switch (errors) {
      case 1:
        scoreErrorOne.style = "color:#0AEFF7";
        break;
      case 2:
        scoreErrorTwo.style = "color:#0AEFF7";
        break;
      case 3:
        scoreErrorThree.style = "color:#0AEFF7";
        document.querySelector("#youLose").style =
          "display:flex; background: rgba(0, 0, 0, 1)";
        break;
    }
    console.log("loupé - " + errors + "commises");
  }
  console.log(languageFrounded);
}

//ACTIONS

window.onload = move;
setTimeout(showContent, 0);
startGame.addEventListener("click", enterGame);

//ANSWER SECTION

window.addEventListener("keydown", function (event) {
  var keysAllowed = "abcdefghijklmnopqrstuvwxyz+-#";
  var key = event.key;
  console.log(key);

  if (keysAllowed.includes(key) && inGame == true) {
    document.querySelector("#answer").style = "display:flex";
    theAnswer.value += event.key;
  }

  if (key == "Enter" && theAnswer.value != "") {
    document.querySelector("#answer").style = "display:flex";
    inGame = true;
    checkLanguage();
    //theAnswer.value = ""
    document.querySelector("#answer").style = "display:none";
  }

  //CORRECT ANSWER
  if (key == "Backspace") {
    inGame = false;
    theAnswer.focus();
  }

  //CORRECT ANSWER
  if (key == "Meta") {
    console.log(languageFrounded);
  }

  //ESCAPE ANSWER SECTION
  if (key == "Escape") {

    inGame = true;
    theAnswer.value = "";
    document.querySelector("#answer").style = "display:none";
    document.querySelector("#languageFounded").style = "display:none";
    document.querySelector("#aleradyFounded").style = "display:none";
    document.querySelector("#explaination").style = "display:none";
    document.querySelector("#legals").style = "display:none";
  }
});

document.querySelector("#theAnswer").addEventListener("click", function () {
  inGame = false;
  console.log(inGame);
});

languageFound.addEventListener("click", function () {
  inGame = false 
  document.querySelector("#languageFounded").style = "display:flex";
  console.log(languageFrounded.length);
  if (languageFrounded.length == 0) {
    document.querySelector(".languageFoundedText").innerHTML =
      "Aucun langage trouvé";
  } else {
    document.querySelector(".languageFoundedText").innerHTML =
      languageFrounded.join(" - ");
  }
});

//LEGALS CLICK
document.querySelector(".legal").addEventListener("click", function () {
  document.querySelector("#legals").style = "display:flex";
  getLegals();
});



//BUTTON CLOSE
let closeBtn = document.querySelectorAll(".closeBtn");
closeBtn.forEach((btn) => {

  btn.addEventListener("click", function () {
    inGame = true
    document.querySelector("#explaination").style = "display:none";
    document.querySelector("#legals").style = "display:none";
    document.querySelector("#answer").style = "display:none";
    document.querySelector("#languageFounded").style = "display:none";
    document.querySelector("#aleradyFounded").style = "display:none";
    theAnswer.value = "";
  });
});

// CHECKBOX

checkBox.addEventListener("change", function () {
  if (this.checked) {
    checked = true;
  } else {
    checked = false;
    console.log("Checkbox is not checked..");
  }
});

// CURSOR

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.setAttribute(
    "style",
    "top:" + (e.pageY - 20) + "px; left:" + (e.pageX - 20) + "px;"
  );
});

document.addEventListener("click", () => {
  cursor.classList.add("expand");

  setTimeout(() => {
    cursor.classList.remove("expand");
  }, 500);
});

let restart = document.querySelectorAll(".restartGame")
restart.forEach((restartBtn) => {
    restartBtn.addEventListener("click", restartGame);
})



