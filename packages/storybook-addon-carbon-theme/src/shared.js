/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const CARBON_THEMES = ['white', 'g10', 'g90', 'g100'];
export const WITH_CARBON_THEME = 'withCarbonTheme';
export const CARBON_THEME_PARAM = 'carbonTheme';
export const CARBON_THEME_DEFAULT = 'white';

export const CARBON_THEMES_ADDON_ID = 'carbon-theme';
export const CARBON_THEME = `£{CARBON_THEME_PANEL_ID}/carbonTheme`;
export const CARBON_CURRENT_THEME = `${CARBON_THEMES_ADDON_ID}/current`;
export const CARBON_THEME_PANEL_ID = `${CARBON_THEMES_ADDON_ID}/panel`;

const defaultOptions = {
  theme: CARBON_THEMES[0],
  themes: CARBON_THEMES,
};

export const mergeParams = (params) => {
  const options = { themes: [], ...params };

  if (options.themes.length) {
    // filter to params.themes
    options.themes = defaultOptions.themes.filter(
      (option) => options.themes.indexOf(option) > -1
    );
  }

  // check not empty
  if (options.themes.length === 0) {
    options.themes = defaultOptions.themes.slice(0);
  }

  if (!options.theme) {
    options.theme = defaultOptions.theme;
  }

  if (options.themes.indexOf(options.theme) < 0) {
    // default theme to one that exists
    const defaultThemeIndex = options.themes.indexOf(defaultOptions.theme);
    options.theme =
      defaultThemeIndex > 0
        ? options.themes[defaultThemeIndex]
        : options.themes[0];
  }

  return options;
};
