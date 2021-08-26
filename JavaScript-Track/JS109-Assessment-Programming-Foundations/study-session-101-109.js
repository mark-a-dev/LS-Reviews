/*
 * Variables
 * declarations, initialization, assignment, and re-assignment
 * Definition: value or data stored in memory
 * 
 * Declaration
 * Definition: creation of a variable in memory via JS keywords var, let, or const
 * 
 * Initialization
 * Definition: the declaration of a variable and the assignment of a particular value to that variable in memory
 * 
 */

let age; // Declaration
let name = "Audry"; // Initialization

age = 25; // reassignment
name = "audry";

// Global scope

/*
 * Variable Scope
 *  Functional Scope vs Block Scope
 * 
 * 
 * inner vs outter scope of the funntion or block 
 * 
 * Functions
 * have their own variable scope
 * 
 * Block: 
 * conditionals
 * loops
 */



function concatName(first, last, age = 0) {
  // this function has its own scope

  function add10ToAge () {
    // this function has its own scope
    const age = age += 10
    // ReferenceError - age initialization
    
    // const age = age += 10
    console.log(age);
    return age;
  }


  return `${first} ${last}, ${add10ToAge()}`
}

console.log(concatName("ben", "simmons"));



/*
 * primitive values, objects, and type coercions
 */


// What are the 5 
// 1. number
// data type that represents numbers, i.e. integers or floats

// 2. string
// collection of characters
// [ "a", "u", "d", "r", "y"]
// string[0]

// concat
// split
// toUpperCase
// toLowerCase
// trim
// slice
// endsWith
// 

// What are the string destructive methods?
// trick question: there aren't any

// 3. null
// 4. undefined
// 5. boolean

// Extra Credit: Symbol & BigInt


/*
 Coercion
*/

// 5 falsy
// false
// 0 
// ''
// null
// undefined
// NaN

// NaN does not equal NaN
// Number.isNaN(NaN) => true

// Coercion
// loose and strict equality
// == vs ===
// &&
// ||
// +

// When a number is compared with a string using ==, the string is coerced into a number.
// When a boolean is compared with any other value, it is coerced into a number and compared again using the == operator.
// When an object is compared with a primitive value, the object is coerced into a primitive value and compared again using the == operator.



// In this kata, you've to count lowercase letters in a given string and return the letter count in a hash with 'letter' as key and count as 'value'. The key must be 'symbol' instead of string in Ruby and 'char' instead of string in Crystal.


// Understanding the problem
// input -- string 
// return an object: keys are the lowercase letter, values: count of letter appears in teh string 

// examples or edge cases 
// string has no lower case letters, return an empty object 
// assuming input is a valid string 

// Data structures 
// output is object
// array for string chars 

// Algorithm
// analyzing the input string 
// split the string using split method into an array 
// create the object 
// look at each character and determine if it's lower case 
// if lower case, add char to the object as a key and set counter value to one 
// if char is already in the object, just increment value by one 
// if char is not lower case, continue to the next char 

// Ben's Code

function letter_count(string) {
  arrayOfLetters = string.split('').filter(letter => 'abcdefghijklmnopqrstuvwxyz'.includes(letter));
  let letterObject = {};
  arrayOfLetters.forEach(letter => {
    if (!letterObject[letter]) {
      letterObject[letter] = 1;
    } else {
      letterObject[letter] += 1;
    }
  });
  return letterObject;
}


const letter_count = (stringToParse) => {
  const accumulator = {
    count: {}
  }
  const reducer = (acc, char) => {
    const { count } = acc;
    const currentChar = count[char]
    const isLowerCased = char === char.toLowerCase();

    if (isLowerCased) {
      if (!currentChar) {
        count[char] = 1;
      } else {
        count[char] += 1;
        lower
      }
    }

    return acc;
  }

  const { count } = stringToParse.split("").reduce(reducer, accumulator)
  return count;
}

letter_count('arithmetics') //=> {"a": 1, "c": 1, "e": 1, "h": 1, "i": 2, "m": 1, "r": 1, "s": 1, "t": 2}

// https://www.codewars.com/kata/5c55ad8c9d76d41a62b4ede3


// PEDAC 

// Problem
// input: array of  elements
// output:  number of pairs

// Examples
// [1, 2, 2, 20, 6, 20, 2, 6, 2]-- > 4
// [1,2,1,2,3,3] => 3

// Data Structures
// array:numbers
// number: out number of pairs
// object: count of element occurences

// Algorithm
// 1. Initialize an empty count object to keep track of element occurences
// Initialize countOfDuplicates to 0
// 2.  Iterate over array of numbers
// 3. initialize a variable for currentNumber in count object
//4. If number is NOT included in count object, add number property to count object with value of 1
// 5. else increment value by 1 in count object
// 6a. If  count for current number is 2, increment countOfDupicates by 1
// 6b. assign count for current number to zero
// 7. return countOfDuplicates


// Code
// [1,2,1,2,3,3] => 3
// [1,1,1,1,1]
function duplicates(array) {
  const count = {
    1: 2,
    2: 2,
    3: 2,
  }
  let pairs = 2;
  for (let i = 0; i < array.length; i++) {
    if (array.slice(i + 1).includes(array[i])) {
      pairs += 1;
    }

  }
  return pairs;
}

function duplicates(array) {
  let numberObject = {};
  array.forEach(number => {
    if (!numberObject[number]) {
      numberObject[number] = 1;
    } else numberObject[number] += 1;
  })
  return Object.values(numberObject)
    // .map((number, index, array) => array[index] = Math.floor(number / 2))
    .reduce((accumulator, numberOccurences) => {
      if (!numberOccurences < 2) return acc;
      const pairCount = Math.floor(numberOccurences / 2);
      return accumulator + pairCount;
    }, 0)
}


