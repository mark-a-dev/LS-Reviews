// Ask the user for the first number
// Ask the user for the second number
// Ask the user for the operation to perform
// Perform the operation on the two numbers
// Print the result to th terminal

const readline = require('readline-sync');

console.log("Welcome to Mark's calculator.");


const promptUser = (message) => console.log(`=> ${message}`);

const isValidNumber = (number) => {
  return Number.isInteger(parseInt(number, 10))
    ? number
    : isValidNumber(readline.question("Hmmm... that's not a valid number... Please try again with a valid number.\n"));
};

const isValidOperation = (operation) => {
  const validOperations = ["1", "2", "3", "4"];
  if (!validOperations.includes(operation)) {
    const newTry = readline.question(promptUser("Hmmm... that's not a valid operation... Please select 1, 2, 3, or 4."));
    return isValidOperation(newTry);
  }
  return operation;
};

console.log("What's the first number?");
const number1 = isValidNumber(readline.question());

console.log("What's the second number?");
const number2 = isValidNumber(readline.question());

console.log('What operation would you like to perform?\n1) Add \n2) Subtract \n3) Multiply \n4) Divide');
const operation = isValidOperation(readline.question());

let output;

switch (operation) {
  case "1":
    output = Number(number1) + Number(number2);
    break;
  case "2":
    output = Number(number1) - Number(number2);
    break;
  case "3":
    output = Number(number1) * Number(number2);
    break;
  case "4":
    output = Number(number1) / Number(number2);
    break;

  default:
    break;
}

console.log(`The result is: ${output}`);
