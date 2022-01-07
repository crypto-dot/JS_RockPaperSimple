// Player options
const choices = document.querySelectorAll(".choices > div");

function enableSelection() {

choices.forEach(choice => choice.addEventListener("mouseenter", mouseEnter)); 
choices.forEach(choice => choice.addEventListener("mouseleave", mouseLeave )); 
choices.forEach(choice => choice.addEventListener("click", mouseClick));

}

function disableSelection() {
    choices.forEach(choice => choice.removeEventListener("mouseenter", mouseEnter)); 
    choices.forEach(choice => choice.removeEventListener("mouseleave", mouseLeave )); 
    choices.forEach(choice => choice.removeEventListener("click", mouseClick));
}

function clearComputerSelection() {
    computerChoiceHighlighted = document.querySelector(".container > .highlighted");
    if(computerChoiceHighlighted != null){
        computerChoiceHighlighted.classList.remove("highlighted");
    }
}
//event listeners

let playerChoice;
let executedClick = false;

function mouseEnter(e) {
    this.classList.add("highlighted");
}

function mouseLeave(e) {
    if(playerChoice == this){
        return;
    }
    this.classList.remove("highlighted");
}

async function mouseClick(e) {
        console.log('c');
        clearComputerSelection();
        const scoreboard = document.querySelector(".scoreboard-container > .scoreboard");
        scoreboard.style.cssText = "";
        scoreboard.textContent = "Good Luck! (Best 3 out of 5)";
        if(playerChoice == this){
            await(game(playerChoice));
        }
        else if(playerChoice != null){
            playerChoice.classList.remove("highlighted");
            playerChoice = this;
            playerChoice.classList.add("highlighted");
            await(game(playerChoice));
        }
        else {
            playerChoice = this;
            playerChoice.classList.add("highlighted");
            await(game(playerChoice));

        }
}

enableSelection();

async function game(playerChoice){
        disableSelection();
        let computerInput = computerPlay();
        computerInput.then((val) => playRound(playerChoice.dataset.choice,val.dataset.choice));
}

function playRound(input, computerSelection){
        if(input === computerSelection) {
            scoreboardTie();
        } 

        else if(input === "rock") {
            if(computerSelection === "paper"){
                scoreboardLose();
            }
            else{
                scoreboardWin();
            }
        }

        else if(input === "paper") {
            if(computerSelection === "scissors"){
                scoreboardLose();
            }
            else{
                scoreboardWin();
            }
        }

        else if(input === "scissors"){
            if(computerSelection === "rock"){
                scoreboardLose();
            }
            else{
                scoreboardWin();
            }
        }

}

function scoreboardLose(){
    const scoreboard = document.querySelector(".scoreboard-container > .scoreboard");
    scoreboard.textContent = "YOU LOSE";
    scoreboard.style.cssText = "color: red; text-shadow: 0px 0px 5px red;";
    counterBar("lose");

}
function scoreboardTie(){
    const scoreboard = document.querySelector(".scoreboard-container > .scoreboard");
    scoreboard.textContent = "YOU TIED!";
    scoreboard.style.cssText = "color: grey; text-shadow: 0px 0px 5px grey;";
    counterBar("tie");
}
function scoreboardWin(){
    const scoreboard = document.querySelector(".scoreboard-container > .scoreboard");
    scoreboard.textContent = "YOU WIN";
    scoreboard.style.cssText = "color: green; text-shadow: 0px 0px 5px green;";
    counterBar("win");
}
var prevOutcome;
var linearGradientSetting = "background: linear-gradient(to right, white 0%)";
var insertionLocation = linearGradientSetting.indexOf('w') - 2;
var startingPercentage = "0"
var endingPercentage = "14";
var stats = document.querySelector(".scoreboard-container > .counter");
var playerScore = 0;
var computerScore = 0;
function counterBar(outcome){
    if(outcome == "win"){
        stringStatusCSSText("green");
     playerScore++;
    }
    else if (outcome == "lose"){
        stringStatusCSSText("red");
     computerScore++;
    }
    else {
        stringStatusCSSText("grey");
    }

}
var lastRound = false;
function stringStatusCSSText(color){
    if(!lastRound){
        let lastPartOfLinearGradientSetting = linearGradientSetting.slice(insertionLocation);
        lastPartOfLinearGradientSetting = lastPartOfLinearGradientSetting.substr(0,lastPartOfLinearGradientSetting.indexOf("e") + 2) + endingPercentage + "%)";
        let colorIdentifierStr = `,${color} ${startingPercentage}% ${endingPercentage}%`;
        linearGradientSetting = `${linearGradientSetting.slice(0,insertionLocation)} ${colorIdentifierStr}${lastPartOfLinearGradientSetting}`;
        stats.style.cssText = linearGradientSetting;
    }
    else {
        let colorIdentifierStr = `,${color} ${startingPercentage}% ${endingPercentage}%`;
        linearGradientSetting = `${linearGradientSetting.slice(0,insertionLocation)} ${colorIdentifierStr}`;
        stats.style.cssText = linearGradientSetting;
    }

    startingPercentage = endingPercentage;
    insertionLocation = linearGradientSetting.indexOf('w') - 2;
    endingPercentage = String(Number(endingPercentage) + 25);

    if(endingPercentage >= 100 && !lastRound){
        endingPercentage = startingPercentage;
        lastRound = true;
    }
    else if(lastRound){
        if (playerScore >= 3){
            const scoreboard = document.querySelector(".scoreboard-container > .scoreboard");
            scoreboard.textContent = "YOU WON THE GAME!";
            scoreboard.style.cssText = "";
            return;
        }
        else if (computerScore >= 3){
            const scoreboard = document.querySelector(".scoreboard-container > .scoreboard");
            scoreboard.textContent = "Unfortunately you lost... Better luck next time!";
            scoreboard.style.cssText = "";
            return;
        }
        else {
            const scoreboard = document.querySelector(".scoreboard-container > .scoreboard");
            scoreboard.textContent = "Tie! No Winners or Losers... Looks like you found your equal match!";
            scoreboard.style.cssText = "";
            return;
        }
    }
    enableSelection();
}


const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function computerPlay() {        
    let computerChoices = document.querySelectorAll(".container > div");
    let compArray = Array.from(computerChoices);
    let highlightedChoicePicker;
    let endingAmount = Math.floor(( 3 * Math.random() ) + 24);
    for(let i = 0; i < endingAmount; i++){
        highlightedChoicePicker = compArray[i%3];
        if(i == endingAmount - 1){
            highlightedChoicePicker.classList.add("highlighted");
            break;
        }
        else if(i > endingAmount - 10){
            highlightedChoicePicker.classList.add("highlighted");
            await(sleep(500));
            highlightedChoicePicker.classList.remove("highlighted");
        }
        else if(i > endingAmount - 20){
            highlightedChoicePicker.classList.add("highlighted");
            await(sleep(200));
            highlightedChoicePicker.classList.remove("highlighted");

        }
        else {
            highlightedChoicePicker.classList.add("highlighted");
            //Allows for small delay so players can actually see the loop being executed
            await(sleep(100));
            highlightedChoicePicker.classList.remove("highlighted");
        }

        }
        return highlightedChoicePicker;
    }