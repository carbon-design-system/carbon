/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import { CONTENT_SWITCHER_SIZE } from './content-switcher';
import './content-switcher-item';
import storyDocs from './content-switcher-story.mdx';

const noop = () => {};

const sizes = {
  'Regular size': null,
  [`Small size (${CONTENT_SWITCHER_SIZE.SMALL})`]: CONTENT_SWITCHER_SIZE.SMALL,
  [`XL size (${CONTENT_SWITCHER_SIZE.EXTRA_LARGE})`]: CONTENT_SWITCHER_SIZE.EXTRA_LARGE,
};

export const Default = args => {
  const { value, disableSelection, onBeforeSelect = noop, onSelect = noop, size } = args?.['bx-content-switcher'] ?? {};
  const handleBeforeSelected = (event: CustomEvent) => {
    onBeforeSelect(event);
    if (disableSelection) {
      event.preventDefault();
    }
  };
  return html`
    <bx-content-switcher
      value="${ifNonNull(value)}"
      @bx-content-switcher-beingselected="${handleBeforeSelected}"
      @bx-content-switcher-selected="${onSelect}"
      size="${size}">
      <bx-content-switcher-item value="all">Option 1</bx-content-switcher-item>
      <bx-content-switcher-item value="cloudFoundry" disabled>Option 2</bx-content-switcher-item>
      <bx-content-switcher-item value="staging">Option 3</bx-content-switcher-item>
      <bx-content-switcher-item value="dea">Option 4</bx-content-switcher-item>
      <bx-content-switcher-item value="router">Option 5</bx-content-switcher-item>
    </bx-content-switcher>
  `;
};

Default.storyName = 'Default';

export default {
  title: 'Components/Content switcher',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      'bx-content-switcher': () => ({
        value: textNullable('The value of the selected item (value)', ''),
        size: select('Button size (size)', sizes, null),
        disableSelection: boolean(
          'Disable user-initiated selection change (Call event.preventDefault() in bx-content-switcher-beingselected event)',
          false
        ),
        onBeforeSelect: action('bx-content-switcher-beingselected'),
        onSelect: action('bx-content-switcher-selected'),
      }),
    },
  },
};
