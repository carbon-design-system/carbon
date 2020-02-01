/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const Joi = require('joi');

// Supports both top-level categories and subcategories
//
// categories:
// - name: Category name
//   members:
//   - Member 1
//   - Member 2
//
// categories:
// - name: Category name
//   subcategories:
//   - name: Subcategory name
//     members:
//     - Member 1
//     - Member 2
const categories = {
  name: 'categories',

  schema: Joi.object().keys({
    categories: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().required(),
          members: Joi.array().items(Joi.string()),
          subcategories: Joi.array().items(
            Joi.object().keys({
              name: Joi.string().required(),
              members: Joi.array()
                .items(Joi.string())
                .required(),
            })
          ),
        })
      )
      .required(),
  }),

  extend(metadata, data) {
    return;
    const { categories } = data;
    for (const category of categories) {
      const { name, members, subcategories } = category;

      if (Array.isArray(subcategories)) {
        for (const subcategory of subcategories) {
          for (const member of subcategory.members) {
            const icon = index.find(({ name }) => name === member);
            icon.category = name;
            icon.subcategory = subcategory.name;
          }
        }
        return;
      }

      for (const member of members) {
        const icon = index.find(({ name }) => name === member);
        icon.category = name;
      }
    }
  },

  validate(registry, data) {
    return;
    const { categories } = data;

    const icons = categories
      .map(({ subcategories, members }) => {
        if (Array.isArray(subcategories)) {
          return subcategories
            .map(subcategory => subcategory.members)
            .reduce((acc, members) => acc.concat(members), []);
        }
        return members;
      })
      .reduce((acc, members) => acc.concat(members), []);

    // Every entry in index should exist in data
    for (const icon of index) {
      if (!icons.includes(icon.name)) {
        throw new Error(
          `Expected icon \`${icon.name}\` from index to exist in category data`
        );
      }
    }

    // Every entry in data should exist in index
    for (const icon of icons) {
      if (!index.find(({ name }) => icon === name)) {
        throw new Error(
          `Expected icon \`${icon}\` from category data to exist in index`
        );
      }
    }
  },
};

module.exports = categories;
