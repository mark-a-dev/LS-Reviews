/* eslint-disable max-statements, max-lines-per-function, complexity*/
const readline = require('readline-sync');

const BLACKJACK_MAX = process.argv[2] || 21;
const TENS = ["K", "Q", "J", "10"];

const promptUser = (message) => console.log(`=> ${message}\n`);

const getUserAnswer = (ask) => readline.question(promptUser(ask)).toLowerCase();

const askToPlayGame = () => {
  const answer = getUserAnswer("Would you like to start a new game");
  const validAnswers = ["yes", "no"];

  if (!validAnswers.includes(answer.toLowerCase())) {
    return askToPlayGame();
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
  const handValues = hand.map(card => card[0]);

  const { hasAce, has10, currentValue } = handValues.reduce((acc, value) => {
    const { currentValue, hasAce, aceIsOne } = acc;

    const numberValue = Number(value);

    if (!hasAce && value === "A" && currentValue + 11 <= BLACKJACK_MAX) {
      acc.hasAce = true;
      acc.currentValue += 11;
    } else if (!hasAce && value === "A" && currentValue + 11 > 21) {
      acc.hasAce = true;
      acc.currentValue += 1;
    } else if (hasAce && value === "A" && !aceIsOne) {
      acc.aceIsOne = true;
      acc.currentValue += 1;
    } else if (hasAce && value !== "A" && !aceIsOne && currentValue + numberValue > BLACKJACK_MAX) {
      acc.currentValue -= 11;
      acc.currentValue += 1;
      acc.currentValue += numberValue;
    } else if (value !== "A" && TENS.includes(value)) {
      acc.has10 = true;
      acc.currentValue += 10;
    } else {
      acc.currentValue += numberValue;
    }

    return acc;
  }, { hasAce: false, has10: false, currentValue: 0, aceIsOne: false });

  return {
    handValues,
    hasAce,
    has10,
    currentValue,
    numberOfCards: handValues.length,
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

    const body = value.length === 2
      ? `|    ${value}    |`
      : (`|    ${value[0]}     |`);
    const suitString = `|    ${suit[0]}     |`;
    console.log(`
      ------------
      |          |
      |          |
      ${body}
      ${suitString}
      |          |
      |          |
      ------------
    `);
  });
};

const getWinnerOrPush = ({ playerHandParsed, computerHandParsed, computerTurn }) => {
  let winner = null;
  let push = null;

  const { currentValue: playerHandTotalValue } = playerHandParsed;
  const { currentValue: computerHandTotalValue } = computerHandParsed;

  const playerHasBlackJack = checkHandForBlackJack(playerHandParsed);
  const computerHasBlackJack = checkHandForBlackJack(computerHandParsed);

  const playerHandHas21 = playerHandTotalValue === BLACKJACK_MAX;
  const playerBusts = playerHandTotalValue > BLACKJACK_MAX;

  if (playerHasBlackJack && computerHasBlackJack) {
    push = true;
    winner = null;

    promptUser("Push... Both of us have Blackjack");
  } else if (
    computerTurn
    && (computerHandTotalValue >= 17 )
    && playerHandTotalValue === computerHandTotalValue) {
    push = true;
    winner = null;

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
    && computerHandTotalValue <= BLACKJACK_MAX
    && computerHandTotalValue > playerHandTotalValue
  ) {
    winner = "computer";
    promptUser(`Bad luck - player's ${playerHandTotalValue} loses to House ${computerHandTotalValue}`);
  } else if (
    computerTurn
    && computerHandTotalValue > 16
    && computerHandTotalValue > BLACKJACK_MAX
  ) {
    winner = "player";

    promptUser(`Good job - player had ${playerHandTotalValue} &  House busts ${computerHandTotalValue}`);
  }

  return {
    winner,
    push,
    playerHandHas21,
    playerBusts
  };
};

const playRound = ({
  playerHand,
  computerHand,
  currentDeck,
  playerTurn = true,
  computerTurn = false,
}) => {
  const [computerFirstCard ] = computerHand;

  const computerHandMasked = [computerFirstCard, ["    ",  "     " ]];

  promptUser("Computer Hand:");
  displayHand(computerTurn ? computerHand : computerHandMasked);
  promptUser("Your Hand:");
  displayHand(playerHand);

  const playerHandParsed = getHandValue(playerHand);

  const computerHandParsed = getHandValue(computerHand);
  const { currentValue: computerHandTotalValue } = computerHandParsed;

  const {
    winner,
    push,
    playerHandHas21,
    playerBusts
  } = getWinnerOrPush({ playerHandParsed, computerHandParsed, computerTurn });

  if (winner || push) {
    return {
      winner,
      push,
      computerHand,
      playerHand,
    };
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
    return playRound({
      playerHand,
      computerHand,
      currentDeck,
      playerTurn: true,
      computerTurn: false
    });
  } else if (computerTurn && computerHandTotalValue < 17) {
    const newCard = currentDeck.pop();
    computerHand.push(newCard);
    return playRound({
      playerHand,
      computerHand,
      currentDeck,
      playerTurn: false,
      computerTurn: true
    });
  } else if (playerTurn && (playerHandHas21 || playerWantsNoMoreCards)) {
    return playRound({
      playerHand,
      computerHand,
      currentDeck,
      playerTurn: false,
      computerTurn: true,
    });
  }
  return {};
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