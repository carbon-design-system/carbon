/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, svg } from 'lit-html';

// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import Add16 from 'carbon-web-components/es/icons/add/16';
// @ts-ignore
import Add20 from 'carbon-web-components/es/icons/add/20';
// @ts-ignore
import Add24 from 'carbon-web-components/es/icons/add/24';
// @ts-ignore
import Add32 from 'carbon-web-components/es/icons/add/32';

import storyDocs from './icon-story.mdx';

export const Default = () =>
  html` ${Add16()} ${Add20()} ${Add24()} ${Add32()} `;

Default.storyName = 'Default';

export const withCustomClass = () => html`
  <style>
    .test-class {
      fill: #0062ff;
    }
  </style>
  ${Add16({ class: 'test-class' })} ${Add20({ class: 'test-class' })}
  ${Add24({ class: 'test-class' })} ${Add32({ class: 'test-class' })}
`;

withCustomClass.storyName = 'With custom class';

export const withAriaLabel = () => html`
  ${Add16({ 'aria-label': 'add' })} ${Add20({ 'aria-label': 'add' })}
  ${Add24({ 'aria-label': 'add' })} ${Add32({ 'aria-label': 'add' })}
`;

withAriaLabel.storyName = 'With aria-label';

export const withTitle = () => html`
  ${Add16({
    'aria-describedby': 'id-title-1',
    children: svg`<title id="id-title-1">add</title>`,
  })}
  ${Add20({
    'aria-describedby': 'id-title-2',
    children: svg`<title id="id-title-2">add</title>`,
  })}
  ${Add24({
    'aria-describedby': 'id-title-3',
    children: svg`<title id="id-title-3">add</title>`,
  })}
  ${Add32({
    'aria-describedby': 'id-title-4',
    children: svg`<title id="id-title-4">add</title>`,
  })}
`;

withTitle.storyName = 'With title';

export default {
  title: 'Components/Icon',
  parameters: {
    ...storyDocs.parameters,
  },
};
