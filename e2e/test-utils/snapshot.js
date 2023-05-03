/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const percySnapshot = require('@percy/playwright');
const { expect } = require('@playwright/test');

/**
 * Snapshot a page and report it either to Percy or record these snapshots
 * locally to compare manually
 */
async function snapshot(page, context) {
  const id = getSnapshotId(context);

  if (process.env.ENABLE_LOCAL_SNAPSHOTS) {
    expect(await page.screenshot()).toMatchSnapshot(`${id}.png`);
  } else {
    await percySnapshot(page, id);
  }
}

/**
 * Get a unique identifier for the given context. If the context is a string, it
 * already represents a valid identifier and will be returned
 */
function getSnapshotId(context) {
  if (typeof context === 'string') {
    return context;
  }

  const { component, story, id, theme } = context;
  if (id) {
    return serialize({
      theme,
      component,
      id,
    });
  }

  return serialize({
    theme,
    component,
    story,
  });
}

/**
 * Serialize a flat object into a string
 */
function serialize(object) {
  // If local snapshots are enabled, encode this object into a valid filename
  if (process.env.ENABLE_LOCAL_SNAPSHOTS) {
    return Object.keys(object).reduce((acc, key, index) => {
      if (index === 0) {
        return `${key}=${object[key]}`;
      }
      return `${acc}-${key}=${object[key]}`;
    }, '');
  }

  return Object.keys(object).reduce((acc, key, index) => {
    if (index === 0) {
      return `${key}: ${object[key]}`;
    }
    return `${acc}, ${key}: ${object[key]}`;
  }, '');
}

module.exports = {
  snapshot,
  getSnapshotId,
};
