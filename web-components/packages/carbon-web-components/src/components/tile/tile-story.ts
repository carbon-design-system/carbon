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
import { boolean, select } from '@storybook/addon-knobs';
import { prefix } from '../../globals/settings';
import textNullable from '../../../.storybook/knob-text-nullable';
import { TILE_COLOR_SCHEME } from './tile';
import './index';
import storyDocs from './tile-story.mdx';

const colorSchemes = {
  [`Regular`]: null,
  [`Light (${TILE_COLOR_SCHEME.LIGHT})`]: TILE_COLOR_SCHEME.LIGHT,
};

export const Default = (args) => {
  const { colorScheme } = args?.[`${prefix}-tile`] ?? {};
  return html`
    <cds-tile color-scheme="${ifDefined(colorScheme)}">
      Default tile
      <a href="https://example.com">Link</a>
    </cds-tile>
  `;
};

Default.storyName = 'Default';

export const clickable = (args) => {
  const { download, href, hreflang, ping, rel, target, type } =
    args?.[`${prefix}-clickable-tile`] ?? {};
  return html`
    <cds-clickable-tile
      download="${ifDefined(download)}"
      href="${ifDefined(href)}"
      hreflang="${ifDefined(hreflang)}"
      ping="${ifDefined(ping)}"
      rel="${ifDefined(rel)}"
      target="${ifDefined(target)}"
      type="${ifDefined(type)}">
      Clickable tile
    </cds-clickable-tile>
  `;
};

clickable.parameters = {
  knobs: {
    [`${prefix}-clickable-tile`]: () => ({
      href: textNullable('Href for clickable UI (href)', 'https://example.com'),
    }),
  },
};

export const Radio = (args) => {
  const { checkmarkLabel, colorScheme, name, value, onInput } =
    args?.[`${prefix}-radio-tile`] ?? {};
  return html`
    <cds-tile-group>
      <legend slot="legend">Single-select tiles</legend>
      <cds-radio-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        color-scheme="${ifDefined(colorScheme)}"
        name="${ifDefined(name)}"
        value="${ifDefined(value)}"
        @input="${onInput}">
        Option 1
      </cds-radio-tile>
      <cds-radio-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        color-scheme="${ifDefined(colorScheme)}"
        name="${ifDefined(name)}"
        value="${ifDefined(value)}"
        @input="${onInput}">
        Option 2
      </cds-radio-tile>
      <cds-radio-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        color-scheme="${ifDefined(colorScheme)}"
        name="${ifDefined(name)}"
        value="${ifDefined(value)}"
        @input="${onInput}">
        Option 3
      </cds-radio-tile>
    </cds-tile-group>
  `;
};

Radio.storyName = 'Radio';

Radio.parameters = {
  knobs: {
    [`${prefix}-radio-tile`]: () => ({
      checkmarkLabel: textNullable(
        'Label text for the checkmark icon (checkmark-label)',
        ''
      ),
      colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
      name: textNullable('Name (name)', 'selectable-tile'),
      value: textNullable('Value (value)', ''),
      onInput: action('input'),
    }),
  },
};

export const multiSelectable = (args) => {
  const { checkmarkLabel, colorScheme, name, selected, value, onInput } =
    args?.[`${prefix}-selectable-tile`] ?? {};
  return html`
    <fieldset>
      <cds-selectable-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        color-scheme="${ifDefined(colorScheme)}"
        name="${ifDefined(name)}"
        ?selected="${selected}"
        value="${ifDefined(value)}"
        @input="${onInput}">
        Option 1
      </cds-selectable-tile>
      <cds-selectable-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        color-scheme="${ifDefined(colorScheme)}"
        name="${ifDefined(name)}"
        ?selected="${selected}"
        value="${ifDefined(value)}"
        @input="${onInput}">
        Option 2
      </cds-selectable-tile>
      <cds-selectable-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        color-scheme="${ifDefined(colorScheme)}"
        name="${ifDefined(name)}"
        ?selected="${selected}"
        value="${ifDefined(value)}"
        @input="${onInput}">
        Option 3
      </cds-selectable-tile>
    </fieldset>
  `;
};

multiSelectable.storyName = 'Multi Select';

multiSelectable.parameters = {
  knobs: {
    [`${prefix}-selectable-tile`]: () => ({
      ...Radio.parameters.knobs[`${prefix}-radio-tile`](),
      selected: boolean('Selected (selected)', false),
    }),
  },
};

export const expandable = (args) => {
  const { colorScheme, expanded, disableChange, onBeforeChange, onChange } =
    args?.[`${prefix}-expandable-tile`] ?? {};
  const handleBeforeChanged = (event: CustomEvent) => {
    onBeforeChange(event);
    if (disableChange) {
      event.preventDefault();
    }
  };
  return html`
    <cds-expandable-tile
      color-scheme="${ifDefined(colorScheme)}"
      ?expanded="${expanded}"
      @cds-expandable-tile-beingchanged=${handleBeforeChanged}
      @cds-expandable-tile-changed=${onChange}>
      <cds-tile-above-the-fold-content
        slot="above-the-fold-content"
        style="height: 200px">
        Above the fold content here
      </cds-tile-above-the-fold-content>
      <cds-tile-below-the-fold-content style="height: 300px">
        Below the fold content here
      </cds-tile-below-the-fold-content>
    </cds-expandable-tile>
  `;
};

expandable.parameters = {
  knobs: {
    [`${prefix}-expandable-tile`]: () => ({
      colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
      expanded: boolean('Expanded (expanded)', false),
      disableChange: boolean(
        'Disable user-initiated change in expanded state ' +
          '(Call event.preventDefault() in cds-expandable-tile-beingchanged event)',
        false
      ),
      onBeforeChange: action('cds-expandable-tile-beingchanged'),
      onChange: action('cds-expandable-tile-changed'),
    }),
  },
};

export const Selectable = () => {
  return html` <cds-selectable-tile> Default tile </cds-selectable-tile> `;
};

Selectable.storyName = 'Selectable';

export default {
  title: 'Components/Tile',
  decorators: [(story) => html` <div>${story()}</div> `],
  parameters: {
    ...storyDocs.parameters,
  },
};
