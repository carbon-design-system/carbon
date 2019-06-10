/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

'use strict';

const { sentenceCase } = require('change-case');
const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');
const search = require('../src/search');

const SVG_DIR = path.resolve(__dirname, '../src/svg');
const METADATA_OUTPUT = path.resolve(__dirname, '../metadata.yml');

async function scaffold() {
  // Get all of our icon files from the SVG directory
  const iconFiles = await search(SVG_DIR);

  // Group icons by a common basename, collecting all sizes
  const iconsGroupedByBasename = iconFiles.reduce((acc, icon) => {
    if (acc[icon.basename]) {
      return {
        ...acc,
        [icon.basename]: acc[icon.basename].concat(icon),
      };
    }
    return {
      ...acc,
      [icon.basename]: [icon],
    };
  }, {});

  // Group icons by common name, this means `add` and `add--filled` are both
  // grouped under `add` as the name
  const iconsGroupedByName = Object.keys(iconsGroupedByBasename).reduce(
    (acc, key) => {
      const [name, variant] = key.split('--');
      const group = acc[name] || { icon: null, variants: {} };

      if (!variant) {
        if (group.icon) {
          throw new Error(
            'This group should not have an icon already: ' + name
          );
        }
        if (iconsGroupedByBasename[key].length === 0) {
          group.icon = iconsGroupedByBasename[key][0];
        } else {
          group.icons = iconsGroupedByBasename[key];
        }
      } else {
        if (!Array.isArray(group.variants[key])) {
          group.variants[key] = [];
        }

        group.variants[key].push(...iconsGroupedByBasename[key]);
      }

      return {
        ...acc,
        [name]: group,
      };
    },
    {}
  );

  const icons = Object.keys(iconsGroupedByName).map(key => {
    const group = iconsGroupedByName[key];
    const icon = {
      name: key,
      friendly_name: sentenceCase(key),
      usage: 'This is a description for usage',
      categories: ['example cateogry'],
      aliases: [key],
    };

    if (group.icon) {
      icon.sizes = [group.icon.size];
    } else if (group.icons) {
      icon.sizes = group.icons.map(icon => icon.size);
    }

    if (Object.keys(group.variants).length > 0) {
      icon.variants = Object.keys(group.variants).reduce((acc, name) => {
        const variant = group.variants[name];
        const sizes = variant.map(({ size }) => {
          if (!size) {
            return 'glyph';
          }
          return size;
        });
        return acc.concat({
          name,
          friendly_name: sentenceCase(name),
          usage: 'This is a description for usage',
          sizes,
        });
      }, []);
    }

    return icon;
  });

  await fs.writeFile(METADATA_OUTPUT, yaml.safeDump({ icons: icons }), 'utf8');
}

scaffold().catch(error => {
  console.error(error);
});
