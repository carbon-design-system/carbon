'use strict';

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

const path = require('path');
const express = require('express');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const templates = require('./tools/templates');

const app = express();
const port = process.env.PORT || 8080;
const config = require('./tools/webpack.dev.config');

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.engine('hbs', templates.handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'demo/views'));
app.use('/demo', express.static('demo'));
app.use(express.static('src'));
app.use(express.static('scripts'));
app.use('/docs/js', express.static('docs/js'));

/**
 * @param {ComponentCollection|Component} metadata The component data.
 * @returns {Promise<ComponentCollection|Component>}
 *   The normalized component data,
 *   esp. with README.md content assigned to `.notes` property for component with variants (`ComponentCollection`).
 *   Fractal automatically populate `.notes` for component without variants (`Component`).
 */
const normalizeMetadata = metadata => {
  const items = metadata.isCollection ? metadata : !metadata.isCollated && metadata.variants && metadata.variants();
  const visibleItems = items && items.filter(item => !item.isHidden);
  const metadataJSON = typeof metadata.toJSON !== 'function' ? metadata : metadata.toJSON();
  if (!metadata.isCollection && visibleItems && visibleItems.size === 1) {
    const firstVariant = visibleItems.first();
    return Object.assign(metadataJSON, {
      context: firstVariant.context,
      notes: firstVariant.notes,
      preview: firstVariant.preview,
      variants: undefined,
    });
  }
  return Object.assign(metadataJSON, {
    items: !items || items.size <= 1 ? undefined : items.map(normalizeMetadata).toJSON().items,
    variants: undefined,
  });
};

/**
 * The promise resolved with the list of nav items.
 * @type {Promise<(ComponentCollection|Component)[]>}
 */
const promiseNavItems = templates.promiseCache
  .then(({ componentSource, docSource }) =>
    Promise.all([Promise.all(componentSource.items().map(normalizeMetadata)), docSource.items()])
  )
  .then(([componentItems, docItems]) => ({
    componentItems,
    docItems,
  }));

['/', '/demo/:component'].forEach(route => {
  app.get(route, (req, res) => {
    const name = req.params.component;

    if (name && path.relative('src/components', `src/components/${name}`).substr(0, 2) === '..') {
      res.status(404).end();
    } else {
      promiseNavItems
        .then(({ componentItems, docItems }) => {
          res.render('demo-nav-data', {
            componentItems,
            docItems,
          });
        })
        .catch(err => {
          console.error(err.stack); // eslint-disable-line no-console
          res.status(500).end();
        });
    }
  });
});

app.get('/component/:component', (req, res) => {
  const name = req.params.component;

  if (path.relative('src/components', `src/components/${name}`).substr(0, 2) === '..') {
    res.status(404).end();
  } else {
    templates
      .render({ layout: 'preview', concat: true }, name)
      .then(rendered => {
        // eslint-disable-next-line eqeqeq
        if (rendered == null) {
          res.status(404).end();
        }
        res.send(rendered);
      })
      .catch(error => {
        console.error(error.stack); // eslint-disable-line no-console
        res.status(500).end();
      });
  }
});

app.get('/code/:component', (req, res) => {
  const name = req.params.component;

  if (name && path.relative('src/components', `src/components/${name}`).substr(0, 2) === '..') {
    res.status(404).end();
  } else {
    templates
      .render({}, name)
      .then(renderedItems => {
        const o = {};
        renderedItems.forEach((rendered, item) => {
          o[item.handle] = rendered.trim();
        });
        res.json(o);
      })
      .catch(error => {
        console.error(error.stack); // eslint-disable-line no-console
        res.status(500).end();
      });
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`); // eslint-disable-line no-console
});
