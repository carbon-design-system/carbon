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
  alignment: 'END',
  disabled: false,
  isFlush: false,
  size: ACCORDION_SIZE.MEDIUM,
};

const argTypes = {
  alignment: {
    control: 'select',
    description:
      'Specify the alignment of the accordion heading title and chevron.',
    options: ['start', 'END'],
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
  onBeforeToggle: {
    action: `${prefix}-accordion-item-beingtoggled`,
    table: {
      disable: true,
    },
  },
  onToggle: {
    action: `${prefix}-accordion-item-toggled`,
    table: {
      disable: true,
    },
  },
};

export const Default = {
  args,
  argTypes,
  render: ({
    alignment,
    isFlush,
    size,
    disabled,
    onBeforeToggle,
    onToggle,
  }) => {
    return html`
      <cds-accordion
        alignment="${alignment}"
        size="${size}"
        ?isFlush="${isFlush}"
        ?disabled="${disabled}">
        <cds-accordion-item
          title="Choose your plan"
          @cds-accordion-item-beingtoggled="${onBeforeToggle}"
          @cds-accordion-item-toggled="${onToggle}">
          <p>
            Compare plan features and select the option that best matches your
            team's expected usage.
          </p>
        </cds-accordion-item>
        <cds-accordion-item
          title="Add team members"
          @cds-accordion-item-beingtoggled="${onBeforeToggle}"
          @cds-accordion-item-toggled="${onToggle}">
          <p>
            Invite collaborators by email and assign their workspace roles
            before launch.
          </p>
        </cds-accordion-item>
        <cds-accordion-item
          title="Set payment details"
          @cds-accordion-item-beingtoggled="${onBeforeToggle}"
          @cds-accordion-item-toggled="${onToggle}">
          <p>
            Add billing information and choose whether to receive invoices by
            email.
          </p>
        </cds-accordion-item>
        <cds-accordion-item
          title="Review and confirm"
          @cds-accordion-item-beingtoggled="${onBeforeToggle}"
          @cds-accordion-item-toggled="${onToggle}">
          <p>
            Check your setup summary, then confirm to create the workspace for
            your team.
          </p>
        </cds-accordion-item>
      </cds-accordion>
    `;
  },
};

export const Controlled = {
  // This story doesn't accept any args.
  args,
  argTypes,
  render: ({
    alignment,
    isFlush,
    size,
    disabled,
    onBeforeToggle,
    onToggle,
  }) => {
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

      <cds-accordion
        alignment="${alignment}"
        size="${size}"
        ?isFlush="${isFlush}"
        ?disabled="${disabled}">
        <cds-accordion-item
          controlled
          title="Choose your plan"
          @cds-accordion-item-beingtoggled="${onBeforeToggle}"
          @cds-accordion-item-toggled="${onToggle}">
          <p>
            Compare plan features and select the option that best matches your
            team's expected usage.
          </p>
        </cds-accordion-item>
        <cds-accordion-item
          controlled
          title="Add team members"
          @cds-accordion-item-beingtoggled="${onBeforeToggle}"
          @cds-accordion-item-toggled="${onToggle}">
          <p>
            Invite collaborators by email and assign their workspace roles
            before launch.
          </p>
        </cds-accordion-item>
        <cds-accordion-item
          controlled
          title="Set payment details"
          @cds-accordion-item-beingtoggled="${onBeforeToggle}"
          @cds-accordion-item-toggled="${onToggle}">
          <p>
            Add billing information and choose whether to receive invoices by
            email.
          </p>
        </cds-accordion-item>
        <cds-accordion-item
          controlled
          title="Review and confirm"
          @cds-accordion-item-beingtoggled="${onBeforeToggle}"
          @cds-accordion-item-toggled="${onToggle}">
          <p>
            Check your setup summary, then confirm to create the workspace for
            your team.
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
  args: {
    alignment: 'END',
    isFlush: false,
  },
  argTypes: {
    alignment: {
      control: 'select',
      description:
        'Specify the alignment of the accordion heading title and chevron.',
      options: ['start', 'END'],
    },
    isFlush: {
      control: 'boolean',
      description:
        'Specify whether Accordion text should be flush, default is false, does not work with align="start".',
    },
  },
  render: ({ alignment, isFlush }) => {
    return html`<cds-accordion-skeleton
      alignment="${alignment}"
      ?isFlush="${isFlush}"></cds-accordion-skeleton>`;
  },
};

export const WithLayer = {
  args,
  argTypes,
  render: ({
    alignment,
    isFlush,
    size,
    disabled,
    onBeforeToggle,
    onToggle,
  }) => {
    return html`
      <sb-template-layers>
        <cds-accordion
          alignment="${alignment}"
          size="${size}"
          ?isFlush="${isFlush}"
          ?disabled="${disabled}">
          <cds-accordion-item
            title="Choose your plan"
            @cds-accordion-item-beingtoggled="${onBeforeToggle}"
            @cds-accordion-item-toggled="${onToggle}">
            Compare plan features and select the option that best matches your
            team's expected usage.
          </cds-accordion-item>
          <cds-accordion-item
            title="Add team members"
            @cds-accordion-item-beingtoggled="${onBeforeToggle}"
            @cds-accordion-item-toggled="${onToggle}">
            Invite collaborators by email and assign their workspace roles
            before launch.
          </cds-accordion-item>
          <cds-accordion-item
            title="Set payment details"
            @cds-accordion-item-beingtoggled="${onBeforeToggle}"
            @cds-accordion-item-toggled="${onToggle}">
            Add billing information and choose whether to receive invoices by
            email.
          </cds-accordion-item>
          <cds-accordion-item
            title="Review and confirm"
            @cds-accordion-item-beingtoggled="${onBeforeToggle}"
            @cds-accordion-item-toggled="${onToggle}">
            Check your setup summary, then confirm to create the workspace for
            your team.
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
