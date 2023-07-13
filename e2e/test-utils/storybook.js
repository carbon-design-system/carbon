/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { snapshot } = require('./snapshot');

async function visitStory(page, options) {
  const { component, story, id, globals, args } = options;
  let url = getStoryUrl({
    component,
    story,
    id,
  });

  if (args) {
    const values = Object.entries(args)
      .map(([key, value]) => {
        return `${key}:${value}`;
      })
      .join(';');
    url = url + `&args=${values}`;
  }

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

function getStoryUrl({ component, story, id }) {
  const normalized = id ? id : `components-${component}--${story}`;

  // Note: We serve a static storybook in CI that will trim .html extensions
  // from the URL
  if (process.env.CI) {
    return `/iframe?id=${normalized}&viewMode=story`;
  }
  return `/iframe.html?id=${normalized}&viewMode=story`;
}

async function snapshotStory(page, storyOptions) {
  const { component, story, id, theme } = storyOptions;
  await visitStory(page, {
    component,
    story,
    id,
    globals: {
      theme,
    },
  });
  await snapshot(page, {
    theme,
    component,
    story,
    id,
  });
}

module.exports = {
  snapshotStory,
  visitStory,
};
