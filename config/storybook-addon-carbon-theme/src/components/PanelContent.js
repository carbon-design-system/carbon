/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Form } from '@storybook/components';
import PropTypes from 'prop-types';
import { CARBON_THEMES } from '../constants';

export const PanelContent = ({ theme, onChange }) => {
  const themes = Object.values(CARBON_THEMES);

  return (
    <div>
      <Form>
        <Form.Field label="Select Carbon theme:">
          <Form.Select
            name="carbon-theme"
            value={theme}
            onChange={(ev) => {
              onChange && onChange(ev.target.value);
            }}
            size="flex"
          >
            {themes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </Form.Field>
      </Form>
    </div>
  );
};

PanelContent.propTypes = {
  onChange: PropTypes.func,
  theme: PropTypes.string,
};
