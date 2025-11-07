/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './popover';
import './popover-content';
import '../radio-button/index';
import { POPOVER_ALIGNMENT, POPOVER_BACKGROUND_TOKEN } from './defs';
import { prefix } from '../../globals/settings';
import Checkbox16 from '@carbon/icons/es/checkbox/16.js';
import Settings16 from '@carbon/icons/es/settings/16.js';
import '../checkbox';
import { iconLoader } from '../../globals/internal/icon-loader';

import styles from './popover-story.scss?lit';
const sharedArgTypes = {
  align: {
    control: 'select',
    options: [
      POPOVER_ALIGNMENT.TOP,
      POPOVER_ALIGNMENT.TOP_START,
      POPOVER_ALIGNMENT.TOP_END,
      POPOVER_ALIGNMENT.BOTTOM,
      POPOVER_ALIGNMENT.BOTTOM_START,
      POPOVER_ALIGNMENT.BOTTOM_END,
      POPOVER_ALIGNMENT.LEFT,
      POPOVER_ALIGNMENT.LEFT_END,
      POPOVER_ALIGNMENT.LEFT_START,
      POPOVER_ALIGNMENT.RIGHT,
      POPOVER_ALIGNMENT.RIGHT_END,
      POPOVER_ALIGNMENT.RIGHT_START,
    ],
    description: `Specify how the popover should align with the trigger element`,
  },
  autoAlign: {
    control: 'boolean',
    description:
      'Will auto-align the popover on first render if it is not visible. This prop is currently experimental and is subject to future changes',
  },
  caret: {
    control: 'boolean',
    description: `Specify whether a caret should be rendered`,
  },
  border: {
    control: 'boolean',
    description: 'Specify whether a border should be rendered on the popover',
  },
  dropShadow: {
    control: 'boolean',
    description:
      'Specify whether a drop shadow should be rendered on the popover',
  },
  highContrast: {
    control: 'boolean',
    description: 'Render the component using the high-contrast variant',
  },
  backgroundToken: {
    control: 'select',
    options: [
      POPOVER_BACKGROUND_TOKEN.LAYER,
      POPOVER_BACKGROUND_TOKEN.BACKGROUND,
    ],
    description: 'Specify the background token to use. Default is "layer".',
  },
  open: {
    control: 'boolean',
    description: 'Specify whether the component is currently open or closed',
  },
};

