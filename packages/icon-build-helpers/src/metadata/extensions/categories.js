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
const categories = () => {
  return {
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
                members: Joi.array().items(Joi.string()).required(),
              })
            ),
          })
        )
        .required(),
    }),

    extend(metadata, data) {
      const { categories } = data;

      metadata.categories = categories;

      for (const category of categories) {
        const { name, members, subcategories } = category;

        if (Array.isArray(subcategories)) {
          for (const subcategory of subcategories) {
            for (const member of subcategory.members) {
              const icon = metadata.icons.find(({ name }) => name === member);
              icon.category = name;
              icon.subcategory = subcategory.name;
            }
          }
          continue;
        }

        for (const member of members) {
          const icon = metadata.icons.find(({ name }) => name === member);
          icon.category = name;
        }
      }
    },

    validate(registry, data) {
      // Flatten the category data into a flat list of members with corresponding
      // name and category data
      const members = [];

      for (const category of data.categories) {
        if (Array.isArray(category.subcategories)) {
          for (const subcategory of category.subcategories) {
            for (const member of subcategory.members) {
              members.push({
                name: member,
                category: category.name,
                subcategory: subcategory.name,
              });
            }
          }
          continue;
        }

        for (const member of category.members) {
          members.push({
            name: member,
            category: category.name,
          });
        }
      }

      // Verify that every asset in the registry has category information
      for (const icon of registry.values()) {
        const match = members.find((member) => member.name === icon.id);
        if (!match) {
          const filepaths = icon.assets.map((asset) => asset.filepath);
          throw new Error(
            `Expected the following icon to have category information: ` +
              `\`${icon.id}\`. This icon has assets in the following locations:\n` +
              filepaths.join('\n')
          );
        }
      }

      // Verify that every asset with a category exists in the registry
      for (const member of members) {
        if (!registry.has(member.name)) {
          let categoryPath = `category \`${member.category}\``;
          if (member.subcategory) {
            categoryPath += `, subcategory \`${member.subcategory}\``;
          }
          throw new Error(
            `Found the entry \`${member.name}\` in ${categoryPath} that does ` +
              `not have a corresponding icon or asset. Either this icon does ` +
              `not exist, or is not available in the current directory.`
          );
        }
      }
    },
  };
};

module.exports = categories;
