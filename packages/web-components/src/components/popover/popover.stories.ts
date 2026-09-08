/**
 * Copyright IBM Corp. 2019, 2026
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

const alignments = [
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
];

const togglePopover = (event: Event) => {
  const trigger = event.currentTarget as HTMLElement;
  const popover = trigger.closest(`${prefix}-popover`);

  if (popover) {
    popover.toggleAttribute('open');
    trigger.setAttribute('aria-expanded', String(popover.hasAttribute('open')));
  }
};

const handlePopoverClose = (event: Event, onClose?: (event: Event) => void) => {
  const popover = event.currentTarget as HTMLElement;
  const trigger = popover.querySelector<HTMLElement>(':scope > button');

  trigger?.setAttribute('aria-expanded', 'false');
  onClose?.(event);
};

const sharedArgTypes = {
  align: {
    control: 'select',
    options: alignments,
    description: `Specify how the popover should align with the trigger element`,
  },
  alignmentAxisOffset: {
    control: 'number',
    description:
      'Provide an offset value for the alignment axis when auto-align is enabled',
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
  onBeforeClose: {
    action: 'cds-popover-beingclosed',
  },
  onClose: {
    action: 'cds-popover-closed',
  },
};

const sharedAutoAlignArgTypes = {
  align: sharedArgTypes.align,
  alignmentAxisOffset: sharedArgTypes.alignmentAxisOffset,
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
  onBeforeClose: sharedArgTypes.onBeforeClose,
  onClose: sharedArgTypes.onClose,
};

export const Default = {
  argTypes: sharedArgTypes,
  args: {
    caret: true,
    border: false,
    highContrast: false,
    align: POPOVER_ALIGNMENT.BOTTOM,
    alignmentAxisOffset: 0,
    autoAlign: false,
    backgroundToken: POPOVER_BACKGROUND_TOKEN.LAYER,
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
        alignment-axis-offset=${args.alignmentAxisOffset}
        ?caret=${args.caret}
        ?border=${args.border}
        ?highContrast=${args.highContrast}
        ?autoalign=${args.autoAlign}
        align=${args.align}
        ?dropShadow=${args.dropShadow}
        backgroundToken=${args.backgroundToken}
        @cds-popover-beingclosed=${args.onBeforeClose}
        @cds-popover-closed=${(event: Event) =>
          handlePopoverClose(event, args.onClose)}>
        <button
          class="playground-trigger"
          aria-label="Checkbox"
          type="button"
          aria-expanded=${args.open}
          @click=${togglePopover}>
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
    align: POPOVER_ALIGNMENT.TOP,
    alignmentAxisOffset: 0,
    backgroundToken: POPOVER_BACKGROUND_TOKEN.LAYER,
  },

  decorators: [
    (story) => html`<div class="mt-10 flex justify-center">${story()}</div>`,
  ],
  render: (args) => {
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
            align=${args.align}
            alignment-axis-offset=${args.alignmentAxisOffset}
            ?caret=${args.caret}
            ?highContrast=${args.highContrast}
            autoalign
            ?dropShadow=${args.dropShadow}
            ?border=${args.border}
            backgroundToken=${args.backgroundToken}
            @cds-popover-beingclosed=${args.onBeforeClose}
            @cds-popover-closed=${(event: Event) =>
              handlePopoverClose(event, args.onClose)}>
            <button
              class="playground-trigger"
              aria-label="Checkbox"
              type="button"
              aria-expanded=${args.open}
              @click=${togglePopover}>
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
    align: POPOVER_ALIGNMENT.TOP,
    alignmentAxisOffset: 0,
    backgroundToken: POPOVER_BACKGROUND_TOKEN.LAYER,
  },

  decorators: [
    (story) => html`<div class="mt-10 flex justify-center">${story()}</div>`,
  ],
  render: (args) => {
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
            align=${args.align}
            alignment-axis-offset=${args.alignmentAxisOffset}
            ?caret=${args.caret}
            ?highContrast=${args.highContrast}
            autoalign-boundary="#boundary"
            autoalign
            ?dropShadow=${args.dropShadow}
            ?border=${args.border}
            backgroundToken=${args.backgroundToken}
            @cds-popover-beingclosed=${args.onBeforeClose}
            @cds-popover-closed=${(event: Event) =>
              handlePopoverClose(event, args.onClose)}>
            <button
              class="playground-trigger"
              aria-label="Checkbox"
              type="button"
              aria-expanded=${args.open}
              @click=${togglePopover}>
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
  backgroundToken: sharedArgTypes.backgroundToken,
  border: sharedArgTypes.border,
  dropShadow: {
    control: 'boolean',
    description:
      'Specify whether a drop shadow should be rendered on the popover',
  },
  open: {
    control: 'boolean',
    description: 'Specify whether the component is currently open or closed',
  },
  onBeforeClose: sharedArgTypes.onBeforeClose,
  onClose: sharedArgTypes.onClose,
};
export const TabTip = {
  argTypes: sharedTabTipArgTypes,
  args: {
    backgroundToken: POPOVER_BACKGROUND_TOKEN.LAYER,
    border: false,
    dropShadow: true,
    open: true,
  },
  render: (args) => {
    return html`
      <style>
        ${styles}
      </style>
      <div class="popover-tabtip-story" style="display: flex">
        <cds-popover
          backgroundToken=${args.backgroundToken}
          ?border=${args.border}
          ?dropShadow=${args.dropShadow}
          ?open=${args.open}
          tabTip
          align="bottom-left"
          id="popover-one"
          @cds-popover-beingclosed=${args.onBeforeClose}
          @cds-popover-closed=${(event: Event) =>
            handlePopoverClose(event, args.onClose)}>
          <button
            aria-label="Settings"
            type="button"
            aria-expanded=${args.open}
            @click=${togglePopover}>
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
          backgroundToken=${args.backgroundToken}
          ?border=${args.border}
          ?dropShadow=${args.dropShadow}
          tabTip
          id="popover-two"
          align="bottom-right"
          @cds-popover-beingclosed=${args.onBeforeClose}
          @cds-popover-closed=${(event: Event) =>
            handlePopoverClose(event, args.onClose)}>
          <button
            aria-label="Settings"
            type="button"
            aria-expanded="false"
            @click=${togglePopover}>
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
                    id="radio-small-2"></cds-radio-button>
                  <cds-radio-button
                    label-text="Large"
                    value="large"
                    id="radio-large-2"></cds-radio-button>
                </cds-radio-button-group>
              </cds-form-item>
              <hr />
              <cds-checkbox-group legend-text="Testing">
                <cds-checkbox
                  checked
                  label-text="Name"
                  id="checkbox-label-4"></cds-checkbox>
                <cds-checkbox
                  checked
                  label-text="Type"
                  id="checkbox-label-5"></cds-checkbox>
                <cds-checkbox
                  checked
                  label-text="Location"
                  id="checkbox-label-6"></cds-checkbox>
              </cds-checkbox-group>
            </div>
          </cds-popover-content>
        </cds-popover>
      </div>
    `;
  },
};

const tabTipAutoAlignArgTypes = {
  align: sharedAutoAlignArgTypes.align,
  alignmentAxisOffset: sharedAutoAlignArgTypes.alignmentAxisOffset,
  backgroundToken: sharedAutoAlignArgTypes.backgroundToken,
  border: sharedAutoAlignArgTypes.border,
  dropShadow: sharedAutoAlignArgTypes.dropShadow,
  highContrast: sharedAutoAlignArgTypes.highContrast,
  onBeforeClose: sharedAutoAlignArgTypes.onBeforeClose,
  onClose: sharedAutoAlignArgTypes.onClose,
  open: sharedAutoAlignArgTypes.open,
};

export const TabTipExperimentalAutoAlign = {
  argTypes: tabTipAutoAlignArgTypes,
  args: {
    align: POPOVER_ALIGNMENT.BOTTOM_END,
    alignmentAxisOffset: 0,
    backgroundToken: POPOVER_BACKGROUND_TOKEN.LAYER,
    border: false,
    highContrast: false,
    dropShadow: true,
    open: true,
  },

  decorators: [
    (story) => html`<div class="mt-10 flex justify-center">${story()}</div>`,
  ],
  render: (args) => {
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
            align=${args.align}
            alignment-axis-offset=${args.alignmentAxisOffset}
            backgroundToken=${args.backgroundToken}
            ?border=${args.border}
            ?highContrast=${args.highContrast}
            autoalign
            tabTip
            ?dropShadow=${args.dropShadow}
            @cds-popover-beingclosed=${args.onBeforeClose}
            @cds-popover-closed=${(event: Event) =>
              handlePopoverClose(event, args.onClose)}>
            <button
              class="playground-trigger"
              aria-label="Checkbox"
              type="button"
              aria-expanded=${args.open}
              @click=${togglePopover}>
              ${iconLoader(Checkbox16)}
            </button>
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