const sharedAutoAlignArgTypes = {
  caret: {
    control: 'boolean',
    description: `Specify whether a caret should be rendered`,
  },
  border: {
    control: 'boolean',
    description: 'Specify whether a border should be rendered on the popover',
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
  backgroundToken: {
    control: 'select',
    options: [
      POPOVER_BACKGROUND_TOKEN.LAYER,
      POPOVER_BACKGROUND_TOKEN.BACKGROUND,
    ],
    description: 'Specify the background token to use. Default is "layer".',
  },
  open: {
    control: 'boolean',
    description: 'Specify whether the component is currently open or closed',
  },
};

export const Default = {
  argTypes: sharedArgTypes,
  args: {
    caret: true,
    border: false,
    highContrast: false,
    align: POPOVER_ALIGNMENT.BOTTOM,
    autoAlign: false,
    dropShadow: true,
    open: true,
  },

  decorators: [
    (story) => html`<div class="mt-10 flex justify-center">${story()}</div>`,
  ],
  render: (args) => {
    const handleClick = () => {
      const popover = document.querySelector(`${prefix}-popover`);
      const open = popover?.hasAttribute('open');
      // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
      open
        ? popover?.removeAttribute('open')
        : popover?.setAttribute('open', '');
    };

    return html`
      <style>
        ${styles}
      </style>
      <cds-popover
        ?open=${args.open}
        ?caret=${args.caret}
        ?border=${args.border}
        ?highContrast=${args.highContrast}
        ?autoalign=${args.autoAlign}
        align=${args.align}
        ?tabTip=${args.tabTip}
        ?dropShadow=${args.dropShadow}
        backgroundToken=${args.backgroundToken}>
        <button
          class="playground-trigger"
          aria-label="Checkbox"
          type="button"
          aria-expanded=${open}
          @click="${() => handleClick()}">
          ${iconLoader(Checkbox16)}
        </button>
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

export const ExperimentalAutoAlign = {
  argTypes: sharedAutoAlignArgTypes,
  args: {
    caret: true,
    highContrast: false,
    dropShadow: true,
    open: true,
    border: false,
    backgroundToken: 'layer',
  },

  decorators: [
    (story) => html`<div class="mt-10 flex justify-center">${story()}</div>`,
  ],
  render: (args) => {
    const handleClick = () => {
      const popover = document.querySelector(`${prefix}-popover`);
      const open = popover?.hasAttribute('open');
      // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
      open
        ? popover?.removeAttribute('open')
        : popover?.setAttribute('open', '');
    };

    requestAnimationFrame(() => {
      document.querySelector('cds-popover')?.scrollIntoView({
        block: 'center',
        inline: 'center',
      });
    });
    return html`
      <style>
        ${styles}
      </style>
      <div style="width: 5000px; height: 5000px;">
        <div
          style="position: absolute; top: 2500px;
          left: 2500px; padding-right: 2500px;">
          <cds-popover
            ?open=${args.open}
            ?caret=${args.caret}
            ?highContrast=${args.highContrast}
            autoalign
            ?dropShadow=${args.dropShadow}
            ?border=${args.border}
            backgroundToken=${args.backgroundToken}>
            <button
              class="playground-trigger"
              aria-label="Checkbox"
              type="button"
              aria-expanded=${open}
              @click="${() => handleClick()}">
              ${iconLoader(Checkbox16)}
            </button>
            <cds-popover-content>
              <div class="p-3">
                <p class="popover-title">This popover uses autoAlign</p>
                <p class="popover-details">
                  Scroll the container up, down, left or right to observe how
                  the popover will automatically change its position in attempt
                  to stay within the viewport. This works on initial render in
                  addition to on scroll.
                </p>
              </div>
            </cds-popover-content>
          </cds-popover>
        </div>
      </div>
    `;
  },
};

export const ExperimentalAutoAlignWithBoundary = {
  argTypes: sharedAutoAlignArgTypes,
  args: {
    caret: true,
    highContrast: false,
    dropShadow: true,
    open: true,
    border: false,
    backgroundToken: 'layer',
  },

  decorators: [
    (story) => html`<div class="mt-10 flex justify-center">${story()}</div>`,
  ],
  render: (args) => {
    const handleClick = () => {
      const popover = document.querySelector(`${prefix}-popover`);
      const open = popover?.hasAttribute('open');
      // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
      open
        ? popover?.removeAttribute('open')
        : popover?.setAttribute('open', '');
    };

    requestAnimationFrame(() => {
      document.querySelector('cds-popover')?.scrollIntoView({
        block: 'center',
        inline: 'center',
      });
    });
    return html`
      <style>
        ${styles}
      </style>
      <div
        id="boundary"
        style="
         display:grid;place-items:center;overflow:auto;
         width:800px;height:500px;border:1px dashed black;margin:0 auto;">
        <div style="width:2100px;height:1px;"></div>
        <div style="place-items:center;height:32px;width:32px;">
          <cds-popover
            ?open=${args.open}
            ?caret=${args.caret}
            ?highContrast=${args.highContrast}
            autoalign-boundary="#boundary"
            autoalign
            ?dropShadow=${args.dropShadow}
            ?border=${args.border}
            backgroundToken=${args.backgroundToken}>
            <button
              class="playground-trigger"
              aria-label="Checkbox"
              type="button"
              aria-expanded=${open}
              @click="${() => handleClick()}">
              ${iconLoader(Checkbox16)}
            </button>
            <cds-popover-content>
              <div class="p-3">
                <p class="popover-title">This popover uses autoAlign</p>
                <p class="popover-details">
                  Scroll the container up, down, left or right to observe how
                  the popover will automatically change its position in attempt
                  to stay within the viewport. This works on initial render in
                  addition to on scroll.
                </p>
              </div>
            </cds-popover-content>
          </cds-popover>
          <div style="height:1000px;width:1px;"></div>
        </div>
      </div>
    `;
  },
};

const sharedTabTipArgTypes = {
  dropShadow: {
    control: 'boolean',
    description:
      'Specify whether a drop shadow should be rendered on the popover',
  },
  highContrast: {
    control: 'boolean',
    description: 'Render the component using the high-contrast variant',
  },
  open: {
    control: 'boolean',
    description: 'Specify whether the component is currently open or closed',
  },
};
export const TabTip = {
  argTypes: sharedTabTipArgTypes,
  args: {
    dropShadow: true,
    highContrast: false,
    open: true,
  },
  render: (args) => {
    const handleClick = (id) => {
      const popover = document.querySelector(id);
      const open = popover?.hasAttribute('open');
      // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
      open
        ? popover?.removeAttribute('open')
        : popover?.setAttribute('open', '');
    };

    return html`
      <style>
        ${styles}
      </style>
      <div class="popover-tabtip-story" style="display: 'flex'">
        <cds-popover
          ?dropShadow=${args.dropShadow}
          ?highContrast=${args.highContrast}
          ?open=${args.open}
          tabTip
          align="bottom-left"
          id="popover-one">
          <button
            aria-label="Settings"
            type="button"
            @click="${() => handleClick('#popover-one')}">
            ${iconLoader(Settings16)}
          </button>
          <cds-popover-content>
            <div class="p-3">
              <cds-form-item>
                <cds-radio-button-group
                  legend-text="Row height 1"
                  name="radio-button-group-1"
                  value="small"
                  orientation="vertical"
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
              <cds-checkbox-group legend-text="Edit columns">
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
              </cds-checkbox-group>
            </div>
          </cds-popover-content>
        </cds-popover>
        <cds-popover
          ?dropShadow=${args.dropShadow}
          ?highContrast=${args.highContrast}
          tabTip
          id="popover-two"
          align="bottom-right"
          backgroundToken=${POPOVER_BACKGROUND_TOKEN.LAYER}>
          <button
            aria-label="Settings"
            type="button"
            @click="${() => handleClick('#popover-two')}">
            ${iconLoader(Settings16)}
          </button>
          <cds-popover-content>
            <div class="p-3">
              <cds-form-item>
                <cds-radio-button-group
                  legend-text="Row height 2"
                  name="radio-button-group-2"
                  value="small"
                  orientation="vertical"
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
              <cds-checkbox-group legend-text="Testing">
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
              </cds-checkbox-group>
            </div>
          </cds-popover-content>
        </cds-popover>
      </div>
    `;
  },
};

export const TabTipExperimentalAutoAlign = {
  argTypes: sharedTabTipArgTypes,
  args: {
    highContrast: false,
    dropShadow: true,
    open: true,
  },

  decorators: [
    (story) => html`<div class="mt-10 flex justify-center">${story()}</div>`,
  ],
  render: (args) => {
    const handleClick = () => {
      const popover = document.querySelector(`${prefix}-popover`);
      const open = popover?.hasAttribute('open');
      // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
      open
        ? popover?.removeAttribute('open')
        : popover?.setAttribute('open', '');
    };

    requestAnimationFrame(() => {
      document.querySelector('cds-popover')?.scrollIntoView({
        block: 'center',
        inline: 'center',
      });
    });
    return html`
      <style>
        ${styles}
      </style>
      <div style="width: 5000px; height: 5000px;">
        <div
          style="position: absolute; top: 2500px;
          left: 2500px; padding-right: 2500px;">
          <cds-popover
            ?open=${args.open}
            ?highContrast=${args.highContrast}
            autoalign
            tabTip
            ?dropShadow=${args.dropShadow}>
            <div
              class="playground-trigger"
              aria-expanded=${open}
              @click="${() => handleClick()}">
              ${iconLoader(Checkbox16)}
            </div>
            <cds-popover-content>
              <div class="p-3">
                <p class="popover-title">
                  This popover uses autoAlign with tabTip
                </p>
                <p class="popover-details">
                  Scroll the container up, down, left or right to observe how
                  the popover will automatically change its position in attempt
                  to stay within the viewport. This works on initial render in
                  addition to on scroll.
                </p>
              </div>
            </cds-popover-content>
          </cds-popover>
        </div>
      </div>
    `;
  },
};

const meta = {
  title: 'Components/Popover',
};

export default meta;
