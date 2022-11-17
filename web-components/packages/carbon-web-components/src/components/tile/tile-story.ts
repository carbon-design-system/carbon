/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import { TILE_COLOR_SCHEME } from './tile';
import './clickable-tile';
import './radio-tile';
import './selectable-tile';
import './expandable-tile';
import storyDocs from './tile-story.mdx';

const colorSchemes = {
  [`Regular`]: null,
  [`Light (${TILE_COLOR_SCHEME.LIGHT})`]: TILE_COLOR_SCHEME.LIGHT,
};

export const Default = (args) => {
  const { colorScheme } = args?.['bx-tile'] ?? {};
  return html` <bx-tile color-scheme="${ifNonNull(colorScheme)}">Default tile</bx-tile> `;
};

Default.storyName = 'Default';

Default.parameters = {
  knobs: {
    'bx-tile': () => ({
      colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
    }),
  },
};

export const clickable = (args) => {
  const { colorScheme, disabled, download, href, hreflang, ping, rel, target, type } = args?.['bx-clickable-tile'] ?? {};
  return html`
    <bx-clickable-tile
      color-scheme="${ifNonNull(colorScheme)}"
      ?disabled="${disabled}"
      download="${ifNonNull(download)}"
      href="${ifNonNull(href)}"
      hreflang="${ifNonNull(hreflang)}"
      ping="${ifNonNull(ping)}"
      rel="${ifNonNull(rel)}"
      target="${ifNonNull(target)}"
      type="${ifNonNull(type)}"
    >
      Clickable tile
    </bx-clickable-tile>
  `;
};

clickable.parameters = {
  knobs: {
    'bx-clickable-tile': () => ({
      colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
      disabled: boolean('Disabled (disabled)', false),
      href: textNullable('Href for clickable UI (href)', ''),
    }),
  },
};

export const singleSelectable = (args) => {
  const { checkmarkLabel, colorScheme, name, value, onInput } = args?.['bx-radio-tile'] ?? {};
  return html`
    <fieldset>
      <legend>Single-select tiles</legend>
      <bx-radio-tile
        checkmark-label="${ifNonNull(checkmarkLabel)}"
        color-scheme="${ifNonNull(colorScheme)}"
        name="${ifNonNull(name)}"
        value="${ifNonNull(value)}"
        @input="${onInput}"
      >
        Single-select Tile
      </bx-radio-tile>
      <bx-radio-tile
        checkmark-label="${ifNonNull(checkmarkLabel)}"
        color-scheme="${ifNonNull(colorScheme)}"
        name="${ifNonNull(name)}"
        value="${ifNonNull(value)}"
        @input="${onInput}"
      >
        Single-select Tile
      </bx-radio-tile>
      <bx-radio-tile
        checkmark-label="${ifNonNull(checkmarkLabel)}"
        color-scheme="${ifNonNull(colorScheme)}"
        name="${ifNonNull(name)}"
        value="${ifNonNull(value)}"
        @input="${onInput}"
      >
        Single-select Tile
      </bx-radio-tile>
    </fieldset>
  `;
};

singleSelectable.storyName = 'Single-selectable';

singleSelectable.parameters = {
  knobs: {
    'bx-radio-tile': () => ({
      checkmarkLabel: textNullable('Label text for the checkmark icon (checkmark-label)', ''),
      colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
      name: textNullable('Name (name)', 'selectable-tile'),
      value: textNullable('Value (value)', ''),
      onInput: action('input'),
    }),
  },
};

export const multiSelectable = (args) => {
  const { checkmarkLabel, colorScheme, name, selected, value, onInput } = args?.['bx-selectable-tile'] ?? {};
  return html`
    <bx-selectable-tile
      checkmark-label="${ifNonNull(checkmarkLabel)}"
      color-scheme="${ifNonNull(colorScheme)}"
      name="${ifNonNull(name)}"
      ?selected="${selected}"
      value="${ifNonNull(value)}"
      @input="${onInput}"
    >
      Multi-select Tile
    </bx-selectable-tile>
  `;
};

multiSelectable.storyName = 'Multi-selectable';

multiSelectable.parameters = {
  knobs: {
    'bx-selectable-tile': () => ({
      ...singleSelectable.parameters.knobs['bx-radio-tile'](),
      selected: boolean('Selected (selected)', false),
    }),
  },
};

export const expandable = (args) => {
  const { colorScheme, expanded, disableChange, onBeforeChange, onChange } = args?.['bx-expandable-tile'] ?? {};
  const handleBeforeChanged = (event: CustomEvent) => {
    onBeforeChange(event);
    if (disableChange) {
      event.preventDefault();
    }
  };
  return html`
    <bx-expandable-tile
      color-scheme="${ifNonNull(colorScheme)}"
      ?expanded="${expanded}"
      @bx-expandable-tile-beingchanged=${handleBeforeChanged}
      @bx-expandable-tile-changed=${onChange}
    >
      <bx-tile-above-the-fold-content slot="above-the-fold-content" style="height: 200px">
        Above the fold content here
      </bx-tile-above-the-fold-content>
      <bx-tile-below-the-fold-content style="height: 300px"> Below the fold content here </bx-tile-below-the-fold-content>
    </bx-expandable-tile>
  `;
};

expandable.parameters = {
  knobs: {
    'bx-expandable-tile': () => ({
      colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
      expanded: boolean('Expanded (expanded)', false),
      disableChange: boolean(
        'Disable user-initiated change in expanded state ' +
          '(Call event.preventDefault() in bx-expandable-tile-beingchanged event)',
        false
      ),
      onBeforeChange: action('bx-expandable-tile-beingchanged'),
      onChange: action('bx-expandable-tile-changed'),
    }),
  },
};

export default {
  title: 'Components/Tile',
  decorators: [(story) => html` <div>${story()}</div> `],
  parameters: {
    ...storyDocs.parameters,
  },
};
