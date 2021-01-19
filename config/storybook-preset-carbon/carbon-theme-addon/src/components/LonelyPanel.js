/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@storybook/components';
import { CARBON_CURRENT_THEME, CARBON_TYPE_TOKEN } from '../shared';

export const CarbonThemesPanel = ({ api, active }) => {
    const [currentTheme, setCurrentTheme] = useState('white');
    const handleChange = useCallback(
      (event) => {
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