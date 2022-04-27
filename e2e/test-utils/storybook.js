/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const themes = ['white', 'g10', 'g90', 'g100'];

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
}

module.exports = {
  visitStory,
  themes,
};
