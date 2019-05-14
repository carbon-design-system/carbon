/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Page } from 'sketch/dom';

/**
 * Find or create a page for the given document context and page name
 * @param {SketchContext} context
 * @param {string} pageName
 * @return {MSPage}
 */
export function findOrCreatePage(context, pageName) {
  let [page] = Array.from(context.document.pages()).filter(page => {
    return '' + page.name() === pageName;
  });

  if (!page) {
    page = new Page({
      name: pageName,
      parent: context.document,
    });
  }

  clearPage(page);
  page.selected = true;

  return page;
}

/**
 * Clear all the layers for a given page.
 * @param {MSPage} page
 * @return {MSPage}
 */
export function clearPage(page) {
  if (!Array.isArray(page.layers) && page.layers().count() > 0) {
    for (let i = page.layers().count() - 1; i >= 0; i--) {
      const layer = page.layers().objectAtIndex(i);
      layer.removeFromParent();
    }
  }
  return page;
}
