/**
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@storybook/components';
import { CURRENT_THEME, TYPE_TOKEN } from '../shared';

const typeTokenPairings = [
  '12-16',
  '14-18',
  '14-20',
  '16-24',
  '16-22',
  '20-26',
  '28-36',
];

const typeTokens = {
  'caption-01': '12-16',
  'label-01': '12-16',
  'helper-text-01': '12-16',
  'body-short-01': '14-18',
  'body-long-01': '14-20',
  'body-short-02': '16-22',
  'body-long-02': '16-24',
  'code-01': '12-16',
  'code-02': '14-20',
  'heading-01': '14-18',
  'productive-heading-01': '14-18',
  'heading-02': '16-22',
  'productive-heading-02': '16-22',
};

/**
 * Storybook add-on panel for Carbon theme switcher.
 */
const Panel = ({ api, active }) => {
  const [currentTheme, setCurrentTheme] = useState('white');
  const handleThemeChange = useCallback(
    event => {
      const { value } = event.target;
      setCurrentTheme(value);
      api.getChannel().emit(CURRENT_THEME, value);
    },
    [api]
  );
  const handleTokenChange = useCallback(
    event => {
      const { name: tokenName, value: tokenValue } = event.target;
      api.getChannel().emit(TYPE_TOKEN, { tokenName, tokenValue });
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
            onChange={handleThemeChange}
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
        {Object.keys(typeTokens).map(tokenName => (
          <Form.Field key={tokenName} label={`${tokenName}:`}>
            <Form.Select
              name={tokenName}
              onChange={handleTokenChange}
              size="flex">
              {typeTokenPairings.map(tokenValue => {
                const [fontSize, lineHeight] = tokenValue.split('-');
                return (
                  <option
                    key={tokenValue}
                    value={tokenValue}
                    selected={typeTokens[tokenName] === tokenValue || null}>
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

Panel.propTypes = {
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

export default Panel;
