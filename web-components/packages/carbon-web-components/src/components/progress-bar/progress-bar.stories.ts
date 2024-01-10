/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import {
  PROGRESS_BAR_SIZE,
  PROGRESS_BAR_STATUS,
  PROGRESS_BAR_TYPE,
} from '../progress-bar/progress-bar';
import './progress-bar';
import '../../../.storybook/templates/with-layer';
import storyDocs from './progress-bar.mdx';

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

const args = {
  helperText: 'Optional helper text',
  hideLabel: false,
  label: 'Progress bar label',
  max: 100,
  size: PROGRESS_BAR_SIZE.BIG,
  status: PROGRESS_BAR_STATUS.ACTIVE,
  type: PROGRESS_BAR_TYPE.DEFAULT,
  value: 75,
};

const argTypes = {
  helperText: {
    control: 'text',
    description: 'The current progress as a textual representation.',
  },
  hideLabel: {
    control: 'boolean',
    description: 'Whether the label should be visually hidden.',
  },
  label: {
    control: 'text',
    description: 'A label describing the progress bar.',
  },
  max: {
    control: 'number',
    description: 'The maximum value.',
  },
  size: {
    control: 'select',
    description: 'Specify the size of the progress bar.',
    options: sizes,
  },
  status: {
    control: 'select',
    description: 'Specify the status.',
    options: status,
  },
  type: {
    control: 'select',
    description: 'Defines the alignment variant of the progress bar.',
    options: types,
  },
  value: {
    control: 'number',
    description: 'The current value.',
  },
};

export const Default = {
  render: () => {
    return html`
      <cds-progress-bar
        label="Progress bar label"
        helper-text="Optional helper text"
        value="75">
      </cds-progress-bar>
    `;
  },
};

export const Example = {
  render: () => {
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
  },
};

export const Indeterminate = {
  render: () => {
    return html`
      <cds-progress-bar
        label="Progress bar label"
        helper-text="Optional helper text">
      </cds-progress-bar>
    `;
  },
};

export const WithLayer = {
  render: () => {
    return html`
      <sb-template-layers>
        <cds-progress-bar
          label="Progress bar label"
          helper-text="Optional helper text"
          value="42">
        </cds-progress-bar>
      </sb-template-layers>
    `;
  },
};

export const Playground = {
  args,
  argTypes,
  render: (args) => {
    const { helperText, hideLabel, label, max, size, status, type, value } =
      args ?? {};
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
  },
};

const meta = {
  title: 'Components/Progress Bar',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
