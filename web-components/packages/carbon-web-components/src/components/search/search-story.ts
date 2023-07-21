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
import { boolean, number, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import { INPUT_SIZE } from '../text-input/text-input';
import './search-skeleton';
import storyDocs from './search-story.mdx';
import { prefix } from '../../globals/settings';
import '../layer';
import '../../../.storybook/templates/with-layer';

const sizes = {
  [`Small size (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Medium size (${INPUT_SIZE.MEDIUM})`]: INPUT_SIZE.MEDIUM,
  [`Large size (${INPUT_SIZE.LARGE})`]: INPUT_SIZE.LARGE,
};

const widthSliderOptions = {
  range: true,
  min: 300,
  max: 800,
  step: 50,
};

export const Default = () => {
  return html`
    <cds-search
      size="lg"
      close-button-label-text="Clear search input"
      label-text="Search"
      placeholder="Find your items"
      type="text"></cds-search>
  `;
};

export const Disabled = () => {
  return html`
    <cds-search
      size="lg"
      disabled
      close-button-label-text="Clear search input"
      label-text="Search"
      placeholder="Find your items"
      type="text"></cds-search>
  `;
};

export const Expandable = () => {
  return html`
    <cds-search
      size="lg"
      expandable
      close-button-assistive-text="Clear search input"
      label-text="Search"
      placeholder="Find your items"
      type="text"></cds-search>
  `;
};

export const ExpandableWithLayer = () => {
  return html`
    <sb-template-layers>
      <cds-search size="lg" expandable placeholder="Layer two"></cds-search>
    </sb-template-layers>
  `;
};

export const WithLayer = () => {
  return html`
    <sb-template-layers>
      <cds-search size="lg" placeholder="Find your items"></cds-search>
    </sb-template-layers>
  `;
};

export const Playground = (args) => {
  const {
    autoComplete,
    closeButtonLabelText,
    colorScheme,
    disabled,
    labelText,
    placeholder,
    playgroundWidth,
    size,
    role,
    type,
    value,
    onInput,
  } = args?.[`${prefix}-search`] ?? {};

  const mainDiv = document.querySelector('#main-content');

  if (mainDiv) {
    (mainDiv as HTMLElement).style.width = `${playgroundWidth}px`;
  }

  return html`
    <cds-search
      autocomplete="${autoComplete}"
      close-button-assistive-text="${ifDefined(closeButtonLabelText)}"
      color-scheme="${ifDefined(colorScheme)}"
      ?disabled="${disabled}"
      label-text="${ifDefined(labelText)}"
      placeholder="${ifDefined(placeholder)}"
      size="${ifDefined(size)}"
      type="${ifDefined(type)}"
      role=${role}
      value="${ifDefined(value)}"
      @cds-search-input="${onInput}">
    </cds-search>
  `;
};

Playground.parameters = {
  knobs: {
    [`${prefix}-search`]: () => ({
      autoComplete: textNullable('Autocomplete (autocomplete)', 'off'),
      closeButtonLabelText: textNullable(
        'The label text for the close button (close-button-label-text)',
        'Clear search input'
      ),
      disabled: boolean('Disabled (disabled)', false),
      labelText: textNullable('Label text (label-text)', 'Search'),
      placeholder: textNullable(
        'Placeholder text (placeholder)',
        'Placeholder text'
      ),
      playgroundWidth: number('Playground width', 300, widthSliderOptions),
      role: textNullable('The role of the <input> (role)', 'searchbox'),
      size: select('Search size (size)', sizes, null),
      type: textNullable('The type of the <input> (type)', 'text'),
      value: textNullable('Value (value)', 'Default value'),
    }),
  },
};

export default {
  title: 'Components/Search',
  parameters: {
    ...storyDocs.parameters,
  },
};
