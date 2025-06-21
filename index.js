const { CARD_DECK } = require("./card.data");
const _ = require("lodash");
const readline = require("readline");
const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let player = {
  cards: [],
  chips: 0,
  bet: 0,
};

let dealer = {
  cards: [],
};

const play = () => {
  terminal.question("\nPlease put your bet: ", (answer) => {
    const input = Number(answer.trim().toLowerCase());
    if (isNaN(input)) {
      console.log("Your bet must be a NUMBER");
      play();
    } else if (input <= 0) {
      console.log("Your bet must greater than 0");
      play();
    } else {
      player.bet = input;
      dealCard();
    }
  });
};

const anotherGame = () => {
  terminal.question("Wanna play more (Yes/No)?: ", (answer) => {
    const input = answer.trim().toLowerCase();
    if (input === "yes" || input === "y") {
      play();
    } else if (input === "no" || input === "exit" || input === "q") {
      if (player.chips >= 0) {
        console.log("You got total", player.chips, "chips");
      } else {
        console.log("You lost total", player.chips, "chips");
      }
      terminal.close();
    } else {
      console.log('Invalid input. Please type "yes" or "no".');
      anotherGame(); // retry
    }
  });
};

const compareCard = () => {
  const playScore =
    player.cards.reduce((sum, curr) => sum + curr.value, 0) % 10;
  const dealerScore =
    dealer.cards.reduce((sum, curr) => sum + curr.value, 0) % 10;
  if (playScore > dealerScore) {
    console.log("You won!!!, received", player.bet, "chips");
    player.chips += player.bet;
  } else if (playScore < dealerScore) {
    console.log("You lose!!!, lost", player.bet, "chips");
    player.chips -= player.bet;
  } else {
    console.log("You draw!!!");
  }
  anotherGame();
};

const dealCard = () => {
  const shuffleCards = _.shuffle(CARD_DECK);
  const playerCards = shuffleCards.slice(0, 2);
  const remainingCards = shuffleCards.slice(2);
  const dealerCards = remainingCards.slice(0, 2);
  player.cards = playerCards;
  dealer.cards = dealerCards;
  const playerCardMessage = player.cards
    .map((c) => c.suit + "-" + c.rank)
    .join(", ");
  const dealerCardMessage = dealer.cards
    .map((c) => c.suit + "-" + c.rank)
    .join(", ");
  console.log("You got", playerCardMessage);
  console.log("The dealer got", dealerCardMessage);
  compareCard();
};

// Start the game
play();
