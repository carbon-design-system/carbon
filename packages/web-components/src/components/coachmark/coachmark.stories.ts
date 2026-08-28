/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import './coachmark-beacon/index';
import '../popover/defs';
import '../button/index';
import { POPOVER_ALIGNMENT } from '../popover/defs';
import styles from './story-styles.scss?lit';
import { iconLoader } from '../../globals/internal/icon-loader';
import Crossroads from '@carbon/icons/es/crossroads/16.js';
import { handleClick } from './coachmark-helpers';
import type { Args, Meta } from '@storybook/web-components';

const tooltipAlignments = {
  [`top`]: POPOVER_ALIGNMENT.TOP,
  [`top-end`]: POPOVER_ALIGNMENT.TOP_END,
  [`top-start`]: POPOVER_ALIGNMENT.TOP_START,
  [`bottom`]: POPOVER_ALIGNMENT.BOTTOM,
  [`bottom-end`]: POPOVER_ALIGNMENT.BOTTOM_END,
  [`bottom-start`]: POPOVER_ALIGNMENT.BOTTOM_START,
  [`left`]: POPOVER_ALIGNMENT.LEFT,
  [`left-end`]: POPOVER_ALIGNMENT.LEFT_END,
  [`left-start`]: POPOVER_ALIGNMENT.LEFT_START,
  [`right`]: POPOVER_ALIGNMENT.RIGHT,
  [`right-end`]: POPOVER_ALIGNMENT.RIGHT_END,
  [`right-start`]: POPOVER_ALIGNMENT.RIGHT_START,
};

const args = {
  align: POPOVER_ALIGNMENT.TOP,
  open: true,
  highContrast: true,
  caret: false,
  floating: false,
  dropShadow: false,
};

const argTypes = {
  align: {
    control: 'select',
    description: 'Where to render the Coachmark relative to its target',
    options: tooltipAlignments,
  },
  open: {
    control: 'boolean',
    description: 'Specifies whether the component is currently open',
  },
  highContrast: {
    control: 'boolean',
    description:
      'Specify whether the component should be rendered on high-contrast',
  },
  caret: {
    control: 'boolean',
    description:
      'Specify whether a caret should be rendered on the popover. This is intended to use only for coachmark patterns.',
  },
  floating: {
    control: 'boolean',
    description: 'Specifies whether the component is floating or not',
  },
  dropShadow: {
    control: 'boolean',
    description:
      'Specify whether a drop shadow should be rendered on the popover',
  },
  position: {
    control: 'object',
    description:
      'Fine tune the position of the target in pixels. Applies only to Beacons',
  },
  selectorPrimaryFocus: {
    control: 'text',
    description:
      'CSS selector for the element that should receive focus when the coachmark opens',
  },
};

export const Tooltip = {
  args: {
    ...args,
    align: 'bottom',
    caret: true,
    selectorPrimaryFocus: '',
  },
  argTypes,
  render: (args: Args) => {
    return html`
      <style>
        ${styles}
      </style>
      <div style="padding-top:200px; position: relative; display: flex;">
        <cds-coachmark
          .open=${args.open}
          align=${args.align}
          .highContrast=${args.highContrast}
          .dropShadow=${args.dropShadow}
          .floating=${args.floating}
          .position=${{ x: 150, y: 100 }}
          .caret=${args.caret}
          selector-primary-focus=${args.selectorPrimaryFocus}>
          <cds-coachmark-beacon
            label="Show information"
            .expanded=${args.open}
            @cds-coachmark-beacon-clicked=${handleClick}
            slot="trigger">
          </cds-coachmark-beacon>
          <cds-coachmark-header
            closeIconDescription="Close"
            class="coachmark-header"></cds-coachmark-header>
          <cds-coachmark-body class="coachmark-body">
            <h2>Hello World</h2>
            <p>this is a description test</p>
            <cds-button size="sm" class="done-btn">Done</cds-button>
          </cds-coachmark-body>
        </cds-coachmark>
      </div>
    `;
  },
};

export const Floating = {
  args: {
    ...args,
    align: 'bottom',
    floating: true,
    selectorPrimaryFocus: '',
  },
  argTypes,
  render: (args: Args) => {
    return html`
      <style>
        ${styles}
      </style>
      <div style="padding-top:200px; position: relative;">
        <cds-coachmark
          .open=${args.open}
          align=${args.align}
          .highContrast=${args.highContrast}
          .dropShadow=${args.dropShadow}
          .floating=${args.floating}
          .caret=${args.caret}
          drag-aria-label="Coachmark is being dragged"
          selector-primary-focus=${args.selectorPrimaryFocus}>
          <cds-button
            kind="tertiary"
            slot="trigger"
            class="trigger-btn"
            @click=${handleClick}
            >Show information ${iconLoader(Crossroads, { slot: 'icon' })}
          </cds-button>
          <cds-coachmark-header
            closeIconDescription="Close"
            dragIconDescription="Drag"
            class="coachmark-header"></cds-coachmark-header>
          <cds-coachmark-body class="coachmark-body">
            <h2>Hello World</h2>
            <p>this is a description test</p>
            <cds-button size="sm" class="done-btn">Done</cds-button>
          </cds-coachmark-body>
        </cds-coachmark>
      </div>
    `;
  },
};

const meta: Meta = { title: 'Components/Onboarding/Coachmark' };

export default meta;
