const matchesFuncName = typeof document.documentElement.matches === 'function' ? 'matches' : 'msMatchesSelector';

export default function eventMatches(event, selector) {
  if (event.target[matchesFuncName](selector)) {
    // If event target itself matches the given selector, return it
    return event.target;
  } else if (event.target[matchesFuncName](selector + ' *')) {
    // If event target is a child node of a DOM element that matches the given selector, find the DOM element by going up the DOM tree
    for (let traverse = event.target; traverse && traverse !== event.currentTarget; traverse = traverse.parentNode) {
      if (traverse[matchesFuncName](selector)) {
        return traverse;
      }
    }
  }
}
