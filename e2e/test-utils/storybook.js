/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { snapshot } = require('./snapshot');

async function visitStory(page, options) {
  const { component, story, globals } = options;
  // Note: We serve a static storybook in CI that will trim .html extensions
  // from the URL
  let url = process.env.CI
    ? `/iframe?id=components-${component}--${story}&viewMode=story`
    : `/iframe.html?id=components-${component}--${story}&viewMode=story`;

  if (globals) {
    const values = Object.entries(globals)
      .map(([key, value]) => {
        return `${key}:${value}`;
      })
      .join(',');
    url = url + `&globals=${values}`;
  }

  await page.goto(url);
  await page.waitForSelector('.sb-show-main');
}

async function snapshotStory(page, storyOptions) {
  const { component, story, theme } = storyOptions;
  await visitStory(page, {
    component,
    story,
    globals: {
      theme,
    },
  });
  await snapshot(page, {
    theme,
    component,
    story,
  });
}

module.exports = {
  snapshotStory,
  visitStory,
};
