'use strict';

const globby = require('globby');
const { promisify } = require('bluebird');
const fs = require('fs');
const path = require('path');
const Module = require('module');
const expressHandlebars = require('express-handlebars');
const helpers = require('handlebars-helpers');
const Fractal = require('@frctl/fractal');
const iconHelper = require('@carbon/icons-handlebars');

const origResolveFilename = Module._resolveFilename;
Module._resolveFilename = function resolveModule(
  request,
  parentModule,
  ...other
) {
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
helpers({
  handlebars: Handlebars,
});
iconHelper({ handlebars: Handlebars });

const readFile = promisify(fs.readFile);

try {
  const logger = require(path.resolve(
    path.dirname(require.resolve('@frctl/fractal')),
    'core/log'
  ));
  ['log', 'error', 'warn'].forEach((name) => {
    logger.on(name, (evt) => {
      console[name](`Fractal ${name}:`, evt); // eslint-disable-line no-console
    });
  });
} catch (err) {
  console.error('Failed to hook Fractal logger', err.stack); // eslint-disable-line no-console
}

/**
 * @param {string} glob A glob.
 * @returns {Set<string, string>} A set of file contents matching the given glob, keyed by the basename of the file.
 */
const getContents = (glob) =>
  globby(glob).then((filePaths) => {
    if (filePaths.length === 0) {
      return undefined;
    }
    const contents = new Map();
    return Promise.all(
      filePaths.map((filePath) =>
        readFile(filePath, { encoding: 'utf8' }).then((content) => {
          contents.set(
            path.basename(filePath, path.extname(filePath)),
            content
          );
        })
      )
    ).then(() => contents);
  });

/**
 * Loads Handlebars templates and compiles them.
 * @param {string} glob A glob.
 * @returns {Set<string, string>} A set of file contents matching the given glob, keyed by the basename of the file.
 */
const loadContents = (glob) =>
  getContents(glob).then((contents) => {
    contents.forEach((content, templateName) => {
      Handlebars.registerPartial(templateName, content);
      contents.set(templateName, Handlebars.compile(content));
    });
    return contents;
  });

const cache = {
  /**
   * @returns {Promise<object>} The promise that is resolved with the content cache.
   */
  get() {
    if (!this.promiseCache) {
      const fractal = Fractal.create();
      fractal.components.set('path', path.join(__dirname, '../src/components'));
      fractal.components.set('ext', '.hbs');
      fractal.docs.set('path', path.join(__dirname, '../docs'));
      this.promiseCache = Promise.all([
        fractal.load(),
        loadContents(path.resolve(__dirname, '../{demo,src}/**/*.hbs')),
      ]).then(([sources, contents]) => {
        const [componentSource, docSource] = sources;
        return {
          componentSource,
          docSource,
          contents,
        };
      });
    }
    return this.promiseCache;
  },

  /**
   * Clears the content cache.
   */
  clear() {
    this.promiseCache = undefined;
  },
};

/**
 * @param {object} [options] The options.
 * @param {string} [options.layout] The default Handlebars template name to lay out stuffs. `false` to force empty layout.
 * @param {boolean} [options.concat] Setting `true` here returns rendered contents all concatenated, instead of returning a map.
 * @param {object} [options.layoutContext] Additional Handlebars rendering context for layout template.
 * @param {string} [handle]
 *   The internal component name seen in Fractal.
 *   Can be of a component or of a variant, or left empty.
 *   Leaving `handle` empty renders all components.
 * @returns {string|Map<Variant, string>} The list of rendered template, keyed by Fractal `Variant` object.
 */
const renderComponent = ({ layout, concat, layoutContext } = {}, handle) =>
  cache.get().then(({ componentSource, contents }) => {
    const renderedItems = new Map();
    if (!componentSource) {
      throw new TypeError(
        'Fractal configuration (`*.config.js`) could not be harvested. ' +
          'The most typical cause is a JavaScript error in one of the `*.config.js` files.'
      );
    }
    componentSource.forEach((metadata) => {
      const items = metadata.isCollection
        ? metadata
        : !metadata.meta.removed &&
          !metadata.isCollated &&
          metadata.variants &&
          metadata.variants();
      if (items) {
        const filteredItems =
          !handle || handle === metadata.handle
            ? items
            : items.filter((item) => handle === item.handle);
        filteredItems.forEach((item) => {
          const { handle: itemHandle, baseHandle, context, meta } = item;
          const template =
            !meta.removed &&
            (contents.get(item.view) ||
              contents.get(itemHandle) ||
              contents.get(baseHandle));
          if (template) {
            const body = template(context);
            const layoutTemplate =
              layout !== false &&
              (contents.get(item.preview) || contents.get(layout));
            renderedItems.set(
              item,
              !layoutTemplate
                ? body
                : layoutTemplate({
                    yield: body,
                    component: metadata.handle,
                    ...context,
                    ...layoutContext,
                  })
            );
          }
        });
      }
    });
    if (!concat) {
      return renderedItems;
    }
    const accumulated = [];
    renderedItems.forEach((rendered) => {
      accumulated.push(rendered);
    });
    return accumulated.length > 0 ? accumulated.join('\n') : undefined;
  });

module.exports = {
  cache,
  render: renderComponent,
  handlebars,
};
