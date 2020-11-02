import * as g10 from './g10';
import * as g100 from './g100';
import * as white from './white';
import * as g90 from './g90';
import * as v9 from './v9';

function rgbToHex(rgbString) {
  return (
    '#' +
    rgbString
      .match(/\d+/g)
      .map((x) => parseInt(x).toString(16).padStart(2, '0'))
      .join('')
  );
}

export { g10, g90, g100, white, v9 };
/**
 * Dynamically determines and returns the current theme token map
 *
 * @param {node} domNode the dom node to examine to determine the current theme
 * @param {string} cssVariablePrefix the prefix of the carbon css variables that was set at mixin time
 * @returns {object} object with current theme tokens, null if we can't determine the current theme
 */
export function determineCurrentTheme(domNode, cssVariablePrefix) {
  const testDiv = document.createElement('div');
  testDiv.setAttribute('visibility', 'hidden');
  // use the ui-01 css variable to figure out which theme is currently in use
  testDiv.style.color = `var(--${
    cssVariablePrefix ? `${cssVariablePrefix}-` : ''
  }ui-01)`;
  // add a temporary child div so that I can check the css variables color
  domNode.appendChild(testDiv);
  const ui01ValueString = getComputedStyle(testDiv).getPropertyValue('color');
  domNode.removeChild(testDiv);

  if (!ui01ValueString || ui01ValueString === '') {
    return null; // cannot determine current theme
  }

  const ui01Hex = rgbToHex(ui01ValueString);
  if (!ui01Hex || ui01Hex === '#000000') {
    return null; // cannot determine current theme
  }

  // Check the hex color of ui01 to determine the appropriate theme
  switch (ui01Hex) {
    case white.ui01:
      return white;
    case g10.ui01:
      return g10;
    case g90.ui01:
      return g90;
    case g100.ui01:
      return g100;
    default:
      return v9;
  }
}
export const themes = {
  white,
  g10,
  g90,
  g100,
  v9,
};
