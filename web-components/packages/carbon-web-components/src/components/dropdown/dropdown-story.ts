/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import { prefix } from '../../globals/settings';
import textNullable from '../../../.storybook/knob-text-nullable';
import { ifDefined } from 'lit/directives/if-defined.js';
import {
  DROPDOWN_COLOR_SCHEME,
  DROPDOWN_SIZE,
  DROPDOWN_TYPE,
} from './dropdown';
import './dropdown-item';
import './dropdown-skeleton';
import storyDocs from './dropdown-story.mdx';

const colorSchemes = {
  [`Regular`]: null,
  [`Light (${DROPDOWN_COLOR_SCHEME.LIGHT})`]: DROPDOWN_COLOR_SCHEME.LIGHT,
};

const sizes = {
  'Regular size': null,
  [`Small size (${DROPDOWN_SIZE.SMALL})`]: DROPDOWN_SIZE.SMALL,
  [`Extra large size (${DROPDOWN_SIZE.EXTRA_LARGE})`]:
    DROPDOWN_SIZE.EXTRA_LARGE,
};

const types = {
  Regular: null,
  [`Inline (${DROPDOWN_TYPE.INLINE})`]: DROPDOWN_TYPE.INLINE,
};

export const Default = (args) => {
  const {
    open,
    colorScheme,
    disabled,
    helperText,
    labelText,
    size,
    type,
    value,
    triggerContent,
    disableSelection,
    disableToggle,
    onBeforeSelect,
    onBeforeToggle,
    onSelect,
    onToggle,
  } = args?.[`${prefix}-dropdown`] ?? {};
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
    <cds-dropdown
      ?open=${open}
      color-scheme="${ifDefined(colorScheme)}"
      ?disabled=${disabled}
      helper-text=${ifDefined(helperText)}
      label-text=${ifDefined(labelText)}
      size="${ifDefined(size)}"
      type="${ifDefined(type)}"
      value=${ifDefined(value)}
      trigger-content=${ifDefined(triggerContent)}
      @cds-dropdown-beingselected=${handleBeforeSelect}
      @cds-dropdown-beingtoggled=${handleBeforeToggle}
      @cds-dropdown-selected=${onSelect}
      @cds-dropdown-toggled=${onToggle}>
      <cds-dropdown-item value="all">Option 1</cds-dropdown-item>
      <cds-dropdown-item value="cloudFoundry">Option 2</cds-dropdown-item>
      <cds-dropdown-item value="staging">Option 3</cds-dropdown-item>
      <cds-dropdown-item value="dea">Option 4</cds-dropdown-item>
      <cds-dropdown-item value="router">Option 5</cds-dropdown-item>
    </cds-dropdown>
  `;
};

Default.decorators = [
  (story) => html` <div style="width:300px">${story()}</div> `,
];

Default.storyName = 'Default';

Default.parameters = {
  knobs: {
    [`${prefix}-dropdown`]: () => ({
      open: boolean('Open (open)', false),
      colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
      disabled: boolean('Disabled (disabled)', false),
      helperText: textNullable(
        'Helper text (helper-text)',
        'Optional helper text'
      ),
      labelText: textNullable('Label text (label-text)', 'Dropdown title'),
      size: select('Dropdown size (size)', sizes, null),
      type: select('Dropdown type (type)', types, null),
      value: textNullable('The value of the selected item (value)', ''),
      triggerContent: textNullable(
        'The default content of the trigger button (trigger-content)',
        'Select an item'
      ),
      disableSelection: boolean(
        `Disable user-initiated selection change (Call event.preventDefault() in ${prefix}-dropdown-beingselected event)`,
        false
      ),
      disableToggle: boolean(
        `Disable user-initiated toggle of open state (Call event.preventDefault() in ${prefix}-dropdown-beingtoggled event)`,
        false
      ),
      onBeforeSelect: action(`${prefix}-dropdown-beingselected`),
      onBeforeToggle: action(`${prefix}-dropdown-beingtoggled`),
      onSelect: action(`${prefix}-dropdown-selected`),
      onToggle: action(`${prefix}-dropdown-toggled`),
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
};
