'use strict';

const baseFontSize = 16;
const scale = Array.from({ length: 17 }, (_, i) => getTypeSize(i + 1));

function getTypeSize(step) {
  if (step === 1) {
    return 12;
  }
  // Xn = Xn-1 + {INT[(n-2)/4] + 1} * 2
  return getTypeSize(step - 1) + (Math.floor((step - 2) / 4) + 1) * 2;
}

function rem(value) {
  return `${value / baseFontSize}rem`;
}

module.exports = {
  baseFontSize,
  getTypeSize,
  rem,
  scale,
};
