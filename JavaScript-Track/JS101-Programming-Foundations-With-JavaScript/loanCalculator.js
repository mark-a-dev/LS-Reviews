const readline = require('readline-sync');

console.log(`
===================== Loan Calculator ====================
This will help you calculate your loan payment for any 
conventional loan i.e. mortgage, car, or consumer.

You should use this if you want 
- simple interest
- fixed payments
- no early prepayment
`);


const promptUser = (message) => console.log(`=> ${message}`);


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

const getYesOrNo = (message = `Please enter Yes or no`) => {
  const answerKeepGoing = readline.question(promptUser(message))
    .trim()
    .toLowerCase();

  const validResponses = ['yes', 'no'];

  if (!validResponses.includes(answerKeepGoing)) {
    return getYesOrNo();
  }

  return answerKeepGoing === 'yes';
};

const getLoanLengthInMonths = () => {
  promptUser("Would you like the length of the loan in years?");
  const wantYears = getYesOrNo();

  if (wantYears) {
    promptUser('How many years will you have the loan for?');
  } else {
    promptUser('How many months will you have the loan for?');
  }

  let length = getValidNumber(readline.question());
  return wantYears ? length * 12 : length;
};

// eslint-disable-next-line max-lines-per-function, max-statements
const startCalculation = () => {
  promptUser("What's the principal loan amount?");
  const principalLoanAmount = getValidNumber(readline.question());

  promptUser("What's the interest rate (APR)?");
  let annualPercentageRate = getValidNumber(readline.question());

  if (annualPercentageRate === 0) promptUser("Calculating no interest loan...");

  const loanDurationInMonths = getLoanLengthInMonths();

  const monthlyInterestRate = (annualPercentageRate / 100) / 12;

  const upper = annualPercentageRate > 0
    ? principalLoanAmount * monthlyInterestRate
    : principalLoanAmount;

  const lower = 1 - Math.pow((1 + monthlyInterestRate), (-loanDurationInMonths));

  const monthlyPayment = lower === 0
    ? upper / loanDurationInMonths
    : upper / lower;

  promptUser(`==========================================`);
  promptUser(`Summary ==================================`);
  promptUser(`==========================================`);
  promptUser(`Loan Amount       |   ${principalLoanAmount}`);
  promptUser(`APR               |   ${annualPercentageRate}%`);
  promptUser(`Months            |   ${loanDurationInMonths}`);
  promptUser(`Monthly Payment   |   $${monthlyPayment.toFixed(2)}`);
  promptUser(`==========================================\n`);
};


const askToKeepGoing = 'Would you like to coninue? Please select:\nYes\nNo';

let continueCalculator = true;
while (continueCalculator) {
  startCalculation();
  continueCalculator = getYesOrNo(askToKeepGoing);
}

console.log("=========== Thanks for using the Loan Calculator ===========");