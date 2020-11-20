console.log('===================== Rock Paper Scissors Lizard Spock ====================');

const readline = require("readline-sync");

const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

const score = {
  player: 0,
  computer: 0
};

const promptUser = (message) => console.log(`=> ${message}\n`);

const getUserAnswer = (ask) => readline.question(promptUser(ask)).toLowerCase();

const getValidNumber = (number, lowestNum = 0) => {
  if (Number.isNaN(parseFloat(number))) {
    const newNumber = readline.question(promptUser("Hmmm... that's not a valid number... Please try again with a valid number.\n"));
    return getValidNumber(newNumber);
  }

  if (!(number >= lowestNum)) {
    const newNumber = readline.question(promptUser(`Hmmm... please enter a number that is at least ${lowestNum}.\n`));
    return getValidNumber(newNumber);
  }

  return Number(number);
};

const getYesOrNo = () => {
  const askToKeepGoing = (message = `Please enter Yes or no`) => {
    return readline.question(promptUser(message))
      .trim()
      .toLowerCase();
  };
  const validResponses = ['yes', 'no'];

  let answer = null;
  while (!validResponses.includes(answer)) {
    answer = askToKeepGoing();
  }

  return answer === 'yes';
};

const reducer = (acc, choice) => {
  const chars = choice[0] === 's'
    ? choice.slice(0, 2)
    : choice[0];

  acc.validChoicesMapped.push(chars);
  acc.choiceMapping[chars] = choice;
  return acc;
};

const accumulator = {
  validChoicesMapped: [],
  choiceMapping: {}
};

const {
  validChoicesMapped,
  choiceMapping
} = VALID_CHOICES.reduce(reducer, accumulator);

// eslint-disable-next-line max-lines-per-function, max-statements
const getChoice = (computer = true) => {
  let choice = {
    value: null,
    display: null,
  };

  if (computer) {
    const randomIndex = Math.floor(Math.random() * validChoicesMapped.length);
    choice.value = validChoicesMapped[randomIndex];
  } else {
    const selectionsDisplay = VALID_CHOICES.map(choice => {
      return choice[0] === 's'
        ? `${choice.slice(0, 2)} - ${choice}`
        : `${choice[0]}  - ${choice}`;
    });

    const pickSelection = `Please select one:\n${selectionsDisplay.join("\n")}`;
    choice.value = getUserAnswer(pickSelection);

    while (!validChoicesMapped.includes(choice.value)) {
      if (choice.value === 's') {
        const wantScissorsOrSpock = "Please select:\nsc - scissors\nsp - Spock";
        choice.value = getUserAnswer(wantScissorsOrSpock);
      } else {
        promptUser("Hmmm... that's not a valid choice... Please try again.\n");
        choice.value = getUserAnswer(pickSelection);
      }
    }
  }
  choice.display = choiceMapping[choice.value];

  return choice;
};

const displayWinner = (game = false, roundWinner = null) => {
  if (game) {
    const { player, computer } = score;
    if (player === computer) {
      promptUser("Its a tie!!!");
    } else {
      const winner = computer > player ? "Computer" : "YOU";
      promptUser(`*** ${winner} WON THE GAME! ****`);
    }
  } else if (roundWinner) {
    promptUser(`${roundWinner} won the round!`);
  }
};


const displayScore = ({ player, computer }) => {
  promptUser("======== Score ===========");
  promptUser(`You: ${player} || Computer: ${computer}`);
};

// eslint-disable-next-line max-lines-per-function, max-statements, complexity
const playRound = (roundNum) => {
  promptUser(`============= Round ${roundNum} =============`);
  const {
    value: userChoice,
    display: userChoiceDisplay
  } = getChoice(false);
  const {
    value: computerChoice,
    display: computerChoiceDisplay
  } = getChoice();

  promptUser(`You chose ${userChoiceDisplay} | computer chose ${computerChoiceDisplay}`);

  if (
    (userChoice === 'r' && computerChoice === 'sc') ||
    (userChoice === 'r' && computerChoice === 'l') ||
    (userChoice === 'p' && computerChoice === 'r') ||
    (userChoice === 'p' && computerChoice === 'sp') ||
    (userChoice === 'sc' && computerChoice === 'p') ||
    (userChoice === 'sc' && computerChoice === 'l') ||
    (userChoice === 'l' && computerChoice === 'sp') ||
    (userChoice === 'sp' && computerChoice === 'sc') ||
    (userChoice === 'sp' && computerChoice === 'r') ||
    (userChoice === 'l' && computerChoice === 'p')) {
    score.player++;
    displayWinner(false, "You");
  } else if (
    (computerChoice === 'r' && userChoice === 'sc') ||
    (computerChoice === 'r' && userChoice === 'l') ||
    (computerChoice === 'p' && userChoice === 'r') ||
    (computerChoice === 'p' && userChoice === 'sp') ||
    (computerChoice === 'sc' && userChoice === 'p') ||
    (computerChoice === 'sc' && userChoice === 'l') ||
    (computerChoice === 'l' && userChoice === 'sp') ||
    (computerChoice === 'sp' && userChoice === 'sc') ||
    (computerChoice === 'sp' && userChoice === 'r') ||
    (computerChoice === 'l' && userChoice === 'p')) {
    score.computer++;
    displayWinner(false, "Computer");
  } else {
    promptUser("It's a tie! - Let's try that again....");
    playRound(roundNum);
  }

  displayScore(score);
};

const startGame = (rounds) => {
  for (let i = 1; i <= rounds; i++) { // eslint-disable-line id-length
    playRound(i);
  }
  displayWinner(true);
};

while (true) {
  const numberOfRounds = getValidNumber(readline.question(promptUser("How many rounds would you like to play?")));

  promptUser(`Best of ${numberOfRounds} wins.`);

  promptUser('May the best man / woman / lizard / spock win!');

  startGame(numberOfRounds);

  promptUser("Do you want to play again?");

  const wantsToPlayAgain = getYesOrNo();

  if (!wantsToPlayAgain) break;
}

console.log("=========== Thanks for playing ===========");