/* eslint-disable max-statements, no-unused-vars, no-loop-func, max-len, max-lines-per-function, complexity*/
const readline = require('readline-sync');

const promptUser = (message) => console.log(`=> ${message}\n`);

const getUserAnswer = (ask) => readline.question(promptUser(ask)).toLowerCase();

const askToPlayGame = () => {
  const answer = getUserAnswer("Would you like to start a new game");
  const validAnswers = ["yes", "no"];

  if (!validAnswers.includes(answer.toLowerCase())) {
    askToPlayGame();
  } else if (answer.toLowerCase() === "yes") {
    return true;
  } else {
    return false;
  }
};
const askToHitOrStay = () => {
  const answer = getUserAnswer("Hit or Stay?");
  const validAnswers = ["hit", "stay"];
  let hit = false;
  let stay = false;

  if (!validAnswers.includes(answer.toLowerCase())) {
    askToPlayGame();
  } else if (answer.toLowerCase() === "hit") {
    hit = true;
  } else if (answer.toLowerCase() === "stay") {
    stay = true;
  }

  return {
    hit,
    stay
  };
};

const createDeck = () => {
  const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  const deckOfCards = suits.reduce((acc, suit) => {
    values.forEach((cardValue) => {
      acc.push([cardValue, suit]);
    });
    return acc;
  }, []);
  return deckOfCards;
};


const shuffleDeck = (listOfCards) => {
  const listOfCardsShallowCopy = [...listOfCards];

  for (let index = listOfCardsShallowCopy.length - 1; index > 0; index--) {
    const otherCardIndex = Math.floor(Math.random() * (index));

    [listOfCardsShallowCopy[index], listOfCardsShallowCopy[otherCardIndex]] =
      [listOfCardsShallowCopy[otherCardIndex], listOfCardsShallowCopy[index]];
  }

  return listOfCardsShallowCopy;
};

const getNewShuffledDeckOfCards = () => {
  const currentDeckOfCards = createDeck();
  const shuffledCards = shuffleDeck(currentDeckOfCards);
  return shuffledCards;
};


const dealHands = (deckOfCards) => {
  const computerHand = [];
  const userHand = [];

  for (let index = 0; index < 4; index++) {
    const currentCard = deckOfCards.pop();

    if (index % 2 === 0) {
      userHand.push(currentCard);
    } else {
      computerHand.push(currentCard);
    }
  }
  const initialHands = {
    computerHand,
    userHand
  };

  return initialHands;
};

const getHandValue = (hand) => {
  const tens = ["K", "Q", "J", "10"];
  const handValues = hand.map(card => card[0]);

  const { hasAce, has10, currentValue } = handValues.reduce((acc, value) => {
    const { currentValue, hasAce } = acc;

    if (!hasAce && value === "A" && currentValue + 11 <= 21) {
      acc.hasAce = true;
      acc.currentValue += 11;
    } else if (hasAce && value === "A" && currentValue + 11 > 21) {
      acc.currentValue -= 11;
      acc.currentValue += 1;
    } else if (hasAce && value === "A" && currentValue + 11 <= 21) {
      acc.currentValue += 1;
    } else if (hasAce && value !== "A" && currentValue + value >= 21) {
      acc.currentValue -= 11;
      acc.currentValue += 1;
    } else if (value !== "A" && tens.includes(value)) {
      acc.has10 = true;
      acc.currentValue += 10;
    } else {
      acc.currentValue += Number(value);
    }

    return acc;
  }, { hasAce: false, has10: false, currentValue: 0 });

  return {
    handValues,
    hasAce,
    has10,
    currentValue,
    numberOfCards: hand.length,
  };
};

const checkHandForBlackJack = (hand) => {
  const {
    hasAce,
    has10,
    numberOfCards,
  } = hand;


  if (hasAce && has10 && numberOfCards === 2) {
    return true;
  } else {
    return false;
  }
};

const displayHand = (cards) => {
  cards.forEach(card => {
    const [ value, suit ] = card;
    console.log("------------");
    console.log("|          |");
    console.log("|          |");
    if (value.length === 2) {
      console.log(`|    ${value}    |`);
    } else {
      console.log(`|    ${value[0]}     |`);
    }

    console.log(`|    ${suit[0]}     |`);
    console.log("|          |");
    console.log("|          |");
    console.log("------------");
    console.log("");
  });
};

