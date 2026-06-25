/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Button } from '@carbon/react';
import { Edit } from '@carbon/react/icons';
import { action } from 'storybook/actions';

import { previewCandidate__BigNumber as BigNumber } from '..';
import { BigNumberSize } from './constants';

import mdx from './BigNumber.mdx';

import styles from './_storybook-styles.scss?inline';

const numericOptions = {
  '-123 ': -123,
  '0 ': 0,
  '12 ': 12,
  '345 ': 345,
  '6789 ': 6789,
  '12345.678 ': 12345.678,
  '678901.2456 ': 678901.2456,
  '1000000 ': 1000000,
  '2345678 ': 2345678,
  '90123456 ': 90123456,
  '789012345 ': 789012345,
  '6789012345 ': 6789012345,
  'null ': null,
  'undefined ': undefined,
};

const iconButtonOptions = {
  'undefined ': null,
  'Example <Button> ': (
    <Button
      renderIcon={Edit}
      iconDescription="Icon Description"
      kind="ghost"
      size={'sm'}
      hasIconOnly
      onClick={action('Button.onClick()')}
      tooltipPosition="bottom"
    />
  ),
};

export default {
  title: 'Preview Candidate/BigNumber',
  component: BigNumber,
  tags: ['autodocs'],
  // TODO: Define argTypes for props not represented by standard JS types.
  argTypes: {
    forceShowTotal: {
      options: [true, false],
      control: { type: 'boolean' },
    },
    iconButton: {
      control: { type: 'select', labels: Object.keys(iconButtonOptions) },
      options: Object.values(iconButtonOptions).map((_k, i) => i),
      mapping: Object.values(iconButtonOptions),
    },
    loading: {
      options: [true, false],
      control: { type: 'boolean' },
    },
    locale: {
      options: [
        'bg',
        'cs',
        'da-DK',
        'de-CH',
        'de',
        'en-AU',
        'en-GB',
        'en-US',
        'en-ZA',
        'es-ES',
        'es',
        'et',
        'fi',
        'fr-CA',
        'fr-CH',
        'fr',
        'hu',
        'it',
        'ja',
        'lv',
        'nl-BE',
        'nl-NL',
        'no',
        'pl',
        'pt-BR',
        'pt-PT',
        'ru-UA',
        'ru',
        'sk',
        'sl',
        'th',
        'tr',
        'uk-UA',
        'vi',
      ],
      control: { type: 'select' },
    },
    percentage: {
      options: [true, false],
      control: { type: 'boolean' },
    },
    size: {
      options: Object.values(BigNumberSize),
      control: { type: 'radio' },
    },
    total: {
      control: { type: 'select', labels: Object.keys(numericOptions) },
      options: Object.values(numericOptions).map((_k, i) => i),
      mapping: Object.values(numericOptions),
    },
    trending: {
      options: [true, false],
      control: { type: 'boolean' },
    },
    truncate: {
      options: [true, false],
      control: { type: 'boolean' },
    },
    value: {
      control: { type: 'select', labels: Object.keys(numericOptions) },
      options: Object.values(numericOptions).map((_k, i) => i),
      mapping: Object.values(numericOptions),
    },
  },
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
};

const defaultProps = {
  forceShowTotal: false,
  fractionDigits: 1,
  iconButton: 0,
  label: 'Label',
  loading: false,
  locale: 'en-US',
  percentage: false,
  size: 'default',
  tooltipDescription: '',
  total: 13,
  trending: false,
  truncate: true,
  value: 5,
};

/**
 * TODO: Declare template(s) for one or more scenarios.
 */
const Template = (args) => {
  return <BigNumber {...args} />;
};

/**
 * TODO: Declare one or more stories, generally one per design scenario.
 * NB no need for a 'Playground' because all stories have all controls anyway.
 */
export const bigNumber = Template.bind({});
bigNumber.args = {
  ...defaultProps,
};
