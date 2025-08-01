/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { iconLoader } from '../../globals/internal/icon-loader';

// Below path will be there when an application installs `@carbon/web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import Add16 from '@carbon/icons/es/add/16.js';
// @ts-ignore
import Add20 from '@carbon/icons/es/add/20.js';
// @ts-ignore
import Add24 from '@carbon/icons/es/add/24.js';
// @ts-ignore
import Add32 from '@carbon/icons/es/add/32.js';

export const Default = {
  render: () => html`
    ${iconLoader(Add16)} ${iconLoader(Add20)} ${iconLoader(Add24)}
    ${iconLoader(Add32)}
  `,
};

export const withCustomClass = {
  name: 'With custom class',
  render: () => html`
    <style>
      .test-class {
        fill: #0062ff;
      }
    </style>
    ${iconLoader(Add16, { class: 'test-class' })}
    ${iconLoader(Add20, { class: 'test-class' })}
    ${iconLoader(Add24, { class: 'test-class' })}
    ${iconLoader(Add32, { class: 'test-class' })}
  `,
};

export const withAriaLabel = {
  name: 'With aria label',
  render: () => html`
    ${iconLoader(Add16, { 'aria-label': 'add' })}
    ${iconLoader(Add20, { 'aria-label': 'add' })}
    ${iconLoader(Add24, { 'aria-label': 'add' })}
    ${iconLoader(Add32, { 'aria-label': 'add' })}
  `,
};

export const withTitle = {
  name: 'With title',
  render: () => html`
    ${iconLoader(
      Add16,
      { 'aria-describedby': 'id-title-1' },
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16" aria-describedby="id-title-1"><title id="id-title-1">add</title><path d="M17 15L17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15z"/></svg>'
    )}
    ${iconLoader(
      Add20,
      { 'aria-describedby': 'id-title-2' },
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20" aria-describedby="id-title-2"><title id="id-title-2">add</title><path d="M17 15L17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15z"/></svg>'
    )}
    ${iconLoader(
      Add24,
      { 'aria-describedby': 'id-title-3' },
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24" aria-describedby="id-title-3"><title id="id-title-3">add</title><path d="M17 15L17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15z"/></svg>'
    )}
    ${iconLoader(
      Add32,
      { 'aria-describedby': 'id-title-4' },
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32" aria-describedby="id-title-4"><title id="id-title-4">add</title><path d="M17 15L17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15z"/></svg>'
    )}
  `,
};

const meta = {
  title: 'Elements/Icons',
};

export default meta;
