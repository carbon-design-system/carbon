/**
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@storybook/components';
import {
  CARBON_CURRENT_THEME,
  CARBON_TYPE_TOKEN,
  CARBON_LAYOUT_TOKEN,
} from '../shared';

const typeTokenPairings = [
  '12-16',
  '14-18',
  '14-20',
  '16-24',
  '16-22',
  '20-26',
  '28-36',
];

const typeTokenDefaults = {
  'caption-01': '12-16',
  'label-01': '12-16',
  'helper-text-01': '12-16',
  'body-short-01': '14-18',
  'body-short-02': '16-22',
  'body-long-01': '14-20',
  'body-long-02': '16-24',
  'code-01': '12-16',
  'code-02': '14-20',
  'productive-heading-01': '14-18',
  'productive-heading-02': '16-22',
  'productive-heading-03': '20-26',
  'productive-heading-04': '28-36',
};

/**
 * Storybook add-on panel for Carbon theme switcher.
 */
export const CarbonThemesPanel = ({ api, active }) => {
  const [currentTheme, setCurrentTheme] = useState('white');
  const handleChange = useCallback(
    event => {
      const { value } = event.target;
      setCurrentTheme(value);
      api.getChannel().emit(CARBON_CURRENT_THEME, value);
    },
    [api]
  );
  return (
    active && (
      <Form>
        <Form.Field label="Select Carbon theme:">
          <Form.Select
            name="carbon-theme"
            value={currentTheme}
            onChange={handleChange}
            size="flex">
            <option key="white" value="white">
              white
            </option>
            <option key="g10" value="g10">
              g10
            </option>
            <option key="g90" value="g90">
              g90
            </option>
            <option key="g100" value="g100">
              g100
            </option>
          </Form.Select>
        </Form.Field>
      </Form>
    )
  );
};

CarbonThemesPanel.propTypes = {
  /**
   * The Storybook API object.
   */
  api: PropTypes.shape({
    getChannel: PropTypes.func,
  }).isRequired,

  /**
   * `true` if this Storybook add-on panel is active.
   */
  active: PropTypes.bool.isRequired,
};

/**
 * Storybook add-on panel for Carbon type token switcher.
 */
export const CarbonTypePanel = ({ api, active }) => {
  const [currentTypeTokens, setCurrentTypeTokens] = useState(typeTokenDefaults);
  const handleTokenChange = useCallback(
    event => {
      const { name: tokenName, value: tokenValue } = event.target;
      setCurrentTypeTokens({ ...currentTypeTokens, [tokenName]: tokenValue });
      api.getChannel().emit(CARBON_TYPE_TOKEN, { tokenName, tokenValue });
    },
    [api]
  );
  return (
    active && (
      <Form>
        {Object.keys(typeTokenDefaults).map(tokenName => (
          <Form.Field key={tokenName} label={`${tokenName}:`}>
            <Form.Select
              name={tokenName}
              onChange={handleTokenChange}
              size="flex"
              value={currentTypeTokens[tokenName]}>
              {typeTokenPairings.map(tokenValue => {
                const [fontSize, lineHeight] = tokenValue.split('-');
                return (
                  <option key={tokenValue} value={tokenValue}>
                    {`${fontSize}px font-size / ${lineHeight}px line-height`}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Field>
        ))}
      </Form>
    )
  );
};

CarbonTypePanel.propTypes = {
  /**
   * The Storybook API object.
   */
  api: PropTypes.shape({
    getChannel: PropTypes.func,
  }).isRequired,

  /**
   * `true` if this Storybook add-on panel is active.
   */
  active: PropTypes.bool.isRequired,
};

const layoutTokenDefaults = {
  container: {
    'container-01': '1.5rem',
    'container-02': '2rem',
    'container-03': '2.5rem',
    'container-04': '3rem',
    'container-05': '4rem',
  },
  'fluid-spacing': {
    'fluid-spacing-01': '0',
    'fluid-spacing-02': '2vw',
    'fluid-spacing-03': '5vw',
    'fluid-spacing-04': '10vw',
  },
  'icon-size': {
    'icon-size-01': '1rem',
    'icon-size-02': '1.25rem',
  },
  layout: {
    'layout-01': '1rem',
    'layout-02': '1.5rem',
    'layout-03': '2rem',
    'layout-04': '3rem',
    'layout-05': '4rem',
    'layout-06': '6rem',
    'layout-07': '10rem',
  },
  spacing: {
    'spacing-01': '0.125rem',
    'spacing-02': '0.25rem',
    'spacing-03': '0.5rem',
    'spacing-04': '0.75rem',
    'spacing-05': '1rem',
    'spacing-06': '1.5rem',
    'spacing-07': '2rem',
    'spacing-08': '2.5rem',
    'spacing-09': '3rem',
    'spacing-10': '4rem',
    'spacing-11': '5rem',
    'spacing-12': '6rem',
  },
};

/**
 * Storybook add-on panel for Carbon layout token switcher.
 */
export const CarbonLayoutPanel = ({ api, active }) => {
  const [currentLayoutTokens, setCurrentLayoutTokens] = useState(
    layoutTokenDefaults
  );
  const handleLayoutTokenChange = useCallback(
    (event, { tokenType }) => {
      const { name: tokenName, value: tokenValue } = event.target;
      setCurrentLayoutTokens({
        ...currentLayoutTokens,
        [tokenType]: {
          ...currentLayoutTokens[tokenType],
          [tokenName]: tokenValue,
        },
      });
      api.getChannel().emit(CARBON_LAYOUT_TOKEN, { tokenName, tokenValue });
    },
    [api]
  );
  return (
    active && (
      <Form>
        {Object.keys(layoutTokenDefaults).map(tokenType => {
          const tokenCategoryObj = layoutTokenDefaults[tokenType];
          return Object.keys(tokenCategoryObj).map(tokenName => (
            <Form.Field key={tokenName} label={`${tokenName}:`}>
              <Form.Select
                name={tokenName}
                onChange={event =>
                  handleLayoutTokenChange(event, { tokenType })
                }
                size="flex"
                value={currentLayoutTokens[tokenType][tokenName]}>
                {Object.values(tokenCategoryObj).map(tokenValue => (
                  <option key={tokenValue} value={tokenValue}>
                    {tokenValue}
                  </option>
                ))}
              </Form.Select>
            </Form.Field>
          ));
        })}
      </Form>
    )
  );
};

CarbonLayoutPanel.propTypes = {
  /**
   * The Storybook API object.
   */
  api: PropTypes.shape({
    getChannel: PropTypes.func,
  }).isRequired,

  /**
   * `true` if this Storybook add-on panel is active.
   */
  active: PropTypes.bool.isRequired,
};
