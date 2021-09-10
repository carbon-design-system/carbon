/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Document, Text, Rectangle, Group } from 'sketch/dom';
import { command } from '../command';
import { findOrCreatePage, selectPage } from '../../tools/page';

const { icons, categories } = require('../../../generated/icons/metadata.json');

export function generate() {
  command('commands/icons/generate', () => {
    const document = Document.getSelectedDocument();
    const symbols = document.getSymbols();
    const page = selectPage(findOrCreatePage(document, 'icons'));
    const groups = [];
    let PAGE_X_OFFSET = 0;
    let PAGE_Y_OFFSET = 0;

    for (const category of categories) {
      const categoryText = new Text({
        text: category.name,
        style: {
          fontFamily: 'IBM Plex Sans',
          fontSize: 32,
          fontStyle: undefined,
          fontWeight: 4,
          lineHeight: 40,
        },
      });
      const group = new Group({
        name: category.name,
        frame: new Rectangle(PAGE_X_OFFSET, PAGE_Y_OFFSET),
        layers: [categoryText],
      });

      const subcategoryLayers = [];
      let GROUP_X_OFFSET = 0;
      let GROUP_Y_OFFSET = categoryText.frame.height + 32;

      for (const subcategory of category.subcategories) {
        const subcategoryText = new Text({
          text: subcategory.name,
          style: {
            fontFamily: 'IBM Plex Sans',
            fontSize: 20,
            fontStyle: undefined,
            fontWeight: 4,
            lineHeight: 26,
          },
        });
        const subcategoryGroup = new Group({
          name: subcategory.name,
          frame: new Rectangle(GROUP_X_OFFSET, GROUP_Y_OFFSET),
          layers: [subcategoryText],
        });

        const layers = [];
        const MARGIN = 4;
        let ICON_X_OFFSET = 0;
        let ICON_Y_OFFSET = subcategoryText.frame.height + 8;
        let COLUMN_COUNT = 0;

        const members = subcategory.members.filter((member) => {
          const icon = icons.find((icon) => icon.name === member);
          return !icon.deprecated;
        });

        for (const icon of members) {
          const symbol = symbols.find((symbol) => {
            const parts = symbol.name.split('/').map((string) => string.trim());
            const [_type, _category, _subcategory, name, size] = parts;
            return name === icon && size === '32';
          });

          if (!symbol) {
            throw new Error(`Unable to find symbol for icon ${icon}!`);
          }

          const instance = symbol.createNewInstance();
          instance.frame.offset(ICON_X_OFFSET, ICON_Y_OFFSET);

          layers.push(instance);
          ICON_X_OFFSET = ICON_X_OFFSET + 32 + MARGIN;
          COLUMN_COUNT = COLUMN_COUNT + 1;

          // 8 column layout
          if (COLUMN_COUNT > 7) {
            ICON_X_OFFSET = 0;
            COLUMN_COUNT = 0;
            ICON_Y_OFFSET = ICON_Y_OFFSET + 32 + MARGIN;
          }
        }

        subcategoryGroup.layers.push(...layers);
        subcategoryGroup.adjustToFit();
        subcategoryLayers.push(subcategoryGroup);
        GROUP_Y_OFFSET = GROUP_Y_OFFSET + subcategoryGroup.frame.height + 32;
      }

      group.layers.push(...subcategoryLayers);
      group.adjustToFit();
      PAGE_Y_OFFSET = PAGE_Y_OFFSET + group.frame.height;

      groups.push(group);
    }

    page.layers.push(...groups);
  });
}
