//VARIABLE
var elem = document.getElementById("myBar");
var score = document.getElementById("loadedpercent");
var loaderContenainer = document.querySelector(".loaderContenainer")
var instructions = document.querySelector(".instructions")
var loader = document.querySelector("#loader")
var startGame = document.querySelector("#startGame")
var game = document.querySelector("#game")
var inGame = false
var isTyping = false
var theAnswer = document.querySelector("#theAnswer")
var close = document.querySelector("#close")
var languageFound = document.querySelector(".languageFound")
let languages = [
    "Javascript",
    "HTML",
    "CSS",
    "Python",
    "Java",
    "Bash",
    "Powershell",
    "c#",
    "PHP",
    "c++",
    "TypeScript",
    "C",
    "Ruby",
    "Go",
    "Assembly",
    "Swift",
    "Kotlin",
    "R",
    "VBA",
    "Objective-c",
    "Scala",
    "Rust",
    "Dart",
    "Elixir",
    "Clojure",
    "WebAssembly"
]
var languageFrounded = []
let scoreFind = document.querySelector(".scoreFind")
let scoreErrorOne = document.querySelector(".scoreErrorOne")
let scoreErrorTwo = document.querySelector(".scoreErrorTwo")
let scoreErrorThree = document.querySelector(".scoreErrorThree")
let zoomProgress = document.querySelector(".zoomProgress")

let founded = 0
let errors = 0


window.addEventListener("load", function () {
    scoreFind.innerHTML = founded
})

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
            score.innerHTML = width * 1 + '%';
        }
    }
}

function showContent() {
    loaderContenainer.style.display = "none";
    instructions.style.display = "flex";
}

function enterGame() {
    loader.style.display = "none"
    game.style.display = "flex"
    inGame = true
}

function checkLanguage() {
    console.log(languageFrounded)
    let language = theAnswer.value
    let find = false
    let alreadyFounded = false
    for (var i = 0; i < languages.length; i++) {
        if (language.toLowerCase().replace("é", "e") === languages[i].toLowerCase().replace("é", "e")) {
            
            
        let existinarray = language.toLowerCase().replace("é", "e").indexOf(languageFrounded[i]);
           console.log(existinarray)

            if(existinarray == -1){
                console.log(existinarray)
                languageFrounded.push(language.toLowerCase().replace("é", "e"))
                find = true
                alreadyFounded=false
               break
                
            }

            else{
                //console.log(languageFrounded)
                find = true
                alreadyFounded=true
               break
                
            }


          
            
        } 
        
        else {
            find = false
        }
       
    }
    if (find === true && alreadyFounded===false) {
       

        founded += 1
      
        scoreFind.innerHTML = founded
    } 
    else if (find===true && alreadyFounded === true ){
        alert("toto")
    }
    else {
        errors += 1
        switch (errors) {
            case 1:
                scoreErrorOne.style = "color:#0AEFF7"
                break
            case 2:
                scoreErrorTwo.style = "color:#0AEFF7"
                break
            case 3:
                scoreErrorThree.style = "color:#0AEFF7"
                break
        }
        console.log('loupé - ' + errors + 'commises')
    }
    console.log(languageFrounded)
    return languageFrounded;
}

//ACTIONS

window.onload = move;
setTimeout(showContent, 0);
startGame.addEventListener("click", enterGame);

//ANSWER SECTION

window.addEventListener("keydown", function (event) {
    var keysAllowed = "abcdefghijklmnopqrstuvwxyz+"
    var key = event.key
    console.log(key)



    if (keysAllowed.includes(key) && inGame == true) {
        document.querySelector("#answer").style = "display:flex"
        theAnswer.value += event.key
    }

    if (key == "Enter" && theAnswer.value != "") {
        document.querySelector("#answer").style = "display:flex"
        inGame = true
        checkLanguage()
        theAnswer.value = ""
        document.querySelector("#answer").style = "display:none"
    }


    //CORRECT ANSWER
    if (key == "Backspace") {
        inGame = false
        theAnswer.focus()
    }

    //ESCAPE ANSWER SECTION
    if (key == "Escape") {
        inGame = true
        theAnswer.value = ""
        document.querySelector("#answer").style = "display:none"
        document.querySelector("#languageFounded").style = "display:none"
    }
})

document.querySelector("#theAnswer").addEventListener("click", function () {
    inGame = false
    console.log(inGame)
})

languageFound.addEventListener("click", function () {
    document.querySelector("#languageFounded").style = "display:flex"
    document.querySelector(".languageFoundedText").innerHTML = languageFrounded.join(" - ")
})