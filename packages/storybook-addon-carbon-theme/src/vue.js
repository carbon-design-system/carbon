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
  mergeParams,
} from './shared';
import { CarbonThemeDecorator } from './decorators/vue';

const wrapper = (getStory, context, { parameters }) => {
  const channel = addons.getChannel();
  channel.emit(CARBON_CURRENT_THEME);

  return {
    components: { CarbonThemeDecorator },
    template: `<CarbonThemeDecorator :themes="themes" :value="value"><story/></CarbonThemeDecorator>`,
    data() {
      return {
        value: '',
        themes: [],
      };
    },
    mounted() {
      const options = mergeParams(parameters);
      this.value = options.theme;
      this.themes = options.themes;
    },
  };
};

export const withCarbonTheme = makeDecorator({
  name: WITH_CARBON_THEME,
  parameterName: CARBON_THEME_PARAM,
  wrapper,
});
