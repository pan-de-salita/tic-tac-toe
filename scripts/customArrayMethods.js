// NOTE: andmap
// [Array-of X] -> Boolean
//
// custom array method that mimics andmap behavior in Racket,
// which takes an array, applies a callback that checks for a
// condition to all elements within said array, and returns the
// callback result
export function andMap(array, cb) {
  let result = true;

  // NOTE: works too, but since .reduce doesn't allow for
  // breaking out, is less efficient:
  //
  // this.reduce((accumulator, currentValue, index) => {
  //   if (!cb(accumulator, currentValue)) {
  //     result = false;
  //   }

  //   return currentValue;
  // });

  let accumulator = this[0];
  for (let i = 0; i < this.length; i++) {
    const currentValue = this[i];

    if (!cb(accumulator, currentValue)) {
      result = false;
      break;
    }

    accumulator = currentValue;
  }

  return result;
};

// tests:
const arr0 = [1, 1, 1, 1];
const arr1 = [1, 1, 0, 1];
const arr2 = [[...arr0], [...arr0], [...arr0]];

console.log(andMap(arr0, (x, y) => x === y)); // -> true
console.log(andMap(arr1, (x, y) => x === y)); // -> false
console.log(arr2.every(subArray => andMap(subArray, (x, y) => x === y))); // -> true
