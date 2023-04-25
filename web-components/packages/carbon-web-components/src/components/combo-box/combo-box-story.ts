/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { boolean, select } from '@storybook/addon-knobs';
import { DROPDOWN_DIRECTION, DROPDOWN_SIZE } from './combo-box';
import './combo-box-item';
import storyDocs from './combo-box-story.mdx';
import { prefix } from '../../globals/settings';
import textNullable from '../../../.storybook/knob-text-nullable';

const items = [
  {
    value: 'option-0',
    text: 'An example option that is really long to show what should be done to handle long text',
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

const directionOptions = {
  [`Top`]: DROPDOWN_DIRECTION.TOP,
  [`Bottom`]: DROPDOWN_DIRECTION.BOTTOM,
};

const sizes = {
  [`Small size (${DROPDOWN_SIZE.SMALL})`]: DROPDOWN_SIZE.SMALL,
  'Regular size': null,
  [`Large size (${DROPDOWN_SIZE.LARGE})`]: DROPDOWN_SIZE.LARGE,
};

export const Default = () => {
  return html`
    <cds-combo-box
      helper-text="Combobox helper text"
      title-text="ComboBox title">
      ${items.map(
        (elem) => html`
          <cds-combo-box-item ?disabled=${elem.disabled} value="${elem.value}"
            >${elem.text}</cds-combo-box-item
          >
        `
      )}
    </cds-combo-box>
  `;
};

export const WithLayer = () => {
  return html`
    <sb-template-layers>
      <div style="width:400px">
        <cds-combo-box
          title-text="ComboBox label"
          helper-text="Combobox helper text"
          label="Dropdown menu options">
          ${items.map(
            (elem) => html`
              <cds-combo-box-item
                ?disabled=${elem.disabled}
                value="${elem.value}"
                >${elem.text}</cds-combo-box-item
              >
            `
          )}
        </cds-combo-box>
      </div>
    </sb-template-layers>
  `;
};

export const Playground = (args) => {
  const {
    disabled,
    helperText,
    invalid,
    titleText,
    hideLabel,
    direction,
    readOnly,
    warn,
    warnText,
    size,
    label,
    type,
    invalidText,
    value,
  } = args?.[`${prefix}-combo-box`] ?? {};
  return html`
    <cds-combo-box
      ?disabled="${disabled}"
      ?hide-label=${hideLabel}
      helper-text=${ifDefined(helperText)}
      ?invalid=${invalid}
      invalid-text=${invalidText}
      direction="${direction}"
      ?read-only=${readOnly}
      title-text=${ifDefined(titleText)}
      size="${ifDefined(size)}"
      type="${ifDefined(type)}"
      value=${ifDefined(value)}
      label=${ifDefined(label)}
      ?warn=${warn}
      warn-text=${warnText}>
      ${items.map(
        (elem) => html`
          <cds-combo-box-item ?disabled=${elem.disabled} value="${elem.value}"
            >${elem.text}</cds-combo-box-item
          >
        `
      )}
    </cds-combo-box>
  `;
};

Playground.parameters = {
  knobs: {
    [`${prefix}-combo-box`]: () => ({
      direction: select(
        'Direction',
        directionOptions,
        DROPDOWN_DIRECTION.BOTTOM
      ),
      disabled: boolean('Disabled (disabled)', false),
      helperText: textNullable(
        'Helper text (helper-text)',
        'Optional helper text'
      ),
      hideLabel: boolean('Hide label (hide-label)', false),
      invalid: boolean('Invalid (invalid)', false),
      invalidText: textNullable(
        'Invalid text (invalid-text)',
        'invalid selection'
      ),
      readOnly: boolean('Read only (read-only)', false),
      titleText: textNullable('Title text (title-text)', 'ComboBox title'),
      size: select('Size (size)', sizes, null),
      value: textNullable('Selected value (value)', ''),
      label: textNullable('Placeholder (label)', ''),
      warn: boolean('Warn (warn)', false),
      warnText: textNullable(
        'Warn text (warn-text)',
        'please notice the warning'
      ),
    }),
  },
};

export default {
  title: 'Components/Combo box',
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
