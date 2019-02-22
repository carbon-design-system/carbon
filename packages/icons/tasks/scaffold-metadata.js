/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');
const search = require('../src/search');

const SVG_DIR = path.resolve(__dirname, '../src/svg');
const METADATA_OUTPUT = path.resolve(__dirname, '../metadata.yml');

async function scaffold() {
  const iconFiles = await search(SVG_DIR);
  const iconsGroupedByVariant = iconFiles.reduce((acc, icon) => {
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
  const iconsGroupedByName = Object.keys(iconsGroupedByVariant).reduce(
    (acc, key) => {
      const [name, variant] = key.split('--');
      const group = acc[name] || { icon: null, variants: {} };

      if (!variant) {
        if (group.icon) {
          throw new Error(
            'This group should not have an icon already: ' + name
          );
        }
        group.icon = iconsGroupedByVariant[key][0];
      } else {
        if (!group.variants[variant]) {
          group.variants[variant] = [];
        }

        group.variants[variant].push(...iconsGroupedByVariant[key]);
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
      friendly_name: key,
      usage: 'This is a description for usage',
      categories: ['example cateogry'],
      aliases: [key],
    };

    if (group.icon) {
      icon.sizes = [group.icon.size];
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
        return {
          name,
          usage: 'This is a description for usage',
          sizes,
        };
      }, {});
    }

    return icon;
  });

  await fs.writeFile(METADATA_OUTPUT, yaml.safeDump({ icons: icons }), 'utf8');
}

scaffold().catch(error => {
  console.error(error);
});
