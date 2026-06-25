/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';
import { CarbonIcon } from '@carbon/web-components/es/globals/es/globals/internal/icon-loader-utils.js';
import '@carbon/web-components/es/components/tooltip/index.js';
import ArrowDown16 from '@carbon/icons/es/arrow--down/16.js';
import ArrowDown20 from '@carbon/icons/es/arrow--down/20.js';
import ArrowDown24 from '@carbon/icons/es/arrow--down/24.js';
import Information16 from '@carbon/icons/es/information/16.js';
import Edit16 from '@carbon/icons/es/edit/16.js';

import { prefix } from '../../globals/settings';
import './index';

import { BigNumberSize } from './constants';
import styles from './story-styles.scss?lit';

const storyPrefix = `${prefix}--big-number-stories`;

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

const defaultProps = {
  fractionDigits: 1,
  label: 'Label',
  loading: false,
  locale: 'en-US',
  percentage: false,
  size: BigNumberSize.Default,
  total: 13,
  trending: false,
  truncate: true,
  value: 5,
};

const argTypes = {
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
};

const defaultChecklistTemplate = {
  args: defaultProps,
  argTypes: argTypes,
  render: (args) => {
    const {
      fractionDigits,
      label,
      loading,
      locale,
      percentage,
      size,
      total,
      trending,
      truncate,
      value,
    } = args;

    return html`
      <style>
        ${styles}
      </style>
      <div class="${storyPrefix}__viewport">
        <c4p-big-number
          fraction-digits=${fractionDigits}
          label=${label}
          .value=${value}
          .total=${total}
          size=${size}
          locale=${locale}
          ?trending=${trending}
          ?truncate=${truncate}
          ?percentage=${percentage}
          ?loading=${loading}
        >
        </c4p-big-number>
      </div>
    `;
  },
};

export const Default = {
  ...defaultChecklistTemplate,
};

const customBigNumberTemplate = {
  args: {
    ...defaultProps,
    trending: true,
  },
  argTypes: argTypes,
  render: (args) => {
    const {
      fractionDigits,
      label,
      loading,
      locale,
      percentage,
      size,
      total,
      trending,
      truncate,
      value,
    } = args;

    const getTrendingIcon = (size: BigNumberSize): CarbonIcon => {
      switch (size) {
        case 'lg':
          return ArrowDown20;
        case 'xl':
          return ArrowDown24;
        default:
          return ArrowDown16;
      }
    };

    return html`
      <style>
        ${styles}
      </style>
      <div class="${storyPrefix}__viewport">
        <c4p-big-number
          fraction-digits=${fractionDigits}
          label=${label}
          .value=${value}
          .total=${total}
          size=${size}
          locale=${locale}
          ?trending=${trending}
          ?truncate=${truncate}
          ?percentage=${percentage}
          ?loading=${loading}
        >
          <div slot="label" class="${storyPrefix}__label-with-tooltip">
            <span class="custom-label"> ${label} </span>
            <cds-tooltip align="right" class="${storyPrefix}__tooltip">
              ${iconLoader(Information16, {
                id: 'trigger',
                'aria-labelledby': 'content',
              })}
              <cds-tooltip-content id="content"
                >Tooltip content</cds-tooltip-content
              >
            </cds-tooltip>
          </div>

          ${iconLoader(getTrendingIcon(size), {
            slot: 'trending-icon',
            class: `${prefix}--big-number__trend`,
          })}
          <cds-icon-button
            kind="ghost"
            size="sm"
            align="bottom"
            slot="icon-button"
          >
            ${iconLoader(Edit16, {
              slot: 'icon',
            })}
            <span slot="tooltip-content">Icon description</span>
          </cds-icon-button>
        </c4p-big-number>
      </div>
    `;
  },
};

export const WithCustomIcons = {
  ...customBigNumberTemplate,
};

export const Skeleton = {
  args: { size: BigNumberSize.Default },
  argTypes: {
    size: {
      options: Object.values(BigNumberSize),
      control: { type: 'radio' },
    },
  },
  render: (args) => {
    const { size } = args;

    return html`
      <style>
        ${styles}
      </style>
      <div class="${storyPrefix}__viewport">
        <c4p-big-number-skeleton size=${size}> </c4p-big-number-skeleton>
      </div>
    `;
  },
};

const meta = {
  title: 'Components/BigNumber',
};

export default meta;
