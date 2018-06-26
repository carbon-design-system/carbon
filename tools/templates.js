'use strict';

const globby = require('globby');
const { promisify } = require('bluebird');
const fs = require('fs');
const path = require('path');
const expressHandlebars = require('express-handlebars');
const helpers = require('handlebars-helpers');
const Fractal = require('@frctl/fractal');

const handlebars = expressHandlebars.create({
  defaultLayout: 'demo-nav',
  layoutsDir: path.resolve(__dirname, '../demo/views/layouts'),
  extname: '.hbs',
});

const Handlebars = handlebars.handlebars;
helpers();

const readFile = promisify(fs.readFile);

/**
 * @param {string} glob A glob.
 * @returns {Set<string, string>} A set of file contents matching the given glob, keyed by the basename of the file.
 */
const getContents = glob =>
  globby(glob).then(filePaths => {
    if (filePaths.length === 0) {
      return undefined;
    }
    const contents = new Map();
    return Promise.all(
      filePaths.map(filePath =>
        readFile(filePath, { encoding: 'utf8' }).then(content => {
          contents.set(path.basename(filePath, '.hbs'), content);
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
    this.promiseCache = undefined;
  },
};

/**
 * @param {Object} [options] The options.
 * @param {string} [options.layout] The Handlebars template name to lay out stuffs.
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
    componentSource.forEach(metadata => {
      const items = metadata.isCollection ? metadata : !metadata.isCollated && metadata.variants && metadata.variants();
      if (items) {
        const filteredItems = !handle || handle === metadata.handle ? items : items.filter(item => handle === item.handle);
        filteredItems.forEach(item => {
          const { handle: itemHandle, baseHandle, context } = item;
          const template = contents.get(item.preview) || contents.get(itemHandle) || contents.get(baseHandle);
          if (template) {
            const body = template(context);
            const layoutTemplate = contents.get(layout);
            renderedItems.set(item, !layoutTemplate ? body : layoutTemplate(Object.assign({ body }, context)));
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
