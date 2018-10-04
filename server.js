'use strict';

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

const path = require('path');
const Module = require('module');
const pathRegexp = require('path-to-regexp');
const browserSync = require('browser-sync');
const serveStatic = require('serve-static');

const chokidar = require('chokidar');
const debounce = require('lodash.debounce');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const templates = require('./tools/templates');
const config = devMode && require('./tools/webpack.dev.config'); // eslint-disable-line global-require

const compiler = devMode && webpack(config);
const hotMiddleware = devMode && webpackHotMiddleware(compiler);

let dummyHashSeq = 0;
let templateOrConfigChanged = false;
const watchCallback = debounce(() => {
  const featureFlagCacheKey = Object.keys(require.cache).find(key => /feature-flags\.js$/i.test(key));
  if (featureFlagCacheKey) {
    require.cache[featureFlagCacheKey] = undefined;
  }
  templates.cache.clear();
  if (templateOrConfigChanged) {
    templateOrConfigChanged = false;
    hotMiddleware.publish({ action: 'sync', hash: `DUMMY_HASH_${dummyHashSeq++}`, errors: [], warnings: [] });
  }
}, 500);

const invokeWatchCallback = name => {
  if (!/feature-flags\.js$/i.test(name)) {
    templateOrConfigChanged = true;
  }
  watchCallback();
};

if (devMode) {
  chokidar
    .watch(['demo/feature-flags.js', 'demo/**/*.hbs', 'src/**/*.hbs', 'src/**/*.config.js'])
    .on('add', invokeWatchCallback)
    .on('change', invokeWatchCallback)
    .on('unlink', invokeWatchCallback);
}

const origResolveFilename = Module._resolveFilename;
Module._resolveFilename = function resolveModule(request, parentModule, ...other) {
  const newRequest = !/feature-flags$/i.test(request)
    ? request
    : path.relative(path.dirname(parentModule.id), path.resolve(__dirname, 'demo/feature-flags.js'));
  return origResolveFilename.call(this, newRequest, parentModule, ...other);
};

const reComponentPath = pathRegexp('/component/:component');
const reDemoComponentPath = pathRegexp('/demo/:component');
const reCodePath = pathRegexp('/code/:component');
const demoStaticRoute = serveStatic('demo');

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
 * @returns {Promise<(ComponentCollection|Component)[]>} The promise resolved with the list of nav items.
 */
const getNavItems = () =>
  templates.cache
    .get()
    .then(({ componentSource, docSource, contents }) =>
      Promise.all([Promise.all(componentSource.items().map(normalizeMetadata)), docSource.items(), contents])
    )
    .then(([componentItems, docItems, contents]) => ({
      componentItems,
      docItems,
      contents,
    }));

function noopRoute(req, res, next) {
  next();
}

function navRoute(req, res, next) {
  const { url } = req;
  const name = url === '/' ? url : (reDemoComponentPath.exec(url) || [])[1];
  if (!name || /\.(js|css)/i.test(name)) {
    next();
  } else if (name !== '/' && path.relative('src/components', `src/components/${name}`).substr(0, 2) === '..') {
    res.status(404).end();
  } else {
    getNavItems()
      .then(({ componentItems, docItems, contents }) => {
        res.setHeader('Content-Type', 'text/html');
        res.end(
          contents.get('demo-nav')({
            body: contents.get('demo-nav-data')({
              componentItems,
              docItems,
              portSassBuild: process.env.PORT_SASS_DEV_BUILD,
            }),
          })
        );
      })
      .catch(err => {
        console.error(err.stack); // eslint-disable-line no-console
        res.writeHead(500);
        res.end();
      });
  }
}

function componentRoute(req, res, next) {
  const name = (reComponentPath.exec(req.url) || [])[1];
  if (!name) {
    next();
  } else if (path.relative('src/components', `src/components/${name}`).substr(0, 2) === '..') {
    res.writeHead(404);
    res.end();
  } else {
    templates
      .render({ layout: 'preview', concat: true }, name)
      .then(rendered => {
        // eslint-disable-next-line eqeqeq
        if (rendered == null) {
          res.writeHead(404);
          res.end();
        }
        res.setHeader('Content-Type', 'text/html');
        res.end(rendered);
      })
      .catch(error => {
        console.error(error.stack); // eslint-disable-line no-console
        res.writeHead(500);
        res.end();
      });
  }
}

function codeRoute(req, res, next) {
  const name = (reCodePath.exec(req.url) || [])[1];
  if (!name) {
    next();
  } else if (path.relative('src/components', `src/components/${name}`).substr(0, 2) === '..') {
    res.writeHead(404);
    res.end();
  } else {
    templates
      .render({ layout: false }, name)
      .then(renderedItems => {
        const o = {};
        renderedItems.forEach((rendered, item) => {
          o[item.handle] = rendered.trim();
        });
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(o));
      })
      .catch(error => {
        console.error(error.stack); // eslint-disable-line no-console
        res.writeHead(500);
        res.end();
      });
  }
}

function demoRoute(req, res, next) {
  if (!/^\/demo\.(css|js)$/i.test(req.url)) {
    next();
  } else {
    demoStaticRoute(req, res, next);
  }
}

browserSync({
  files: ['demo/demo.css'],
  open: false,
  port: process.env.PORT || 8080,

  server: {
    baseDir: 'demo',
    middleware: [
      !devMode
        ? noopRoute
        : webpackDevMiddleware(compiler, {
            noInfo: true,
            publicPath: config.output.publicPath,
            stats: { colors: true },
          }),
      !devMode ? noopRoute : hotMiddleware,
      navRoute,
      componentRoute,
      codeRoute,
      demoRoute,
      serveStatic('src'),
      serveStatic('scripts'),
    ],
  },

  ui: !devMode ? false : {},
});
