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
import { prefix } from '../../globals/settings';
import textNullable from '../../../.storybook/knob-text-nullable';
import { ifDefined } from 'lit/directives/if-defined.js';
import { DROPDOWN_DIRECTION, DROPDOWN_SIZE, DROPDOWN_TYPE } from './dropdown';
import './dropdown-item';
import './dropdown-skeleton';
import storyDocs from './dropdown-story.mdx';

const directionOptions = {
  [`Top`]: DROPDOWN_DIRECTION.TOP,
  [`Bottom`]: DROPDOWN_DIRECTION.BOTTOM,
};

const sizes = {
  [`Small size (${DROPDOWN_SIZE.SMALL})`]: DROPDOWN_SIZE.SMALL,
  [`Medium size (${DROPDOWN_SIZE.MEDIUM})`]: DROPDOWN_SIZE.MEDIUM,
  [`Large size (${DROPDOWN_SIZE.LARGE})`]: DROPDOWN_SIZE.LARGE,
};

const types = {
  Default: null,
  [`Inline (${DROPDOWN_TYPE.INLINE})`]: DROPDOWN_TYPE.INLINE,
};

const items = [
  {
    value: 'option-0',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    value: 'option-1',
    text: 'Option 1',
  },
  {
    value: 'option-2',
    text: 'Option 2',
  },
  {
    value: 'option-3',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    value: 'option-4',
    text: 'Option 4',
  },
  {
    value: 'option-5',
    text: 'Option 5',
  },
];

export const Default = () => {
  return html`
    <cds-dropdown
      helper-text="This is some helper text"
      title-text="Dropdown label"
      label="Dropdown menu options">
      ${items.map(
        (elem) => html`
          <cds-dropdown-item ?disabled=${elem.disabled} value="${elem.value}"
            >${elem.text}</cds-dropdown-item
          >
        `
      )}
    </cds-dropdown>
  `;
};

export const Inline = () => {
  return html`
    <cds-dropdown
      type="inline"
      title-text="Inline dropdown label"
      label="Dropdown menu options">
      ${items.map(
        (elem) => html`
          <cds-dropdown-item ?disabled=${elem.disabled} value="${elem.value}"
            >${elem.text}</cds-dropdown-item
          >
        `
      )}
    </cds-dropdown>
  `;
};

export const InlineWithLayer = () => {
  return html`
    <sb-template-layers>
      <div style="width:400px">
        <cds-dropdown
          type="inline"
          title-text="Inline dropdown label"
          label="Dropdown menu options">
          ${items.map(
            (elem) => html`
              <cds-dropdown-item
                ?disabled=${elem.disabled}
                value="${elem.value}"
                >${elem.text}</cds-dropdown-item
              >
            `
          )}
        </cds-dropdown>
      </div>
    </sb-template-layers>
  `;
};

export const WithLayer = () => {
  return html`
    <sb-template-layers>
      <div style="width:400px">
        <cds-dropdown
          title-text="Dropdown label"
          helper-text="This is some helper text"
          label="Dropdown menu options">
          ${items.map(
            (elem) => html`
              <cds-dropdown-item
                ?disabled=${elem.disabled}
                value="${elem.value}"
                >${elem.text}</cds-dropdown-item
              >
            `
          )}
        </cds-dropdown>
      </div>
    </sb-template-layers>
  `;
};

export const Playground = (args) => {
  const {
    open,
    direction,
    disabled,
    helperText,
    hideLabel,
    invalid,
    invalidText,
    titleText,
    readOnly,
    size,
    type,
    value,
    label,
    warn,
    warnText,
  } = args?.[`${prefix}-dropdown`] ?? {};

  return html`
    <cds-dropdown
      ?open=${open}
      ?disabled="${disabled}"
      ?hide-label=${hideLabel}
      helper-text=${ifDefined(helperText)}
      ?invalid=${invalid}
      ?read-only=${readOnly}
      invalid-text=${invalidText}
      direction="${direction}"
      title-text=${ifDefined(titleText)}
      size="${ifDefined(size)}"
      type="${ifDefined(type)}"
      value=${ifDefined(value)}
      label=${ifDefined(label)}
      ?warn=${warn}
      warn-text=${warnText}>
      ${items.map(
        (elem) => html`
          <cds-dropdown-item ?disabled=${elem.disabled} value="${elem.value}"
            >${elem.text}</cds-dropdown-item
          >
        `
      )}
    </cds-dropdown>
  `;
};

Playground.parameters = {
  knobs: {
    [`${prefix}-dropdown`]: () => ({
      open: boolean('Open (open)', false),
      direction: select('Direction', directionOptions, null),
      disabled: boolean('Disabled (disabled)', false),
      helperText: textNullable(
        'Helper text (helper-text)',
        'This is some helper text'
      ),
      hideLabel: boolean('Hide label (hide-label)', false),
      invalid: boolean('Invalid (invalid)', false),
      invalidText: textNullable(
        'Invalid text (invalid-text)',
        'invalid selection'
      ),
      readOnly: boolean('Read only (read-only)', false),
      label: textNullable(
        'The default content of the trigger button (label)',
        'This is an example label'
      ),
      titleText: textNullable(
        'Title text (title-text)',
        'This is an example title'
      ),
      size: select('Dropdown size (size)', sizes, null),
      type: select('Dropdown type (type)', types, null),
      value: textNullable('Selected value (value)', ''),
      warn: boolean('Warn (warn)', false),
      warnText: textNullable(
        'Warn text (warn-text)',
        'please notice the warning'
      ),
    }),
  },
};

export const skeleton = () =>
  html` <cds-dropdown-skeleton></cds-dropdown-skeleton> `;

skeleton.parameters = {
  percy: {
    skip: true,
  },
};

export default {
  title: 'Components/Dropdown',
  parameters: {
    ...storyDocs.parameters,
  },
  decorators: [
    (story, { name }) => {
      const width = !name.toLowerCase().includes('layer') ? `width:400px` : ``;
      return html` <div style="${width}">${story()}</div> `;
    },
  ],
};
