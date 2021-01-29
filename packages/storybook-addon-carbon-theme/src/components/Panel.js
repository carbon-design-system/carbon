/* eslint-disable react/prop-types */
/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@storybook/components';
import { SET_STORIES, STORY_CHANGED } from '@storybook/core-events';

import {
  CARBON_CURRENT_THEME,
  CARBON_THEMES,
  CARBON_THEME_DEFAULT,
  CARBON_THEME_PARAM,
  mergeParams,
} from '../shared';

/**
 * Storybook add-on panel for Carbon theme switcher.
 */
export const CarbonThemesPanel = ({ api, active, channel }) => {
  const [theme, setTheme] = useState(CARBON_THEME_DEFAULT);
  const [themes, setThemes] = useState(CARBON_THEMES);

  useEffect(() => {
    // on mount sort out initial state
    const handleStoryChange = () => {
      const storyData = api.getCurrentStoryData();

      let params = storyData
        ? storyData.parameters
          ? storyData.parameters[CARBON_THEME_PARAM]
          : {}
        : {};

      params = mergeParams(params);

      setTheme(params.theme);
      setThemes(params.themes);
    };

    api.on(SET_STORIES, handleStoryChange);
    api.on(STORY_CHANGED, handleStoryChange);

    return () => {
      api.off(SET_STORIES, handleStoryChange);
      api.off(STORY_CHANGED, handleStoryChange);
    };
  }, [api]);

  useEffect(() => {
    channel.emit(CARBON_CURRENT_THEME, theme);
  }, [theme, channel]);

  if (!active) {
    return null;
  }

  return (
    <Form>
      <Form.Field label="Select Carbon theme:">
        <Form.Select
          name="carbon-theme"
          value={theme}
          onChange={(ev) => setTheme(ev.target.value)}
          size="flex">
          {themes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Form.Select>
      </Form.Field>
    </Form>
  );
};

CarbonThemesPanel.propTypes = {
  /**
   * `true` if this Storybook add-on panel is active.
   */
  active: PropTypes.bool.isRequired,
  /**
   * The Storybook API object.
   */
  api: PropTypes.any,
  /**
   * channel
   */
  channel: PropTypes.object,
};
