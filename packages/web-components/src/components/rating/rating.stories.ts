/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { RATING_VARIANT, RATING_SIZE } from './rating';
import './index';

const sizes = {
  [`Small size (${RATING_SIZE.SMALL})`]: RATING_SIZE.SMALL,
  [`Medium size (default)`]: RATING_SIZE.MEDIUM,
  [`Large size (${RATING_SIZE.LARGE})`]: RATING_SIZE.LARGE,
};

const defaultArgs = {
  animated: true,
  disabled: false,
  label: 'Label',
  max: 5,
  readOnly: false,
  size: RATING_SIZE.MEDIUM,
};

const defaultThumbArgs = {
  animated: true,
  disabled: false,
  label: 'Label',
  labelThumbsDown: 'Thumbs Down',
  labelThumbsUp: 'Thumbs Up',
  readOnly: false,
  size: RATING_SIZE.MEDIUM,
};

const defaultNpsArgs = {
  disabled: false,
  label: 'Label',
  labelMin: 'Not likely',
  labelMax: 'Very likely',
  max: 10,
  readOnly: false,
  size: RATING_SIZE.MEDIUM,
};

const argTypes = {
  animated: {
    control: 'boolean',
    description: 'Whether to show animations on interaction (animated)',
  },
  disabled: {
    control: 'boolean',
    description: 'Whether the rating is disabled (disabled)',
  },
  label: {
    control: 'text',
    description: 'Specify the text for the rating label (label)',
  },
  labelMax: {
    control: 'text',
    description: 'The best rating (labelMax)',
  },
  labelMin: {
    control: 'text',
    description: 'The worst rating (labelMin)',
  },
  labelThumbsDown: {
    control: 'text',
    description:
      'Provide the accessible label for the thumbs down button. Only read by screen readers, not visible in the UI',
  },
  labelThumbsUp: {
    control: 'text',
    description:
      'Provide the accessible label for the thumbs up button. Only read by screen readers, not visible in the UI',
  },
  max: {
    control: 'number',
    description: 'The maximum rating value (max)',
  },
  readOnly: {
    control: 'boolean',
    description: 'Whether the rating is read-only (read-only)',
  },
  size: {
    control: 'radio',
    description: 'The size of the rating component (size)',
    options: sizes,
  },
};

export const Default = {
  args: { ...defaultArgs, variant: RATING_VARIANT.STAR },
  argTypes: {
    ...argTypes,
    variant: {
      table: { readonly: true },
    },
  },
  parameters: {
    controls: {
      include: [
        'animated',
        'disabled',
        'label',
        'max',
        'readOnly',
        'size',
        'variant',
      ],
    },
  },
  render: ({ animated, disabled, label, max, readOnly, size }) => html`
    <cds-rating
      ?animated="${animated}"
      ?disabled="${disabled}"
      label-text="${label}"
      max="${max}"
      ?read-only="${readOnly}"
      size="${size}"
      variant="${RATING_VARIANT.STAR}">
    </cds-rating>
  `,
};

export const Thumb = {
  args: { ...defaultThumbArgs, variant: RATING_VARIANT.THUMB },
  argTypes: {
    ...argTypes,
    variant: {
      table: { readonly: true },
    },
  },
  parameters: {
    controls: {
      include: [
        'animated',
        'disabled',
        'label',
        'labelThumbsDown',
        'labelThumbsUp',
        'readOnly',
        'size',
        'variant',
      ],
    },
  },
  render: ({
    animated,
    disabled,
    label,
    labelThumbsDown,
    labelThumbsUp,
    readOnly,
    size,
  }) => html`
    <cds-rating
      ?animated="${animated}"
      ?disabled="${disabled}"
      label-text="${label}"
      label-thumbs-down="${labelThumbsDown}"
      label-thumbs-up="${labelThumbsUp}"
      ?read-only="${readOnly}"
      size="${size}"
      variant="${RATING_VARIANT.THUMB}">
    </cds-rating>
  `,
};

export const Nps = {
  args: { ...defaultNpsArgs, variant: RATING_VARIANT.NPS },
  argTypes: {
    ...argTypes,
    variant: {
      table: { readonly: true },
    },
  },
  parameters: {
    controls: {
      include: [
        'disabled',
        'label',
        'max',
        'labelMax',
        'labelMin',
        'readOnly',
        'size',
        'variant',
      ],
    },
  },
  render: ({
    disabled,
    label,
    max,
    labelMax,
    labelMin,
    readOnly,
    size,
  }) => html`
    <cds-rating
      ?disabled="${disabled}"
      label-text="${label}"
      max="${max}"
      label-max="${labelMax}"
      label-min="${labelMin}"
      ?read-only="${readOnly}"
      size="${size}"
      variant="${RATING_VARIANT.NPS}">
    </cds-rating>
  `,
};

const meta = {
  title: 'Components/Rating',
};

export default meta;
