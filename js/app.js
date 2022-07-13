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
    "Webassembly",
    "sql"
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



function hideAlreadyFind() {
    document.querySelector("#aleradyFounded").style = "display:none"

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
    if (languages.indexOf(language.toLowerCase().replace("é", "e")) === -1) {
        console.log("n'est pas dans le tableau")
        find = false
    } else {
        console.log(language + " est dans le tableau")
        if (languageFrounded.indexOf(language) === -1) {
            languageFrounded.push(language.toLowerCase().replace("é", "e"))
            find = true
            alreadyFounded = false
        } else {
            find = true
            alreadyFounded = true
        }
    }
    if (find === true && alreadyFounded === false) {
        founded += 1
        scoreFind.innerHTML = founded
    } else if (find === true && alreadyFounded === true) {
        document.querySelector("#aleradyFounded").style = "display:flex"
        setTimeout(hideAlreadyFind, 1000);
    } else {
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

}

//ACTIONS

window.onload = move;
setTimeout(showContent, 0);
startGame.addEventListener("click", enterGame);

//ANSWER SECTION

window.addEventListener("keydown", function (event) {
    var keysAllowed = "abcdefghijklmnopqrstuvwxyz+-#"
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

    //CORRECT ANSWER
    if (key == "Meta") {
        console.log(languageFrounded)
    }

    //ESCAPE ANSWER SECTION
    if (key == "Escape") {
        inGame = true
        theAnswer.value = ""
        document.querySelector("#answer").style = "display:none"
        document.querySelector("#languageFounded").style = "display:none"
        document.querySelector("#aleradyFounded").style = "display:none"
    }
})

document.querySelector("#theAnswer").addEventListener("click", function () {
    inGame = false
    console.log(inGame)
})

languageFound.addEventListener("click", function () {
    document.querySelector("#languageFounded").style = "display:flex"
    console.log(languageFrounded.length)
    if (languageFrounded.length == 0) {
        document.querySelector(".languageFoundedText").innerHTML = "Aucun langage trouvé"
    } else {

        document.querySelector(".languageFoundedText").innerHTML = languageFrounded.join(" - ")
    }
})