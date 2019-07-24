/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const Joi = require('joi');
const yaml = require('js-yaml');
const search = require('../src/search');

const CATEGORIES_PATH = path.resolve(__dirname, '../categories.yml');
const METADATA_PATH = path.resolve(__dirname, '../metadata.yml');
const ICONS_DIRECTORY = path.resolve(__dirname, '../src/svg');

// Checks:
// 1) That all icons are present in metadata
// 2) That all icons have a category
// 3) If an icon has a size in source, make sure it exists in metadata
async function check() {
  const categoriesConfig = yaml.safeLoad(
    await fs.readFile(CATEGORIES_PATH, 'utf8')
  );
  const metadataConfig = yaml.safeLoad(
    await fs.readFile(METADATA_PATH, 'utf8')
  );
  const { error, value: iconMetadata } = Joi.validate(
    metadataConfig,
    metadataSchema
  );
  if (error) {
    throw error;
  }

  const {
    error: categoriesValidationError,
    value: categoriesMetadata,
  } = Joi.validate(categoriesConfig, categoriesSchema);
  if (error) {
    throw categoriesValidationError;
  }

  const { icons: metadata } = iconMetadata;
  const { categories } = categoriesMetadata;
  const icons = await search(ICONS_DIRECTORY);

  const missingIconsFromMetadata = [];
  const missingVariantFromMetadata = [];
  const missingSizesFromMetadata = [];

  for (const icon of icons) {
    const [sharedName, ...variants] = icon.basename.split('--');
    const entry = metadata.find(entry => {
      return entry.name === sharedName;
    });

    if (entry === undefined) {
      missingIconsFromMetadata.push(icon.basename);
      continue;
    }

    // If we're dealing with an icon at the root level
    if (variants.length === 0) {
      if (!Array.isArray(entry.sizes) || !entry.sizes.includes(icon.size)) {
        missingSizesFromMetadata.push(icon.basename);
        continue;
      }
    }

    if (variants.length > 0) {
      if (!Array.isArray(entry.variants)) {
        missingVariantFromMetadata.push(icon.basename);
        continue;
      }

      const variant = entry.variants.find(variant => {
        return icon.basename === variant.name;
      });

      if (!variant) {
        missingVariantFromMetadata.push(icon.basename);
      }
    }
  }

  if (missingIconsFromMetadata.length > 0) {
    throw new Error(
      `The following icons are missing or an error has occurred:\n` +
        JSON.stringify(missingIconsFromMetadata, null, 2)
    );
  }

  if (missingVariantFromMetadata.length > 0) {
    throw new Error(
      `The following icon variants are missing or an error has occurred:\n` +
        JSON.stringify(missingVariantFromMetadata, null, 2)
    );
  }

  if (missingSizesFromMetadata.length > 0) {
    throw new Error(
      `The following icon sizes are missing or an error has occurred:\n` +
        JSON.stringify(missingSizesFromMetadata, null, 2)
    );
  }

  const index = icons.map(icon => icon.basename);
  const miscategorizedOrMissingIcons = [];

  for (const category of categories) {
    for (const subcategory of category.subcategories) {
      for (const member of subcategory.members) {
        if (index.indexOf(member) === -1) {
          miscategorizedOrMissingIcons.push(member);
        }
      }
    }
  }

  if (miscategorizedOrMissingIcons.length > 0) {
    throw new Error(
      `The following icons are included in categories but do not exist in ` +
        `the icon source folder:\n` +
        JSON.stringify(miscategorizedOrMissingIcons, null, 2)
    );
  }
}

const aliasesSchema = Joi.array().items(Joi.string());

const baseIconSchema = Joi.object().keys({
  name: Joi.string().required(),
  friendly_name: Joi.string().required(),
  usage: Joi.string().required(),
  sizes: Joi.array().items(
    Joi.number().only(16, 20, 24, 32),
    Joi.string().only('glyph')
  ),
  aliases: aliasesSchema,
});

const categorySchema = Joi.array().items(
  Joi.object().keys({
    name: Joi.string().required(),
    subcategory: Joi.string().required(),
  })
);

const iconSchema = baseIconSchema.keys({
  categories: categorySchema.required(),
  aliases: Joi.array()
    .items(Joi.string())
    .required(),
  variants: Joi.array().items(baseIconSchema),
});

const categoriesSchema = Joi.array().items(
  Joi.object().keys({
    name: Joi.string().required(),
    subcategories: Joi.array().items(
      Joi.object()
        .keys({
          name: Joi.string().required(),
          members: Joi.array().items(Joi.string()),
        })
        .required()
    ),
  })
);

const metadataSchema = Joi.object().keys({
  icons: Joi.array()
    .items(iconSchema)
    .required(),
});

check().catch(error => {
  console.log(error);
  process.exit(1);
});
