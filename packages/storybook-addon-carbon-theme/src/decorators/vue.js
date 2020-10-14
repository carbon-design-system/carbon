/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import addons from '@storybook/addons';
import { CARBON_CURRENT_THEME, CARBON_THEME_DEFAULT } from '../shared';

const channel = addons.getChannel();

export const CarbonThemeDecorator = {
  props: {
    value: '',
  },
  beforeDestroy() {
    channel.removeListener(CARBON_CURRENT_THEME, this.setCarbonTheme);
  },
  mounted() {
    channel.on(CARBON_CURRENT_THEME, this.setCarbonTheme);
    this.setCarbonTheme(this.value || CARBON_THEME_DEFAULT);
  },
  methods: {
    setCarbonTheme(theme) {
      document.documentElement.setAttribute('storybook-carbon-theme', theme);
    },
  },
  template: `<div><slot /></div>`,
};
