/* 1. Reverse a String:
Write a function that takes a string as an input and returns the string reversed.*/

const string = "abcd";
function reverseString(str) {
  return str.split("").reverse().join("");
}
// Strings cannot be reversed directly, but arrays can

console.log(reverseString(string));

/* 2. Sum of an Array
Create a function that takes an array of numbers and returns the sum of all the elements. */

const myArray = [5, 4, 20];
function getSum(array) {
  let sum = 0;
  array.forEach((num) => (sum += num));
  return sum;
}
console.log(getSum(myArray));

/* 3. Palindrome Checker
Write a function that checks whether a given string is a palindrome (reads the same backward as forward).*/

const string1 = "racecar";
const string2 = "Alef";
function checkPalindrome(str) {
  //check if string === the reversed string
  const reversedString = str.split("").reverse().join("");
  return reversedString === str;
}
console.log(checkPalindrome(string1));
console.log(checkPalindrome(string2));

/* 4. FizzBuzz
Write a function that prints the numbers from 1 to 100.
But for multiples of three, print "Fizz" instead of the number and for the
multiples of five, print "Buzz".
For numbers which are multiples of both three and five,print "FizzBuzz". */
function printNumFizzBuzz() {
  for (let num = 1; num <= 100; num++) {
    if (num % 3 === 0 && num % 5 === 0)
      console.log(`${num} is a multiple of BOTH`);
    else if (num % 3 === 0) console.log(`${num} is a multiple of 3`);
    else if (num % 5 === 0) console.log(`${num} is a multiple of 5`);
    else console.log(num);
  }
}
printNumFizzBuzz();
