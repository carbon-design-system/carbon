/**
 * Copyright IBM Corp. 2019, 2025
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
import { withLayers } from '../../../.storybook/decorators/with-layers';

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
  helperText: '75 MB of 100 MB',
  hideLabel: false,
  label: 'Uploading files',
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

const renderProgressBar = ({
  helperText,
  hideLabel,
  label,
  max,
  size,
  status,
  type,
  value,
}) => html`
  <cds-progress-bar
    max="${ifDefined(max)}"
    ?hide-label="${hideLabel}"
    label="${ifDefined(label)}"
    helper-text="${ifDefined(helperText)}"
    size="${ifDefined(size)}"
    status="${ifDefined(status)}"
    type="${ifDefined(type)}"
    value="${ifDefined(value)}">
  </cds-progress-bar>
`;

export const Default = {
  args,
  argTypes,
  render: renderProgressBar,
};

export const Determinate = {
  args: {
    ...args,
    helperText: 'Fetching assets...',
    label: 'Exporting data',
    max: 728,
    status: PROGRESS_BAR_STATUS.ACTIVE,
    value: undefined,
  },
  argTypes: {
    ...argTypes,
    helperText: {
      control: false,
      table: { readonly: true },
    },
    max: {
      control: false,
      table: { readonly: true },
    },
    status: {
      control: false,
      table: { readonly: true },
    },
    value: {
      control: false,
      table: { readonly: true },
    },
  },
  parameters: {
    controls: {
      include: ['hideLabel', 'label', 'size', 'type'],
    },
  },
  render: ({ hideLabel, label, size: barSize, type }) => {
    const size = 728;
    let progress = 0;

    setTimeout(() => {
      const bar = document.querySelector('cds-progress-bar');
      const interval = setInterval(() => {
        const advancement = Math.random() * 8;
        if (progress + advancement < size) {
          progress = progress + advancement;
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
          bar!.setAttribute('value', `${progress}`);
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
          bar!.setAttribute(
            'helper-text',
            `${progress.toFixed(1)}MB of ${size}MB`
          );
        } else {
          clearInterval(interval);
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
          bar!.setAttribute('value', `${size}`);
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
          bar!.setAttribute('status', `${PROGRESS_BAR_STATUS.FINISHED}`);
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
          bar!.setAttribute('helper-text', 'Done');
        }
      }, 50);
    }, 3000);

    return html`
      <cds-progress-bar
        max="${size}"
        ?hide-label="${hideLabel}"
        label="${ifDefined(label)}"
        helper-text="Fetching assets..."
        size="${ifDefined(barSize)}"
        status="${PROGRESS_BAR_STATUS.ACTIVE}"
        type="${ifDefined(type)}">
      </cds-progress-bar>
    `;
  },
};

export const Indeterminate = {
  args: {
    ...args,
    helperText: 'Preparing files...',
    label: 'Preparing upload',
    value: undefined,
  },
  argTypes: {
    ...argTypes,
    status: {
      table: { readonly: true },
    },
    value: {
      control: false,
      table: { readonly: true },
    },
  },
  parameters: {
    controls: {
      include: ['helperText', 'hideLabel', 'label', 'size', 'status', 'type'],
    },
  },
  render: renderProgressBar,
};

export const WithLayer = {
  args: {
    ...args,
    helperText: '42 MB of 100 MB',
    value: 42,
  },
  argTypes,
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
  },
  render: renderProgressBar,
};

const meta = {
  title: 'Components/Progress Bar',
};

export default meta;
