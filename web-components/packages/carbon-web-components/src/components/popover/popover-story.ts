/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean, select } from '@storybook/addon-knobs';
import './popover';
import './popover-content';
import '../radio-button/index';
import { POPOVER_ALIGNMENT } from './defs';
import storyDocs from './popover-story.mdx';
import { prefix } from '../../globals/settings';
import Checkbox16 from '@carbon/icons/lib/checkbox/16';
import Settings16 from '@carbon/icons/lib/settings/16';

import styles from './popover-story.scss';

const popoverAlignments = {
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

export const Playground = (args) => {
  const { caret, highContrast, align, dropShadow } =
    args?.[`${prefix}-popover`] ?? {};
  return html`
    <style>
      ${styles}
    </style>
    <cds-popover
      open
      ?caret=${caret}
      ?highContrast=${highContrast}
      align=${align}
      ?dropShadow=${dropShadow}>
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
};

Playground.storyName = 'Playground';

export const TabTip = () => {
  const handleClick = (id) => {
    const popover = document.querySelector(id);
    const open = popover?.hasAttribute('open');
    open ? popover?.removeAttribute('open') : popover?.setAttribute('open', '');
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
};

Playground.parameters = {
  knobs: {
    [`${prefix}-popover`]: () => ({
      caret: boolean('caret (caret)', true),
      highContrast: boolean('high contrast (highContrast)', false),
      align: select(
        'Align (align)',
        popoverAlignments,
        popoverAlignments.bottom
      ),
      dropShadow: boolean('drop shadow (dropShadow)', true),
    }),
  },
};

Playground.decorators = [
  (story) => html`<div class="mt-10 flex justify-center">${story()}</div>`,
];

export default {
  parameters: {
    ...storyDocs.parameters,
  },
  title: 'Components/Popover',
};
