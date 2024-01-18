/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './toggletip';
import '../button';
import { POPOVER_ALIGNMENT } from '../popover/defs';
import storyDocs from './toggletip.mdx';

const tooltipAlignments = {
  [`top`]: POPOVER_ALIGNMENT.TOP,
  [`top-left`]: POPOVER_ALIGNMENT.TOP_LEFT,
  [`top-right`]: POPOVER_ALIGNMENT.TOP_RIGHT,
  [`bottom`]: POPOVER_ALIGNMENT.BOTTOM,
  [`bottom-left`]: POPOVER_ALIGNMENT.BOTTOM_LEFT,
  [`bottom-right`]: POPOVER_ALIGNMENT.BOTTOM_RIGHT,
  [`left`]: POPOVER_ALIGNMENT.LEFT,
  [`left-bottom`]: POPOVER_ALIGNMENT.LEFT_BOTTOM,
  [`left-top`]: POPOVER_ALIGNMENT.LEFT_TOP,
  [`right`]: POPOVER_ALIGNMENT.RIGHT,
  [`right-bottom`]: POPOVER_ALIGNMENT.RIGHT_BOTTOM,
  [`right-top`]: POPOVER_ALIGNMENT.RIGHT_TOP,
};

const defaultArgs = {
  alignment: 'bottom',
  open: true,
};

const controls = {
  alignment: {
    control: 'select',
    description: 'Specify how the toggletip should align with the button',
    options: tooltipAlignments,
  },
  open: {
    control: 'boolean',
    description: 'Specify if the toggletip should be open',
  },
};

export const Default = {
  render: () => html`
    <div>
      <div style="display: flex; align-items: center">
        <cds-toggletip alignment="bottom">
          Toggletip label

          <p slot="body-text">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
          </p>
          <cds-link slot="actions">Test</cds-link>
          <cds-button slot="actions">Button</cds-button>
        </cds-toggletip>
      </div>
      <br />
      <br />
      <div style="display: flex; align-items: center">
        <cds-toggletip alignment="bottom" open>
          Toggletip label -- using <code>open</code> prop

          <p slot="body-text">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
          </p>
          <cds-link slot="actions">Test</cds-link>
          <cds-button slot="actions">Button</cds-button>
        </cds-toggletip>
      </div>
    </div>
  `,
};

export const Playground = {
  argTypes: controls,
  args: defaultArgs,
  render: ({ alignment, open }) => html`
    <cds-toggletip alignment="${alignment}" ?open="${open}">
      Toggletip label -- using <code>open</code> prop

      <p slot="body-text">
        Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
      </p>
      <cds-link slot="actions">Test</cds-link>
      <cds-button slot="actions">Button</cds-button>
    </cds-toggletip>
  `,
};

const meta = {
  title: 'Components/Toggletip',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
