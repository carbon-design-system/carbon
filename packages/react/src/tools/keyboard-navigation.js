/**
 * Various utilities to help with a11y work
 */

/**
 * A "ring buffer" function that takes an array and depending on an ArrowRight
 * or ArrowLeft key input loops from last index to first or first index to last.
 *
 * @param key - the left or right arrow keys
 * @param index - the current index in a given array
 * @param arrayLength - the total length of the array
 *
 * @example
 * 	getNextIndex(keyCodes.RIGHT, 0, 4)
 */

const getNextIndex = (key, index, arrayLength) => {
  if (key === 'ArrowRight') {
    return (index + 1) % arrayLength;
  }
  if (key === 'ArrowLeft') {
    return (index + arrayLength - 1) % arrayLength;
  }
};

export { getNextIndex };
