import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

/**
 * Generates a list of numbers based to a range of numbers.
 *
 * @param {Number} start The minimum value of the range.
 * @param {Number} end  The maximum value of the range.
 * @returns {Array} The generated list of numbers.
 */
const generateRange = (start, end) =>
  Array.from({ length: end + 1 - start }, (_v, k) => k + start);

/**
 * Returns a word based to a the number divisibility:
 *  - Robot -> divisible by 3
 *  - ICT -> divisible by 5
 *  - RobotICT -> divisible by 3 and 5
 *  - number -> value of the number for all other cases
 *
 * @param {Number} number The provided number.
 * @returns {String} The word based to the number divisibility.
 */
const getWordByNumberDivisibility = (number) => {
  check(number, Number);

  let word = number;
  if (number % 3 === 0) {
    word = 'Robot';
  }
  if (number % 5 === 0) {
    word = word === 'Robot' ? word + 'ICT' : 'ICT';
  }
  return word;
};

/**
 * Defines all functions for numbersWords API.
 */
Meteor.methods({
  getNumbersWords(range) {
    check(range, { min: Number, max: Number });

    if (range.min < 1 || range.max < range.min) {
      throw new Meteor.Error(
        'invalid-range',
        'Invalid range of numbers. Ex: 1-100, 5-95, etc.'
      );
    }
    if (range.max - range.min > 1000) {
      throw new Meteor.Error(
        'invalid-difference',
        'Difference between maximum and minimum value has to be less than 1000'
      );
    }

    return [
      ...generateRange(range.min, range.max).map((value) => ({
        number: value,
        word: getWordByNumberDivisibility(value),
      })),
    ];
  },
});
