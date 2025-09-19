const humanScoreText = document.getElementById('humanScoreText');
const computerScoreText = document.getElementById('computerScoreText');
const humanChoiceText = document.getElementById('humanChoiceText');
const computerChoiceText = document.getElementById('computerChoiceText');
const matchResultText = document.getElementById('matchResultText');
const roundResultText = document.getElementById('roundResultText');
const humanChoiceBtns = document.querySelectorAll('.human-choice-btn');
const restartGameBtn = document.querySelector('.restart-game');
const tiesCountText = document.querySelector('#tiesCountText')

let humanScore = 0;
let computerScore = 0;
let tiesCount = 0
let roundResult;
let matchResult;
let displayHumanChoice;
let displayComputerChoice;
let playerSelecion;
let computerSelection;

function getCopmuterChoice() {
 let randomChoice = Math.floor(Math.random() * 3);
    switch(randomChoice){
     case 0: return "rock";
     case 1: return "paper";
     case 2: return "scissors";
    }
};

function playRound(humanChoice, computerChoice) {
    capitalizeComputerChoice = computerChoice[0].toUpperCase() + computerChoice.substring(1);
    capitalizeHumanChoice = humanChoice[0].toUpperCase() + humanChoice.substring(1);
    if(computerChoice === humanChoice) {
            roundResult = `It's a tie! ${capitalizeHumanChoice} ties with ${capitalizeComputerChoice}` 
            tiesCount++
            roundResultText.textContent = roundResult
    } else if (computerChoice == 'rock' && humanChoice == 'scissors' || 
            computerChoice == 'scissors' && humanChoice == 'paper' || 
            computerChoice == 'paper' && humanChoice == 'rock') {
        computerScore++;
        roundResult = `You lose! ${capitalizeComputerChoice} beats ${capitalizeHumanChoice}`
        roundResultText.textContent = roundResult;
    } else {
        humanScore++;
        roundResult = `You won! ${capitalizeHumanChoice} beats ${capitalizeComputerChoice}`;
        roundResultText.textContent = roundResult;
    };
    updateDisplay()
};

function updateDisplay() {
    if(computerScore == 5 || humanScore == 5){
        restartGameBtn.style.visibility = "visible";
    } else if(computerScore == 5 && computerScore > humanScore) {
        matchResult = 'Computer won! good luck next time.';
        matchResultText.textContent = matchResult;
    } else if(humanScore == 5 && computerScore < humanScore){
        matchResult = 'Congrats! you domainated the computer.';
        matchResultText.textContent = matchResult;
    }
    computerChoiceText.textContent = `Computer: ${capitalizeComputerChoice}`;
    humanChoiceText.textContent = `You: ${capitalizeHumanChoice}`;
    humanScoreText.textContent = `Your score: ${humanScore}`
    computerScoreText.textContent = `Computer score: ${computerScore}`
    if(tiesCount == 1) {
        tiesCountText.textContent = `You tied with Computer: ${tiesCount} time`
    } else if(tiesCount > 1) {
        tiesCountText.textContent = `You tied with Computer: ${tiesCount} times`
    }
};

humanChoiceBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
     computerSelection = getCopmuterChoice(); 
     switch(btn.id) {
        case "rock": playerSelecion = "rock";
        break;
        case "paper": playerSelecion = "paper";
        break;
        case "scissors": playerSelecion = "scissors";
        break;
     }
     if(computerScore == 5 || humanScore == 5) {
      return;
      } else {
       playRound(playerSelecion,  computerSelection);
     };
    })
});

function restartGame() {
    humanScore = 0;
    computerScore = 0;
    tiesCount = 0;
    roundResultText.textContent = "";
    matchResultText.textContent = "";
    computerChoiceText.textContent = "";
    humanChoiceText.textContent = "";
    humanScoreText.textContent = "";
    computerScoreText.textContent = "";
    tiesCountText.textContent = "";
    restartGameBtn.style.visibility = "hidden";
}

restartGameBtn.addEventListener("click", restartGame);