const playRound = ({
  playerHand,
  computerHand,
  currentDeck,
  playerTurn = true,
  computerTurn = false,
}) => {
  let winner = null;
  let push = null;

  const [computerFirstCard, __] = computerHand;

  const computerHandMasked = [computerFirstCard, ["    ",  "     " ]];

  promptUser("Computer Hand:");
  displayHand(computerTurn ? computerHand : computerHandMasked);
  promptUser("Your Hand:");
  displayHand(playerHand);

  const playerHandParsed = getHandValue(playerHand);
  const { currentValue: playerHandTotalValue } = playerHandParsed;

  const computerHandParsed = getHandValue(computerHand);
  const { currentValue: computerHandTotalValue } = computerHandParsed;

  const playerHasBlackJack = checkHandForBlackJack(playerHandParsed);
  const computerHasBlackJack = checkHandForBlackJack(computerHandParsed);

  const playerHandHas21 = playerHandTotalValue === 21;
  const playerBusts = playerHandTotalValue > 21;
  if (playerHasBlackJack && computerHasBlackJack) {
    push = true;
    winner = null;

    promptUser("Push... Both of us have Blackjack");
  } else if (computerTurn && playerHandTotalValue === computerHandTotalValue) {
    push = true;
    winner = null;

    console.dir({
      computerTurn,
      playerHandTotalValue,
      computerHandTotalValue,
    });

    promptUser(`Push... Both of us have ${playerHandTotalValue}`);
  } else if (playerHasBlackJack) {
    winner = "player";

    promptUser("21 Blackjack - winner winner chicken dinner...");
  } else if (computerHasBlackJack) {
    winner = "computer";
    promptUser("21 Blackjack - Sorry... House wins...");
  } else if (playerHandHas21 && !playerBusts) {
    winner = null;
    promptUser("good... player has 21... House turn.... ");
  } else if (playerBusts) {
    winner = "computer";
    promptUser("Player busts - Sorry... House wins...");
  } else if (
    computerTurn && computerHandTotalValue > 16
    && computerHandTotalValue < playerHandTotalValue
  ) {
    winner = "player";
    promptUser(`Good job - player's ${playerHandTotalValue} beats House ${computerHandTotalValue}`);
  } else if (
    computerTurn
    && computerHandTotalValue > 16
    && computerHandTotalValue <= 21
    && computerHandTotalValue > playerHandTotalValue
  ) {
    winner = "computer";
    promptUser(`Bad luck - player's ${playerHandTotalValue} loses to House ${computerHandTotalValue}`);
  } else if (
    computerTurn
    && computerHandTotalValue > 16
    && computerHandTotalValue > 21
  ) {
    winner = "player";

    promptUser(`Good job - player had ${playerHandTotalValue} &  House busts ${computerHandTotalValue}`);
  }

  const stillPlayersTurn = !winner && !playerHandHas21 && !playerBusts && playerTurn;
  const playerAction = stillPlayersTurn && askToHitOrStay();

  const {
    hit: playWantsAnotherCard = false,
    stay: playerWantsNoMoreCards = true
  } = playerAction || {};

  if (playWantsAnotherCard) {
    const newCard = currentDeck.pop();
    playerHand.push(newCard);
    return playRound({ playerHand, computerHand, currentDeck, playerTurn: true, computerTurn: false });
  } else if (computerTurn && computerHandTotalValue < 16) {
    const newCard = currentDeck.pop();
    computerHand.push(newCard);
    return playRound({ playerHand, computerHand, currentDeck, playerTurn: false, computerTurn: true });
  } else if (playerTurn && (playerHandHas21 || playerWantsNoMoreCards)) {
    return playRound({ playerHand, computerHand, currentDeck, playerTurn: false, computerTurn: true, });
  }

  if (winner || push) {
    return {
      winner,
      push,
      computerHand,
      playerHand,
    };
  }
};

const initializeGame = () => {
  let playGameYesOrNo = askToPlayGame();

  var currentDeck = getNewShuffledDeckOfCards();

  while (playGameYesOrNo) {
    if (currentDeck.length < 26) {
      promptUser("getting new deck...");
    }

    const {
      computerHand,
      userHand: playerHand
    } = dealHands(currentDeck);

    const {
      winner,
      push,
      playerHand: playerHandEnd,
      computerHand: computerHandEnd,
    } = playRound({ playerHand, computerHand, currentDeck });

    promptUser("Computer Hand:");
    displayHand(computerHandEnd);
    promptUser("Your Hand:");
    displayHand(playerHandEnd);


    if (push) {
      promptUser("Tie - Its a push!");
    } else if (winner === "player") {
      promptUser("You Win!");
    } else if (winner === "computer") {
      promptUser("House wins... Better luck next time...");
    }

    playGameYesOrNo = askToPlayGame();
  }

  console.log("Thanks for playing Mark's Blackjack.");
};

initializeGame();