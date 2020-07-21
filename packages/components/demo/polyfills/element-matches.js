const matchesFuncName = [
  'matches',
  'webkitMatchesSelector',
  'msMatchesSelector',
].filter((name) => typeof Element.prototype[name] === 'function')[0];

if (matchesFuncName !== 'matches') {
  Element.prototype.matches = Element.prototype[matchesFuncName];
}
