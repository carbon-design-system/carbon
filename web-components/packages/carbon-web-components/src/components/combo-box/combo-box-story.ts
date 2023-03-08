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
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import {
  DROPDOWN_COLOR_SCHEME,
  DROPDOWN_SIZE,
  DROPDOWN_TYPE,
} from './combo-box';
import './combo-box-item';
import storyDocs from './combo-box-story.mdx';
import { prefix } from '../../globals/settings';

const colorSchemes = {
  [`Regular`]: null,
  [`Light (${DROPDOWN_COLOR_SCHEME.LIGHT})`]: DROPDOWN_COLOR_SCHEME.LIGHT,
};

const types = {
  Regular: null,
  [`Inline (${DROPDOWN_TYPE.INLINE})`]: DROPDOWN_TYPE.INLINE,
};

const sizes = {
  'Regular size': null,
  [`Small size (${DROPDOWN_SIZE.SMALL})`]: DROPDOWN_SIZE.SMALL,
  [`Extra large size (${DROPDOWN_SIZE.EXTRA_LARGE})`]:
    DROPDOWN_SIZE.EXTRA_LARGE,
};

export const Default = (args) => {
  const {
    open,
    colorScheme,
    disabled,
    helperText,
    invalid,
    labelText,
    size,
    triggerContent,
    type,
    validityMessage,
    value,
    disableSelection,
    disableToggle,
    onBeforeSelect,
    onBeforeToggle,
    onSelect,
    onToggle,
  } = args?.[`${prefix}-combo-box`] ?? {};
  const handleBeforeSelect = (event: CustomEvent) => {
    if (onBeforeSelect) {
      onBeforeSelect(event);
    }
    if (disableSelection) {
      event.preventDefault();
    }
  };
  const handleBeforeToggle = (event: CustomEvent) => {
    if (onBeforeToggle) {
      onBeforeToggle(event);
    }
    if (disableToggle) {
      event.preventDefault();
    }
  };
  return html`
    <cds-combo-box
      ?open=${open}
      color-scheme="${ifDefined(colorScheme)}"
      ?disabled=${disabled}
      ?invalid=${invalid}
      helper-text=${helperText}
      label-text=${labelText}
      size="${ifDefined(size)}"
      validity-message=${validityMessage}
      value=${value}
      trigger-content=${triggerContent}
      type=${ifDefined(type)}
      @cds-combo-box-beingselected=${handleBeforeSelect}
      @cds-combo-box-beingtoggled=${handleBeforeToggle}
      @cds-combo-box-selected=${onSelect}
      @cds-combo-box-toggled=${onToggle}>
      <cds-combo-box-item value="all">Option 1</cds-combo-box-item>
      <cds-combo-box-item value="cloudFoundry">Option 2</cds-combo-box-item>
      <cds-combo-box-item value="staging">Option 3</cds-combo-box-item>
      <cds-combo-box-item value="dea">Option 4</cds-combo-box-item>
      <cds-combo-box-item value="router">Option 5</cds-combo-box-item>
      <cds-combo-box-item value="support">Option 6</cds-combo-box-item>
      <cds-combo-box-item value="services">Option 7</cds-combo-box-item>
      <cds-combo-box-item value="products">Option 8</cds-combo-box-item>
    </cds-combo-box>
  `;
};

Default.decorators = [
  (story) => html` <div style="width:300px">${story()}</div> `,
];

Default.storyName = 'Default';

export default {
  title: 'Components/Combo box',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      [`${prefix}-combo-box`]: () => ({
        open: boolean('Open (open)', false),
        colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
        disabled: boolean('Disabled (disabled)', false),
        helperText: text('Helper text (helper-text)', 'Optional helper text'),
        invalid: boolean('Show invalid state  (invalid)', false),
        labelText: text('Label text (label-text)', 'Combo box title'),
        size: select('Dropdown size (size)', sizes, null),
        triggerContent: text(
          'The placeholder content (trigger-content)',
          'Filter...'
        ),
        type: select('UI type (type)', types, null),
        validityMessage: text('The validity message (validity-message)', ''),
        value: text('The value of the selected item (value)', ''),
        disableSelection: boolean(
          `Disable user-initiated selection change (Call event.preventDefault() in ${prefix}-combo-box-beingselected event)`,
          false
        ),
        disableToggle: boolean(
          `Disable user-initiated toggle of open state (Call event.preventDefault() in ${prefix}-combo-box-beingtoggled event)`,
          false
        ),
        onBeforeSelect: action(`${prefix}-combo-box-beingselected`),
        onBeforeToggle: action(`${prefix}-combo-box-beingtoggled`),
        onSelect: action(`${prefix}-combo-box-selected`),
        onToggle: action(`${prefix}-combo-box-toggled`),
      }),
    },
  },
};
