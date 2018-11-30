'use strict';

const mapValues = require('lodash.mapvalues');

/**
 * A magic string for icons without their sizes specified.
 * @type {string}
 */
const SIZE_NONE = 'Glyph';

/**
 * @param {Map} map The `Map` instanve.
 * @param {string} key The key in the given `map`.
 * @param createFn
 *   A function that returns the value for the new map item.
 *   Used when the given `map` does not have the given `key`.
 * @returns The existing map item or newly created map item.
 */
function mapGetOrCreate(map, key, createFn) {
  const existingItem = map.get(key);
  if (existingItem) {
    return existingItem;
  }
  const newItem = createFn(key);
  map.set(key, newItem);
  return newItem;
}

/**
 * Handlebars partials data structure.
 * @typedef {Object} Partial
 * @property {string} name The icon name.
 * @property {number} [size] The size of the icon.
 * @property {string} partial The Handlebars partial string.
 */

/**
 * Registers the given Handlebars partials.
 * @param {Handlebars} Handlebars The Handlebars object.
 * @param {Object<string, Partial>} partials List of Handlebars partials, keyed by their names.
 */
function registerPartials(Handlebars, partials) {
  const iconsByName = new Map();
  mapValues(partials, ({ name, size, partial }) => {
    const iconsBySize = mapGetOrCreate(iconsByName, name, () => new Map());
    iconsBySize.set(size || SIZE_NONE, partial);
  });

  iconsByName.forEach((iconsBySize, name) => {
    const partialName = `carbon-icon-${name.replace(/-+/g, '-')}`;
    // Register partials for each size
    iconsBySize.forEach((partial, size) => {
      const partialNameWithSize = size === SIZE_NONE ? partialName : `${partialName}-${size}`;
      Handlebars.registerPartial(partialNameWithSize, partial);
    });
    // If there is no item without its size, prefer the smallest one (16 pixels)
    if (!iconsBySize.has(SIZE_NONE)) {
      const sizes = Array.from(iconsBySize.keys()).sort((lhs, rhs) => lhs - rhs);
      const smallestSize = sizes[0];
      if (smallestSize) {
        Handlebars.registerPartial(partialName, iconsBySize.get(smallestSize));
      }
    }
  });
}

module.exports = registerPartials;
