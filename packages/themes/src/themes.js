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
  testDiv.style.color = `var(--${
    cssVariablePrefix ? `${cssVariablePrefix}-` : ''
  }ui-01)`;
  domNode.appendChild(testDiv);
  const ui01ValueString = getComputedStyle(testDiv).getPropertyValue('color');
  if (!ui01ValueString || ui01ValueString === '') {
    return null; // cannot determine current theme
  }
  domNode.removeChild(testDiv);
  const ui01Value = rgbToHex(ui01ValueString);
  if (!ui01Value || ui01Value === '#000000') {
    return null; // cannot determine current theme
  }

  switch (ui01Value.toLowerCase()) {
    case '#f4f4f4':
      return white;
    case '#ffffff':
      return g10;
    case '#393939':
      return g90;
    case '#262626':
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
