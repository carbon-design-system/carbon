'use strict';

const globby = require('globby');
const { promisify } = require('bluebird');
const fs = require('fs');
const path = require('path');
const Module = require('module');
const expressHandlebars = require('express-handlebars');
const helpers = require('handlebars-helpers');
const Fractal = require('@frctl/fractal');
const icons = require('carbon-icons');
const iconsElements = require('@carbon/icons');
const { toString: iconHelpersToString } = require('@carbon/icon-helpers');

const origResolveFilename = Module._resolveFilename;
Module._resolveFilename = function resolveModule(request, parentModule, ...other) {
  const devFeatureFlags = path.resolve(__dirname, '../demo/feature-flags.js');
  const newRequest =
    !/feature-flags$/i.test(request) || !fs.existsSync(devFeatureFlags)
      ? request
      : path.relative(path.dirname(parentModule.id), devFeatureFlags);
  return origResolveFilename.call(this, newRequest, parentModule, ...other);
};

const handlebars = expressHandlebars.create({
  defaultLayout: 'demo-nav',
  layoutsDir: path.resolve(__dirname, '../demo/views/layouts'),
  extname: '.hbs',
});

const Handlebars = handlebars.handlebars;
helpers();

const readFile = promisify(fs.readFile);

try {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const logger = require(path.resolve(path.dirname(require.resolve('@frctl/fractal')), 'core/log'));
  ['log', 'error', 'warn'].forEach(name => {
    logger.on(name, evt => {
      console[name](`Fractal ${name}:`, evt); // eslint-disable-line no-console
    });
  });
} catch (err) {
  console.error('Failed to hook Fractal logger', err.stack); // eslint-disable-line no-console
}

/**
 * @param {string} s A hyphnated string.
 * @returns {string} The camelcase string from the given hyphnated string, e.g. `fooBar` from `foo-bar`.
 * @private
 */
function camelCaseFromHyphnated(s) {
  return s.replace(/-+([A-z])/g, (match, token) => token.toUpperCase());
}

/**
 * @param {string} s A string in camel case.
 * @returns {string} The string converted to hyphnated format.
 */
const hyphnatedFromCamelCase = s => s.replace(/([A-Z])/g, (match, token) => `-${token.toLowerCase()}`).replace(/^-+/, '');

/**
 * @param {Object} toplevelDescriptor The icon descriptor.
 * @param {string} prefix The CSS class prefix.
 * @returns {string} The Handlebars partial string.
 */
const js2partial = (toplevelDescriptor, prefix) => {
  const formattedAttrs = [
    '{{#if description}} aria-label="{{description}}"{{/if}}',
    '{{#each this}}',
    '{{#startsWith "attr-" @key}}',
    ` {{removeFirst @key "attr-"}}="{{replace this "{{@root.prefix}}" "${prefix}"}}"`,
    '{{/startsWith}}',
    '{{/each}}',
  ].join('');
  return iconHelpersToString(toplevelDescriptor)
    .replace(/^\s*(<svg)/, `$1${formattedAttrs}`)
    .replace(/(<\/svg>)\s*$/, '{{#if description}}<title>{{description}}</title>{{/if}}$1');
};

/**
 * @param {Object} descriptor The icon descriptor from `carbon-icons` library.
 * @returns {Object} The icon descriptor in `@carbon/icons` format.
 */
const normalizeDescriptor = ({ svgData, width, height, viewBox }) => {
  const attrs = { width, height, viewBox };
  return {
    attrs: Object.keys(attrs)
      .filter(key => attrs[key])
      .reduce((o, key) => ({ ...o, [key]: attrs[key] }), {}),
    content: Object.keys(svgData)
      .filter(elem => svgData[elem])
      .reduce(
        (a, elem) => [
          ...a,
          ...svgData[elem].map(data => ({
            elem: elem.replace(/s$/, ''),
            attrs: data,
          })),
        ],
        []
      ),
  };
};

/**
 * @param {string} prefix The CSS class prefix.
 * @param {boolean} useElements `true` to use one from `carbon-elements`.
 * @returns {Map<string, string>} A set of icons contents, keyed by hyphnated icon name.
 */
const getIconsPartials = (prefix, useElements) => {
  const contents = new Map();
  const iconsInUse = !useElements ? icons : iconsElements;
  const names = new Set();
  Object.keys(iconsInUse)
    .filter(isNaN)
    .forEach(name => {
      // `carbon-icons` has hyphnated name here, whereas `@carbon/icons` has pascal case
      names.add(camelCaseFromHyphnated(iconsInUse[name].name));
    });
  names.forEach(name => {
    const nameInIcons = !useElements ? name : name[0].toUpperCase() + name.substr(1);
    const normalizedName = hyphnatedFromCamelCase(name.replace(/^icon/, ''));
    const suffixPriority = !useElements ? ['', 'Glyph'] : ['Glyph', '16', '32'];
    const suffix = suffixPriority.find(item => iconsInUse[nameInIcons + item]);
    if (typeof suffix !== 'undefined') {
      const keyInIcons = nameInIcons + suffix;
      const descriptor = !useElements ? normalizeDescriptor(icons[keyInIcons]) : iconsElements[keyInIcons];
      contents.set(`carbon-icon-${normalizedName}`, js2partial(descriptor, prefix));
    }
  });
  return contents;
};

