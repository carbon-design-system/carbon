/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { unstable_tokens as type } from '@carbon/type';
import { unstable_tokens as layout } from '@carbon/layout';

// The color token names for a Carbon theme, value corresponds to what they're
// exported as in JavaScript
const colors = [
  // Core
  'interactive01',
  'interactive02',
  'interactive03',
  'interactive04',

  'uiBackground',

  'ui01',
  'ui02',
  'ui03',
  'ui04',
  'ui05',

  'text01',
  'text02',
  'text03',
  'text04',
  'text05',
  'textError',

  'icon01',
  'icon02',
  'icon03',

  'link01',
  'link02',

  'inverseLink',

  'field01',
  'field02',

  'inverse01',
  'inverse02',

  'support01',
  'support02',
  'support03',
  'support04',

  'inverseSupport01',
  'inverseSupport02',
  'inverseSupport03',
  'inverseSupport04',

  'overlay01',

  'danger01',
  'danger02',

  // Interactive states
  'focus',
  'inverseFocusUi',

  'hoverPrimary',
  'activePrimary',
  'hoverPrimaryText',

  'hoverSecondary',
  'activeSecondary',

  'hoverTertiary',
  'activeTertiary',

  'hoverUI',
  'hoverLightUI',
  'hoverSelectedUI',
  'activeUI',
  'activeLightUI',
  'selectedUI',
  'selectedLightUI',
  'inverseHoverUI',

  'hoverDanger',
  'activeDanger',

  'hoverRow',

  'visitedLink',

  'disabled01',
  'disabled02',
  'disabled03',

  'highlight',

  'decorative01',

  'buttonSeparator',

  'skeleton01',
  'skeleton02',

  // New color tokens
  // TO-DO: remove fallback color when v11 is released and assign carbon colors to new tokens
  'background',
  'layer',
  'layerAccent',
  'layerAccentHover',
  'layerAccentActive',
  'field',
  'backgroundInverse',
  'backgroundBrand',
  'interactive',

  'borderSubtle',
  'borderStrong',
  'borderInverse',
  'borderInteractive',

  'textPrimary',
  'textSecondary',
  'textPlaceholder',
  'textHelper',
  'textOnColor',
  'textInverse',

  'linkPrimary',
  'linkSecondary',
  'linkVisited',
  'linkInverse',

  'iconPrimary',
  'iconSecondary',
  'iconOnColor',
  'iconInverse',

  'supportError',
  'supportSuccess',
  'supportWarning',
  'supportInfo',
  'supportErrorInverse',
  'supportSuccessInverse',
  'supportWarningInverse',
  'supportInfoInverse',

  'overlay',
  'toggleOff',

  'buttonPrimary',
  'buttonSecondary',
  'buttonTertiary',
  'buttonDangerPrimary',
  'buttonDangerSecondary',

  'backgroundActive',
  'layerActive',

  'buttonDangerActive',
  'buttonPrimaryActive',
  'buttonSecondaryActive',
  'buttonTertiaryActive',

  'focusInset',
  'focusInverse',

  'backgroundHover',
  'layerHover',
  'fieldHover',
  'backgroundInverseHover',
  'linkPrimaryHover',
  'buttonDangerHover',
  'buttonPrimaryHover',
  'buttonSecondaryHover',
  'buttonTertiaryHover',

  'backgroundSelected',
  'backgroundSelectedHover',
  'layerSelected',
  'layerSelectedHover',
  'layerSelectedInverse',
  'borderSubtleSelected',

  'layerDisabled',
  'fieldDisabled',
  'borderDisabled',

  'textDisabled',
  'buttonDisabled',
  'iconDisabled',

  'textOnColorDisabled',
  'iconOnColorDisabled',
  'layerSelectedDisabled',

  'skeletonBackground',
  'skeletonElement',

  // Deprecated
  'brand01',
  'brand02',
  'brand03',
  'active01',
  'hoverField',
  'danger',
];

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * Format a given token into the format expected in CSS/SCSS-based projects.
 * @param {string} token
 * @returns {string}
 */
