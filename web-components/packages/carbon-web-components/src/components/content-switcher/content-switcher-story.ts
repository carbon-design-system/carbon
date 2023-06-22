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
import textNullable from '../../../.storybook/knob-text-nullable';
import { ifDefined } from 'lit/directives/if-defined.js';
import { CONTENT_SWITCHER_SIZE } from './content-switcher';
import './content-switcher-item';
import storyDocs from './content-switcher-story.mdx';
import { prefix } from '../../globals/settings';
import TableOfContents16 from '@carbon/web-components/es/icons/table-of-contents/16';
import Workspace16 from '@carbon/web-components/es/icons/workspace/16';
import ViewMode2_16 from '@carbon/web-components/es/icons/view--mode-2/16';
import '../../../.storybook/templates/with-layer';

const noop = () => {};

const sizes = {
  'Medium (md - default)': null,
  [`Small (${CONTENT_SWITCHER_SIZE.SMALL})`]: CONTENT_SWITCHER_SIZE.SMALL,
  [`Large (${CONTENT_SWITCHER_SIZE.LARGE})`]: CONTENT_SWITCHER_SIZE.LARGE,
};

export const Default = () => html`
  <cds-content-switcher value="all">
    <cds-content-switcher-item value="all">
      First section
    </cds-content-switcher-item>
    <cds-content-switcher-item value="cloudFoundry">
      Second section
    </cds-content-switcher-item>
    <cds-content-switcher-item value="staging">
      Third section
    </cds-content-switcher-item>
  </cds-content-switcher>
`;

export default {
  title: 'Components/Content switcher',
};

export const IconOnly = () => html`
  <cds-content-switcher value="all">
    <cds-content-switcher-item icon value="all">
      ${TableOfContents16()}
      <span slot="tooltip-content">Table of Contents</span>
    </cds-content-switcher-item>
    <cds-content-switcher-item icon value="cloudFoundry">
      ${Workspace16()}
      <span slot="tooltip-content">Workspace Test</span>
    </cds-content-switcher-item>
    <cds-content-switcher-item icon value="staging">
      ${ViewMode2_16()}
      <span slot="tooltip-content">View Mode</span>
    </cds-content-switcher-item>
  </cds-content-switcher>
`;

export const IconOnlyWithLayer = () => html`
  <sb-template-layers>
    <cds-content-switcher value="all">
      <cds-content-switcher-item icon value="all">
        ${TableOfContents16()}
        <span slot="tooltip-content">Table of Contents</span>
      </cds-content-switcher-item>
      <cds-content-switcher-item icon value="cloudFoundry">
        ${Workspace16()}
        <span slot="tooltip-content">Workspace Test</span>
      </cds-content-switcher-item>
      <cds-content-switcher-item icon value="staging">
        ${ViewMode2_16()}
        <span slot="tooltip-content">View Mode</span>
      </cds-content-switcher-item>
    </cds-content-switcher>
  </sb-template-layers>
`;

export const WithLayer = () => html`
  <sb-template-layers>
    <cds-content-switcher value="all">
      <cds-content-switcher-item value="all">
        First section
      </cds-content-switcher-item>
      <cds-content-switcher-item value="cloudFoundry">
        Second section
      </cds-content-switcher-item>
      <cds-content-switcher-item value="staging">
        Third section
      </cds-content-switcher-item>
    </cds-content-switcher>
  </sb-template-layers>
`;

export const Playground = (args) => {
  const {
    value,
    disableSelection,
    onBeforeSelect = noop,
    onSelect = noop,
    size,
  } = args?.[`${prefix}-content-switcher`] ?? {};
  const handleBeforeSelected = (event: CustomEvent) => {
    onBeforeSelect(event);
    if (disableSelection) {
      event.preventDefault();
    }
  };

  return html`
    <cds-content-switcher
      value="${ifDefined(value)}"
      @cds-content-switcher-beingselected="${handleBeforeSelected}"
      @cds-content-switcher-selected="${onSelect}"
      size="${size}">
      <cds-content-switcher-item value="all">
        First section
      </cds-content-switcher-item>
      <cds-content-switcher-item value="cloudFoundry">
        Second section
      </cds-content-switcher-item>
      <cds-content-switcher-item value="staging">
        Third section
      </cds-content-switcher-item>
    </cds-content-switcher>
  `;
};

Playground.parameters = {
  ...storyDocs.parameters,
  knobs: {
    [`${prefix}-content-switcher`]: () => ({
      value: textNullable('The value of the selected item (value)', ''),
      size: select('Button size (size)', sizes, null),
      disableSelection: boolean(
        `Disable user-initiated selection change (Call event.preventDefault() in ${prefix}-content-switcher-beingselected event)`,
        false
      ),
      onBeforeSelect: action(`${prefix}-content-switcher-beingselected`),
      onSelect: action(`${prefix}-content-switcher-selected`),
    }),
  },
};