/**
 * @param {string} glob A glob.
 * @returns {Map<string, string>} A set of file contents matching the given glob, keyed by the basename of the file.
 */
const getContents = glob =>
  globby(glob).then(filePaths => {
    if (filePaths.length === 0) {
      return undefined;
    }
    const contents = new Map();
    // Obtain the latest CSS class prefix
    // eslint-disable-next-line global-require
    const { prefix } = require('../src/globals/js/settings');
    // Obtain the latest state of feature flags
    // eslint-disable-next-line global-require
    const { componentsX } = require('../src/globals/js/feature-flags');
    const partials = [getIconsPartials(prefix, true), getIconsPartials(prefix)];
    if (componentsX) {
      partials.reverse();
    }
    partials.forEach(item => {
      item.forEach((value, key) => {
        contents.set(key, value);
      });
    });
    return Promise.all(
      filePaths.map(filePath =>
        readFile(filePath, { encoding: 'utf8' }).then(content => {
          contents.set(path.basename(filePath, path.extname(filePath)), content);
        })
      )
    ).then(() => contents);
  });

/**
 * Loads Handlebars templates and compiles them.
 * @param {string} glob A glob.
 * @returns {Set<string, string>} A set of file contents matching the given glob, keyed by the basename of the file.
 */
const loadContents = glob =>
  getContents(glob).then(contents => {
    contents.forEach((content, templateName) => {
      Handlebars.registerPartial(templateName, content);
      contents.set(templateName, Handlebars.compile(content));
    });
    return contents;
  });

const cache = {
  /**
   * @returns {Promise<Object>} The promise that is resolved with the content cache.
   */
  get() {
    if (!this.promiseCache) {
      const fractal = Fractal.create();
      fractal.components.set('path', path.join(__dirname, '../src/components'));
      fractal.components.set('ext', '.hbs');
      fractal.docs.set('path', path.join(__dirname, '../docs'));
      this.promiseCache = Promise.all([fractal.load(), loadContents(path.resolve(__dirname, '../{demo,src}/**/*.hbs'))]).then(
        ([sources, contents]) => {
          const [componentSource, docSource] = sources;
          return {
            componentSource,
            docSource,
            contents,
          };
        }
      );
    }
    return this.promiseCache;
  },

  /**
   * Clears the content cache.
   */
  clear() {
    // When we clear template cache upon theme switcher UI, below modules get stale
    delete require.cache[require.resolve('../src/globals/js/settings.js')];
    delete require.cache[require.resolve('../demo/feature-flags.js')];
    this.promiseCache = undefined;
  },
};

/**
 * @param {Object} [options] The options.
 * @param {string} [options.layout] The default Handlebars template name to lay out stuffs. `false` to force empty layout.
 * @param {boolean} [options.concat] Setting `true` here returns rendered contents all concatenated, instead of returning a map.
 * @param {string} [handle]
 *   The internal component name seen in Fractal.
 *   Can be of a component or of a variant, or left empty.
 *   Leaving `handle` empty renders all components.
 * @returns {string|Map<Variant, string>} The list of rendered template, keyed by Fractal `Variant` object.
 */
const renderComponent = ({ layout, concat } = {}, handle) =>
  cache.get().then(({ componentSource, contents }) => {
    const renderedItems = new Map();
    if (!componentSource) {
      throw new TypeError(
        'Fractal configuration (`*.config.js`) could not be harvested. ' +
          'The most typical cause is a JavaScript error in one of the `*.config.js` files.'
      );
    }
    componentSource.forEach(metadata => {
      const items = metadata.isCollection
        ? metadata
        : !metadata.meta.removed && !metadata.isCollated && metadata.variants && metadata.variants();
      if (items) {
        const filteredItems = !handle || handle === metadata.handle ? items : items.filter(item => handle === item.handle);
        filteredItems.forEach(item => {
          const { handle: itemHandle, baseHandle, context, meta } = item;
          const template = !meta.removed && (contents.get(item.view) || contents.get(itemHandle) || contents.get(baseHandle));
          if (template) {
            const body = template(context);
            const layoutTemplate = layout !== false && (contents.get(item.preview) || contents.get(layout));
            renderedItems.set(item, !layoutTemplate ? body : layoutTemplate(Object.assign({ yield: body }, context)));
          }
        });
      }
    });
    if (!concat) {
      return renderedItems;
    }
    const accumulated = [];
    renderedItems.forEach(rendered => {
      accumulated.push(rendered);
    });
    return accumulated.length > 0 ? accumulated.join('\n') : undefined;
  });

module.exports = {
  cache,
  render: renderComponent,
  handlebars,
};