export function formatTokenName(token) {
  let string = '';

  for (let i = 0; i < token.length; i++) {
    // If we run into a number, we hit the scale step at the end of a token name
    // and can safely truncate the rest of the token
    if (numbers.indexOf(token[i]) !== -1) {
      string += '-' + token.slice(i);
      break;
    }

    // When encountering an uppercase name, we will want to start adding `-`
    // between words
    if (token[i] === token[i].toUpperCase()) {
      // Check backwards to see if previous letter was also capitalized, if so
      // we are in a special case like UI where each piece should be connected
      if (token[i - 1] && token[i - 1] === token[i - 1].toUpperCase()) {
        string += token[i].toLowerCase();
        continue;
      }

      // Otherwise, just concatenate this new part on to the existing string
      string += '-' + token[i].toLowerCase();
      continue;
    }

    // By default, we add the current character to the output string
    string += token[i];
  }

  return string;
}

export const tokens = {
  colors,
  type,
  layout,
};

export const unstable__meta = {
  colors: [
    {
      type: 'core',
      tokens: [
        'uiBackground',
        'interactive01',
        'interactive02',
        'interactive03',
        'interactive04',
        'brand01',
        'brand02',
        'brand03',
        'danger',
        'danger01',
        'danger02',
        'ui01',
        'ui02',
        'ui03',
        'ui04',
        'ui05',
        'text01',
        'text02',
        'text03',
        'text04',
        'text05',
        'textError',
        'link01',
        'link02',
        'icon01',
        'icon02',
        'icon03',
        'field01',
        'field02',
        'inverse01',
        'inverse02',
        'inverseLink',
        'support01',
        'support02',
        'support03',
        'support04',
        'inverseSupport01',
        'inverseSupport02',
        'inverseSupport03',
        'inverseSupport04',
        'overlay01',

        //new tokens
        'background',
        'layer',
        'layerAccent',
        'layerAccentHover',
        'layerAccentActive',
        'field',
        'backgroundInverse',
        'backgroundBrand',
        'interactive',

        'borderSubtle',
        'borderStrong',
        'borderInverse',
        'borderInteractive',

        'textPrimary',
        'textSecondary',
        'textPlaceholder',
        'textHelper',
        'textOnColor',
        'textInverse',

        'linkPrimary',
        'linkSecondary',
        'linkVisited',
        'linkInverse',

        'iconPrimary',
        'iconSecondary',
        'iconOnColor',
        'iconInverse',

        'supportError',
        'supportSuccess',
        'supportWarning',
        'supportInfo',
        'supportErrorInverse',
        'supportSuccessInverse',
        'supportWarningInverse',
        'supportInfoInverse',

        'overlay',
        'toggleOff',

        'buttonPrimary',
        'buttonSecondary',
        'buttonTertiary',
        'buttonDangerPrimary',
        'buttonDangerSecondary',
      ],
    },
    {
      type: 'interactive',
      tokens: [
        'focus',
        'inverseFocusUi',
        'hoverPrimary',
        'hoverPrimaryText',
        'hoverSecondary',
        'hoverTertiary',
        'hoverUI',
        'hoverLightUI',
        'hoverSelectedUI',
        'hoverDanger',
        'hoverRow',
        'activePrimary',
        'activeSecondary',
        'activeTertiary',
        'activeUI',
        'activeLightUI',
        'activeDanger',
        'selectedUI',
        'selectedLightUI',
        'highlight',
        'skeleton01',
        'skeleton02',
        'visitedLink',
        'disabled01',
        'disabled02',
        'disabled03',
        'inverseHoverUI',
        'active01',
        'hoverField',
        'decorative01',
        'buttonSeparator',

        // new tokens
        'backgroundActive',
        'layerActive',

        'buttonDangerActive',
        'buttonPrimaryActive',
        'buttonSecondaryActive',
        'buttonTertiaryActive',

        'focusInset',
        'focusInverse',

        'backgroundHover',
        'layerHover',
        'fieldHover',
        'backgroundInverseHover',
        'linkPrimaryHover',
        'buttonDangerHover',
        'buttonPrimaryHover',
        'buttonSecondaryHover',
        'buttonTertiaryHover',

        'backgroundSelected',
        'backgroundSelectedHover',
        'layerSelected',
        'layerSelectedHover',
        'layerSelectedInverse',
        'borderSubtleSelected',

        'layerDisabled',
        'fieldDisabled',
        'borderDisabled',

        'textDisabled',
        'buttonDisabled',
        'iconDisabled',

        'textOnColorDisabled',
        'iconOnColorDisabled',
        'layerSelectedDisabled',

        'skeletonBackground',
        'skeletonElement',
      ],
    },
  ],
  deprecated: ['brand01', 'brand02', 'brand03', 'active01', 'danger'],
};
