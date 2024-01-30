/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './popover';
import './popover-content';
import '../radio-button/index';
import { POPOVER_ALIGNMENT } from './defs';
import storyDocs from './popover.mdx';
import { prefix } from '../../globals/settings';
import Checkbox16 from '@carbon/icons/lib/checkbox/16';
import Settings16 from '@carbon/icons/lib/settings/16';
import '../checkbox/checkbox';

import styles from './popover-story.scss?lit';
const controls = {
  align: {
    control: 'select',
    options: [
      POPOVER_ALIGNMENT.TOP,
      POPOVER_ALIGNMENT.TOP_LEFT,
      POPOVER_ALIGNMENT.TOP_RIGHT,
      POPOVER_ALIGNMENT.BOTTOM,
      POPOVER_ALIGNMENT.BOTTOM_LEFT,
      POPOVER_ALIGNMENT.BOTTOM_RIGHT,
      POPOVER_ALIGNMENT.LEFT,
      POPOVER_ALIGNMENT.LEFT_BOTTOM,
      POPOVER_ALIGNMENT.LEFT_TOP,
      POPOVER_ALIGNMENT.RIGHT,
      POPOVER_ALIGNMENT.RIGHT_BOTTOM,
      POPOVER_ALIGNMENT.RIGHT_TOP,
    ],
    description: `Specify how the popover should align with the trigger element`,
  },
  caret: {
    control: 'boolean',
    description: `Specify whether a caret should be rendered`,
  },

  highContrast: {
    control: 'boolean',
    description: 'Render the component using the high-contrast variant',
  },
  dropShadow: {
    control: 'boolean',
    description:
      'Specify whether a drop shadow should be rendered on the popover',
  },
  open: {
    control: 'boolean',
    description: 'Specify whether the component is currently open or closed',
  },
};

export const TabTip = {
  render: () => {
    const handleClick = (id) => {
      const popover = document.querySelector(id);
      const open = popover?.hasAttribute('open');
      open
        ? popover?.removeAttribute('open')
        : popover?.setAttribute('open', '');
    };

    return html`
      <style>
        ${styles}
      </style>
      <div class="popover-tabtip-story" style="display: 'flex'">
        <cds-popover open tabTip id="popover-one">
          <button
            aria-label="Settings"
            type="button"
            @click="${() => handleClick('#popover-one')}">
            ${Settings16()}
          </button>
          <cds-popover-content>
            <div class="p-3">
              <cds-form-item>
                <cds-radio-button-group
                  legend-text="Row height"
                  name="radio-button-group"
                  value="small"
                  style="align-items: flex-start; flex-direction: column">
                  <cds-radio-button
                    label-text="Small"
                    value="small"
                    id="radio-small"></cds-radio-button>
                  <cds-radio-button
                    label-text="Large"
                    value="large"
                    id="radio-large"></cds-radio-button>
                </cds-radio-button-group>
              </cds-form-item>
              <hr />
              <fieldset class="${prefix}--fieldset">
                <legend class="${prefix}--label">Edit columns</legend>
                <cds-checkbox
                  checked
                  label-text="Name"
                  id="checkbox-label-1"></cds-checkbox>
                <cds-checkbox
                  checked
                  label-text="Type"
                  id="checkbox-label-2"></cds-checkbox>
                <cds-checkbox
                  checked
                  label-text="Location"
                  id="checkbox-label-3"></cds-checkbox>
              </fieldset>
            </div>
          </cds-popover-content>
        </cds-popover>
        <cds-popover tabTip id="popover-two" align="bottom-right">
          <button
            aria-label="Settings"
            type="button"
            @click="${() => handleClick('#popover-two')}">
            ${Settings16()}
          </button>
          <cds-popover-content>
            <div class="p-3">
              <cds-form-item>
                <cds-radio-button-group
                  legend-text="Row height"
                  name="radio-button-group"
                  value="small"
                  style="align-items: flex-start; flex-direction: column">
                  <cds-radio-button
                    label-text="Small"
                    value="small"
                    id="radio-small"></cds-radio-button>
                  <cds-radio-button
                    label-text="Large"
                    value="large"
                    id="radio-large"></cds-radio-button>
                </cds-radio-button-group>
              </cds-form-item>
              <hr />
              <fieldset class="${prefix}--fieldset">
                <legend class="${prefix}--label">Edit columns</legend>
                <cds-checkbox
                  checked
                  label-text="Name"
                  id="checkbox-label-1"></cds-checkbox>
                <cds-checkbox
                  checked
                  label-text="Type"
                  id="checkbox-label-2"></cds-checkbox>
                <cds-checkbox
                  checked
                  label-text="Location"
                  id="checkbox-label-3"></cds-checkbox>
              </fieldset>
            </div>
          </cds-popover-content>
        </cds-popover>
      </div>
    `;
  },
};

export const Playground = {
  argTypes: controls,
  args: {
    caret: true,
    highContrast: false,
    align: POPOVER_ALIGNMENT.BOTTOM,
    dropShadow: true,
    open: true,
  },

  decorators: [
    (story) => html`<div class="mt-10 flex justify-center">${story()}</div>`,
  ],
  render: (args) => {
    return html`
      <style>
        ${styles}
      </style>
      <cds-popover
        ?open=${args.open}
        ?caret=${args.caret}
        ?highContrast=${args.highContrast}
        align=${args.align}
        ?dropShadow=${args.dropShadow}>
        <div class="playground-trigger">${Checkbox16()}</div>
        <cds-popover-content>
          <div class="p-3">
            <p class="popover-title">Available storage</p>
            <p class="popover-details">
              This server has 150 GB of block storage remaining.
            </p>
          </div>
        </cds-popover-content>
      </cds-popover>
    `;
  },
};

const meta = {
  title: 'Components/Popover',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
