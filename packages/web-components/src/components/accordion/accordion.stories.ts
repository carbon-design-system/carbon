/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../globals/settings';
import { ACCORDION_SIZE } from './accordion';
import './index';
import '../layer/index';
import '../../../.storybook/templates/with-layer';
import styles from './accordion.scss?lit';

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
  args: {
    alignment: 'end',
    disabled: false,
    isFlush: false,
    size: 'md',
    disableToggle: false,
  },
  argTypes,
  render: ({ alignment, isFlush, size, disabled, disableToggle }) => {
    return html`
      <cds-accordion
        alignment="${alignment}"
        size="${size}"
        ?isFlush="${isFlush}"
        ?disable-toggle="${disableToggle}"
        ?disabled="${disabled}">
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

export const Controlled = {
  // This story doesn't accept any args.
  args: {},
  argTypes: {},
  render: () => {
    const toggleItems = (isOpen: boolean) => {
      document
        .querySelectorAll('cds-accordion-item[controlled]')
        .forEach((item) => {
          if (isOpen) {
            item.setAttribute('open', '');
          } else {
            item.removeAttribute('open');
          }
        });
    };

    return html`
      <style>
        ${styles}
      </style>
      <cds-button-set>
        <cds-button
          class="controlled-accordion-btn"
          @click=${() => toggleItems(true)}>
          Click to expand all
        </cds-button>
        <cds-button
          class="controlled-accordion-btn"
          @click=${() => toggleItems(false)}>
          Click to collapse all
        </cds-button>
      </cds-button-set>

      <cds-accordion>
        <cds-accordion-item controlled title="Section 1 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </cds-accordion-item>
        <cds-accordion-item controlled title="Section 2 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </cds-accordion-item>
        <cds-accordion-item controlled title="Section 3 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </cds-accordion-item>
        <cds-accordion-item controlled title="Section 4 title">
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
  decorators: [(story) => html`<div style="width: 500px">${story()}</div>`],
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () => {
    return html`<cds-accordion-skeleton></cds-accordion-skeleton>`;
  },
};

export const WithLayer = {
  args,
  argTypes,
  render: () => {
    return html`
      <sb-template-layers>
        <cds-accordion>
          <cds-accordion-item title="Section 1 title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </cds-accordion-item>
          <cds-accordion-item title="Section 2 title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </cds-accordion-item>
          <cds-accordion-item title="Section 3 title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </cds-accordion-item>
          <cds-accordion-item title="Section 4 title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </cds-accordion-item>
        </cds-accordion>
      </sb-template-layers>
    `;
  },
};

const meta = {
  title: 'Components/Accordion',
};

export default meta;
