/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit'; // remove LitElement import before merging
import './popover';
import './popover-content';
import '../radio-button/index';
import { POPOVER_ALIGNMENT, POPOVER_BACKGROUND_TOKEN } from './defs';
import { prefix } from '../../globals/settings';
import Checkbox16 from '@carbon/icons/es/checkbox/16.js';
import Settings16 from '@carbon/icons/es/settings/16.js';
import '../checkbox';
import { iconLoader } from '../../globals/internal/icon-loader';
import { property } from 'lit/decorators.js'; // remove before merging
import '../layer'; // remove before merging

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

// remove before merging
class MyApp extends LitElement {
  toggleButton = () => {
    // eslint-disable-next-line no-console
    console.log('toggled');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const myElement = this.shadowRoot!.querySelector('my-element');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    myElement!.open = !myElement?.open;
  };

  handleClick = () => {
    // eslint-disable-next-line no-console
    console.log('clicked on Done button');
  };

  render() {
    return html`
      <my-element>
        <button
          aria-label="Settings"
          type="button"
          slot="trigger"
          @click=${this.toggleButton}>
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            aria-hidden="true">
            <path
              d="M13.5,8.4c0-0.1,0-0.3,0-0.4c0-0.1,0-0.3,0-0.4l1-0.8c0.4-0.3,0.4-0.9,0.2-1.3l-1.2-2C13.3,3.2,13,3,12.6,3	c-0.1,0-0.2,0-0.3,0.1l-1.2,0.4c-0.2-0.1-0.4-0.3-0.7-0.4l-0.3-1.3C10.1,1.3,9.7,1,9.2,1H6.8c-0.5,0-0.9,0.3-1,0.8L5.6,3.1	C5.3,3.2,5.1,3.3,4.9,3.4L3.7,3C3.6,3,3.5,3,3.4,3C3,3,2.7,3.2,2.5,3.5l-1.2,2C1.1,5.9,1.2,6.4,1.6,6.8l0.9,0.9c0,0.1,0,0.3,0,0.4	c0,0.1,0,0.3,0,0.4L1.6,9.2c-0.4,0.3-0.5,0.9-0.2,1.3l1.2,2C2.7,12.8,3,13,3.4,13c0.1,0,0.2,0,0.3-0.1l1.2-0.4	c0.2,0.1,0.4,0.3,0.7,0.4l0.3,1.3c0.1,0.5,0.5,0.8,1,0.8h2.4c0.5,0,0.9-0.3,1-0.8l0.3-1.3c0.2-0.1,0.4-0.2,0.7-0.4l1.2,0.4	c0.1,0,0.2,0.1,0.3,0.1c0.4,0,0.7-0.2,0.9-0.5l1.1-2c0.2-0.4,0.2-0.9-0.2-1.3L13.5,8.4z M12.6,12l-1.7-0.6c-0.4,0.3-0.9,0.6-1.4,0.8	L9.2,14H6.8l-0.4-1.8c-0.5-0.2-0.9-0.5-1.4-0.8L3.4,12l-1.2-2l1.4-1.2c-0.1-0.5-0.1-1.1,0-1.6L2.2,6l1.2-2l1.7,0.6	C5.5,4.2,6,4,6.5,3.8L6.8,2h2.4l0.4,1.8c0.5,0.2,0.9,0.5,1.4,0.8L12.6,4l1.2,2l-1.4,1.2c0.1,0.5,0.1,1.1,0,1.6l1.4,1.2L12.6,12z"></path>
            <path
              d="M8,11c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3C11,9.6,9.7,11,8,11C8,11,8,11,8,11z M8,6C6.9,6,6,6.8,6,7.9C6,7.9,6,8,6,8	c0,1.1,0.8,2,1.9,2c0,0,0.1,0,0.1,0c1.1,0,2-0.8,2-1.9c0,0,0-0.1,0-0.1C10,6.9,9.2,6,8,6C8.1,6,8,6,8,6z"></path>
          </svg>
        </button>

        <div slot="content">
          <cds-layer>
            <p class="popover-title">Available storage</p>
            <p class="popover-details">
              This server has 150 GB of block storage remaining.
            </p>
            <cds-button class="done-btn" size="sm" @click=${this.handleClick}>
              Done
            </cds-button>
          </cds-layer>
        </div>
      </my-element>
    `;
  }
}
customElements.define('my-app', MyApp);

class MyElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  open = true;

  updated() {
    // eslint-disable-next-line no-console
    console.log('element open: ', this.open);
  }

  render() {
    return html`
      <cds-popover
        tabtip=""
        align="bottom-left"
        id="popover-one"
        dropshadow=""
        ?open=${this.open}
        @cds-popover-closed=${() => {
          // eslint-disable-next-line no-console
          console.log('POPOVER CLOSED');
          this.open = false;
        }}>
        <slot name="trigger"></slot>
        <cds-popover-content>
          <div><slot name="content"></slot></div>
        </cds-popover-content>
      </cds-popover>
    `;
  }
}
customElements.define('my-element', MyElement);

export const Test3ShouldOpenAndClose = {
  render: () => html` <my-app> </my-app> `,
};
// stop here

const meta = {
  title: 'Components/Popover',
};

export default meta;
