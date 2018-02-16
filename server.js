'use strict';

const globby = require('globby'); // eslint-disable-line
const { promisify } = require('bluebird'); // eslint-disable-line
const fs = require('fs');
const path = require('path');
const express = require('express'); // eslint-disable-line
const Fractal = require('@frctl/fractal'); // eslint-disable-line

const webpack = require('webpack'); // eslint-disable-line
const webpackDevMiddleware = require('webpack-dev-middleware'); // eslint-disable-line
const webpackHotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line

const readFile = promisify(fs.readFile);

const app = express();
const adaro = require('adaro'); // eslint-disable-line

const port = process.env.PORT || 8080;

const config = require('./tools/webpack.dev.config');

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

const fractal = Fractal.create();
fractal.components.set('path', path.join(__dirname, 'src/components'));
fractal.components.set('ext', '.html');
fractal.docs.set('path', path.join(__dirname, 'docs'));

app.engine('dust', adaro.dust());
app.set('view engine', 'dust');
app.set('views', path.resolve(__dirname, 'demo/views'));
app.use('/demo', express.static('demo'));
app.use(express.static('src'));
app.use(express.static('scripts'));
app.use('/docs/js', express.static('docs/js'));

/**
 * @param {string} glob The glob.
 * @returns {string} The file contents of files matching the given glob, concatenated.
 */
const getContent = glob =>
  globby(glob).then(filePaths => {
    if (filePaths.length === 0) {
      return undefined;
    }
    return Promise.all(filePaths.map(filePath => readFile(filePath, { encoding: 'utf8' }))).then(contents =>
      contents.reduce((a, b) => a.concat(b))
    );
  });

/**
 * @param {ComponentCollection|Component} item The component data.
 * @returns {Promise<ComponentCollection|Component>}
 *   The component data, with README.md content assigned to `.notes` property for component with variants (`ComponentCollection`).
 *   Fractal automatically populate `.notes` for component without variants (`Component`).
 */
const ensureComponentItemNotes = item => {
  if (!item.isCollection || !item.config.readme) {
    return item;
  }
  return item.config.readme
    .getContent()
    .then(notes => Object.assign(typeof item.toJSON !== 'function' ? item : item.toJSON(), { notes }));
};

['/', '/demo/:component'].forEach(route => {
  app.get(route, (req, res) => {
    const name = req.params.component;

    if (name && path.relative('src/components', `src/components/${name}`).substr(0, 2) === '..') {
      res.status(404).end();
    } else {
      fractal
        .load()
        .then(([componentSource, docSource]) =>
          Promise.all([Promise.all(componentSource.items().map(ensureComponentItemNotes)), docSource.items()])
        )
        .then(([componentItems, docItems]) => {
          res.render('demo-nav', {
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

['/component/:component', '/component/:component/:variant'].forEach(route => {
  app.get(route, (req, res) => {
    const glob = `src/components/${req.params.component}/**/${req.params.variant || '*'}.html`;

    if (path.relative('src/components', glob).substr(0, 2) === '..') {
      res.status(404).end();
    } else {
      getContent(glob)
        .then(html => {
          if (typeof html === 'undefined') {
            res.status(404).end();
          } else {
            res.render('demo-live', {
              content: html,
            });
          }
        })
        .catch(error => {
          console.error(error.stack); // eslint-disable-line no-console
          res.status(500).end();
        });
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`); // eslint-disable-line no-console
});
