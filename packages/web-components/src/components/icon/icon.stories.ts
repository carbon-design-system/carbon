/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, svg } from 'lit';

// Below path will be there when an application installs `@carbon/web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import Add16 from '@carbon/icons/lib/add/16.js';
// @ts-ignore
import Add20 from '@carbon/icons/lib/add/20.js';
// @ts-ignore
import Add24 from '@carbon/icons/lib/add/24.js';
// @ts-ignore
import Add32 from '@carbon/icons/lib/add/32.js';

export const Default = {
  render: () => html` ${Add16()} ${Add20()} ${Add24()} ${Add32()} `,
};

export const withCustomClass = {
  name: 'With custom class',
  render: () => html`
    <style>
      .test-class {
        fill: #0062ff;
      }
    </style>
    ${Add16({ class: 'test-class' })} ${Add20({ class: 'test-class' })}
    ${Add24({ class: 'test-class' })} ${Add32({ class: 'test-class' })}
  `,
};

export const withAriaLabel = {
  name: 'With aria label',
  render: () => html`
    ${Add16({ 'aria-label': 'add' })} ${Add20({ 'aria-label': 'add' })}
    ${Add24({ 'aria-label': 'add' })} ${Add32({ 'aria-label': 'add' })}
  `,
};

export const withTitle = {
  name: 'With title',
  render: () => html`
    ${Add16({
      'aria-describedby': 'id-title-1',
      // @ts-ignore
      children: svg`<title id="id-title-1">add</title>`,
    })}
    ${Add20({
      'aria-describedby': 'id-title-2',
      // @ts-ignore
      children: svg`<title id="id-title-2">add</title>`,
    })}
    ${Add24({
      'aria-describedby': 'id-title-3',
      // @ts-ignore
      children: svg`<title id="id-title-3">add</title>`,
    })}
    ${Add32({
      'aria-describedby': 'id-title-4',
      // @ts-ignore
      children: svg`<title id="id-title-4">add</title>`,
    })}
  `,
};

const meta = {
  title: 'Components/Icon',
};

export default meta;
