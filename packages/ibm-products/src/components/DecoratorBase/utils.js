/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const getMagnitude = (score, thresholds) => {
  if (typeof score !== 'number') {
    return 'Unknown';
  }

  if (score <= thresholds[0]) {
    return 'Benign';
  }
  if (score < thresholds[1]) {
    return 'Low';
  }
  if (score < thresholds[2]) {
    return 'Medium';
  }
  if (score < thresholds[3]) {
    return 'High';
  }

  return 'Critical';
};

// If a "midline" truncation has been defined,
// then return the formatted midline value generated here,
// else return to the original value.
const truncate = (inputText, truncateValue) => {
  if (!truncateValue) {
    return inputText;
  }

  const { maxLength, front, back } = truncateValue;

  if (maxLength && inputText.length > maxLength) {
    return `${inputText.substring(0, front)}…${inputText.substr(
      inputText.length - back
    )}`;
  }

  return inputText;
};

export { getMagnitude, truncate };
