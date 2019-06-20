/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CATEGORIES_DEFINITION_PATH = path.resolve(__dirname, '../categories.yml');
const categoriesJson = yaml.safeLoad(
  fs.readFileSync(CATEGORIES_DEFINITION_PATH, 'utf8')
);

console.log(categoriesJson['categories'][0]['subcategories'][0]['members']);

/**
 * build object that maps icon names to category & subcategory
 *   - loop through all of `categories.yml`
 *   - keys are icon names
 *   - each iconName object has props for category & subcategory
 *
 * when needing to find category information,
 * `iconCategoryInformation[iconName].category` and
 * `iconCategoryInformation[iconName].subcategory` will return needed info
 */
const iconCategoryInformation = {};
categoriesJson.categories.forEach(category => {
  category.subcategories.forEach(subcategory => {
    subcategory.members.forEach(iconName => {
      iconCategoryInformation[iconName] = {
        category: category.name,
        subcategory: subcategory.name,
      };
    });
  });
});

console.log(iconCategoryInformation);

fs.writeFileSync(
  path.resolve(__dirname, '../icon-metadata/icon-category-mapping.json'),
  JSON.stringify(iconCategoryInformation)
);
