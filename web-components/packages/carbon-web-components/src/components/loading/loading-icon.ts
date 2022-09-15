/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-html';
import settings from 'carbon-components/es/globals/js/settings';
import LOADING_TYPE from './types';

const { prefix } = settings;

/**
 * @param Object options The options.
 * @param [options.assistiveText] The assistive text for the spinner icon.
 * @param [options.type] The spinner type.
 * @returns The spinner icon.
 */
export default ({ assistiveText, type }: { assistiveText?: string; type?: string }) => {
  const radius = type === LOADING_TYPE.SMALL ? '42' : '44';
  return html`
    <svg class="${prefix}--loading__svg" viewBox="0 0 100 100">
      ${!assistiveText ? undefined : html` <title>${assistiveText}</title> `}
      <circle ?hidden="${type !== LOADING_TYPE.SMALL}" class="${prefix}--loading__background" cx="50%" cy="50%" r="${radius}" />
      <circle class="${prefix}--loading__stroke" cx="50%" cy="50%" r="${radius}" />
    </svg>
  `;
};
