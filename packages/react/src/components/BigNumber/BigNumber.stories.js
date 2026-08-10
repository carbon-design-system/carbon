/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Button } from '../Button';
import { Edit } from '@carbon/icons-react';
import { action } from 'storybook/actions';

import { BigNumber } from '.';
import { BigNumberSize } from './constants';

import mdx from './BigNumber.mdx';

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
  None: null,
  'Edit button': (
    <Button
      renderIcon={Edit}
      iconDescription="Edit"
      kind="ghost"
      size="sm"
      hasIconOnly
      onClick={action('Button.onClick()')}
      tooltipPosition="bottom"
    />
  ),
};

export default {
  title: 'Preview/BigNumber',
  component: BigNumber,
  tags: ['autodocs'],
  argTypes: {
    // Hide props with no meaningful visual control
    className: { table: { disable: true } },
    iconButton: {
      control: { type: 'select' },
      options: Object.keys(iconButtonOptions),
      mapping: iconButtonOptions,
    },
    forceShowTotal: {
      control: { type: 'boolean' },
    },
    fractionDigits: {
      control: { type: 'number', min: 0, max: 3 },
    },
    loading: {
      control: { type: 'boolean' },
    },
    locale: {
      control: { type: 'select' },
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
    },
    percentage: {
      control: { type: 'boolean' },
    },
    size: {
      control: { type: 'radio' },
      options: Object.values(BigNumberSize),
    },
    total: {
      control: { type: 'select' },
      options: Object.keys(numericOptions),
      mapping: numericOptions,
    },
    trending: {
      control: { type: 'boolean' },
    },
    truncate: {
      control: { type: 'boolean' },
    },
    value: {
      control: { type: 'select' },
      options: Object.keys(numericOptions),
      mapping: numericOptions,
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = {
  args: {
    forceShowTotal: false,
    fractionDigits: 1,
    iconButton: 'None',
    label: 'Label',
    loading: false,
    locale: 'en-US',
    percentage: false,
    size: BigNumberSize.Default,
    tooltipDescription: '',
    total: 13,
    trending: false,
    truncate: true,
    value: 5,
  },
};
