/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import addons, { makeDecorator } from '@storybook/addons';
import {
  CARBON_CURRENT_THEME,
  CARBON_THEME_PARAM,
  WITH_CARBON_THEME,
} from './shared';

const Wrapper = (getStory, context, { parameters }) => {
  const channel = addons.getChannel();

  const setCarbonTheme = (theme) => {
    document.documentElement.setAttribute('storybook-carbon-theme', theme);
  };

  return {
    template: `<story/>`,
    mounted() {
      channel.on(CARBON_CURRENT_THEME, setCarbonTheme);
      setCarbonTheme(parameters.value);
    },
  };
};

export const withCarbonTheme = makeDecorator({
  name: WITH_CARBON_THEME,
  parameterName: CARBON_THEME_PARAM,
  wrapper: Wrapper,
});
