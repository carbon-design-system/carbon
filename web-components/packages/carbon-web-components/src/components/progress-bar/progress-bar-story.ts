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
import {
  PROGRESS_BAR_SIZE,
  PROGRESS_BAR_STATUS,
  PROGRESS_BAR_TYPE,
} from '../progress-bar/progress-bar';
import './progress-bar';
import '../../../.storybook/templates/with-layer';
import storyDocs from './progress-bar-story.mdx';
import { prefix } from '../../globals/settings';

const sizes = {
  [`Small size (${PROGRESS_BAR_SIZE.SMALL})`]: PROGRESS_BAR_SIZE.SMALL,
  [`Big size (${PROGRESS_BAR_SIZE.BIG})`]: PROGRESS_BAR_SIZE.BIG,
};

const status = {
  [`Active (${PROGRESS_BAR_STATUS.ACTIVE})`]: PROGRESS_BAR_STATUS.ACTIVE,
  [`Finished (${PROGRESS_BAR_STATUS.FINISHED})`]: PROGRESS_BAR_STATUS.FINISHED,
  [`Error (${PROGRESS_BAR_STATUS.ERROR})`]: PROGRESS_BAR_STATUS.ERROR,
};

const types = {
  [`Default (${PROGRESS_BAR_TYPE.DEFAULT})`]: PROGRESS_BAR_TYPE.DEFAULT,
  [`Inline (${PROGRESS_BAR_TYPE.INLINE})`]: PROGRESS_BAR_TYPE.INLINE,
  [`Indented (${PROGRESS_BAR_TYPE.INDENTED})`]: PROGRESS_BAR_TYPE.INDENTED,
};

export const Default = () => {
  return html`
    <cds-progress-bar
      label="Progress bar label"
      helper-text="Optional helper text"
      value="75">
    </cds-progress-bar>
  `;
};

export const Example = () => {
  const size = 728;
  let progress = 0;

  setTimeout(() => {
    const bar = document.querySelector('cds-progress-bar');
    const interval = setInterval(() => {
      const advancement = Math.random() * 8;
      if (progress + advancement < size) {
        progress = progress + advancement;
        bar!.setAttribute('value', `${progress}`);
        bar!.setAttribute(
          'helper-text',
          `${progress.toFixed(1)}MB of ${size}MB`
        );
      } else {
        clearInterval(interval);
        bar!.setAttribute('value', `${size}`);
        bar!.setAttribute('status', `${PROGRESS_BAR_STATUS.FINISHED}`);
        bar!.setAttribute('helper-text', 'Done');
      }
    }, 50);
  }, 3000);

  return html`
    <cds-progress-bar
      max="${size}"
      label="Export data"
      helper-text="Fetching assets..."
      status="${PROGRESS_BAR_STATUS.ACTIVE}">
    </cds-progress-bar>
  `;
};

export const Indeterminate = () => {
  return html`
    <cds-progress-bar
      label="Progress bar label"
      helper-text="Optional helper text">
    </cds-progress-bar>
  `;
};

export const WithLayer = () => {
  return html`
    <sb-template-layers>
      <cds-progress-bar
        label="Progress bar label"
        helper-text="Optional helper text"
        value="42">
      </cds-progress-bar>
    </sb-template-layers>
  `;
};

export const Playground = (args) => {
  const { helperText, hideLabel, label, max, size, status, type, value } =
    args?.[`${prefix}-progress-bar`] ?? {};
  return html`
    <cds-progress-bar
      max="${ifDefined(max)}"
      ?hide-label="${hideLabel}"
      label="${ifDefined(label)}"
      helper-text="${ifDefined(helperText)}"
      size="${ifDefined(size)}"
      status="${ifDefined(status)}"
      type="${ifDefined(type)}"
      value="${value}">
    </cds-progress-bar>
  `;
};

Playground.parameters = {
  knobs: {
    [`${prefix}-progress-bar`]: () => ({
      helperText: textNullable(
        'Helper text (helper-text)',
        'Optional helper text'
      ),
      hideLabel: boolean('Hide label (hide-label)', false),
      label: textNullable('Label (label)', 'Progress bar label'),
      max: number('Max (max)', 100),
      size: select('Size (size)', sizes, PROGRESS_BAR_SIZE.BIG),
      status: select('Status (status)', status, PROGRESS_BAR_STATUS.ACTIVE),
      type: select('Type (type)', types, PROGRESS_BAR_TYPE.DEFAULT),
      value: number('Value (value)', 75),
    }),
  },
};

export default {
  title: 'Components/Progress bar',
  parameters: {
    ...storyDocs.parameters,
  },
};
