/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../globals/settings';
import { ACCORDION_SIZE } from './accordion';
import './index';
import '../button/index';

const sizes = {
  [`Small size (${ACCORDION_SIZE.SMALL})`]: ACCORDION_SIZE.SMALL,
  [`Medium size (${ACCORDION_SIZE.MEDIUM})`]: ACCORDION_SIZE.MEDIUM,
  [`Large size (${ACCORDION_SIZE.LARGE})`]: ACCORDION_SIZE.LARGE,
};

const args = {
  alignment: 'end',
  disabled: false,
  isFlush: false,
  size: ACCORDION_SIZE.MEDIUM,
  disableToggle: false,
};

const argTypes = {
  alignment: {
    control: 'select',
    description:
      'Specify the alignment of the accordion heading title and chevron.',
    options: ['start', 'end'],
  },
  disabled: {
    control: 'boolean',
    description:
      'Specify whether an individual AccordionItem should be disabled.',
  },
  isFlush: {
    control: 'boolean',
    description:
      'Specify whether Accordion text should be flush, default is false, does not work with align="start".',
  },
  size: {
    control: 'select',
    description: 'Specify the size of the Accordion.',
    options: sizes,
  },
  disableToggle: {
    control: 'boolean',
    description: `Disable user-initiated toggle action (Call event.preventDefault() in ${prefix}-accordion-beingtoggled event).`,
  },
  onBeforeToggle: {
    action: `${prefix}-accordion-item-beingtoggled`,
  },
  onToggle: {
    action: `${prefix}-accordion-item-toggled`,
  },
};

export const Default = {
  // This story doesn't accept any args.
  args: {},
  argTypes: {},
  render: () => {
    return html`
      <cds-accordion>
        <cds-accordion-item title="Section 1 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </cds-accordion-item>
        <cds-accordion-item title="Section 2 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </cds-accordion-item>
        <cds-accordion-item title="Section 3 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </cds-accordion-item>
        <cds-accordion-item title="Section 4 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </cds-accordion-item>
      </cds-accordion>
    `;
  },
};

export const Skeleton = {
  args: {
    alignment: args['alignment'],
    isFlush: args['isFlush'],
  },
  argTypes: {
    alignment: argTypes['alignment'],
    isFlush: argTypes['isFlush'],
  },
  decorators: [
    (story) => {
      return html`<div style="width: 500px">${story()}</div>`;
    },
  ],
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: (args) => {
    const { alignment, isFlush } = args ?? {};
    return html`
      <cds-accordion-skeleton alignment="${alignment}" ?isFlush="${isFlush}">
      </cds-accordion-skeleton>
    `;
  },
};

const noop = () => {};

export const Playground = {
  args,
  argTypes,
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: (args) => {
    const {
      disabled,
      disableToggle,
      onBeforeToggle = noop,
      onToggle = noop,
      size,
      alignment,
      isFlush,
    } = args ?? {};
    const handleBeforeToggle = (event: CustomEvent) => {
      onBeforeToggle(event);
      if (disableToggle) {
        event.preventDefault();
      }
    };

    return html`
      <cds-accordion
        @cds-accordion-item-beingtoggled="${handleBeforeToggle}"
        @cds-accordion-item-toggled="${onToggle}"
        size="${size}"
        alignment="${alignment}"
        ?isFlush="${isFlush}">
        <cds-accordion-item ?disabled="${disabled}" title="Section 1 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </cds-accordion-item>
        <cds-accordion-item ?disabled="${disabled}" title="Section 2 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </cds-accordion-item>
        <cds-accordion-item ?disabled="${disabled}" title="Section 3 title">
          <cds-button>This is a button.</cds-button>
        </cds-accordion-item>
        <cds-accordion-item ?disabled="${disabled}">
          <span slot="title">
            <span> Section 4 title (<em>the title can be a node</em>) </span>
          </span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </cds-accordion-item>
      </cds-accordion>
    `;
  },
};

const meta = {
  title: 'Components/Accordion',
};

export default meta;
