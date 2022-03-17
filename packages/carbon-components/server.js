'use strict';

const path = require('path');
const { pathToRegexp } = require('path-to-regexp');
const browserSync = require('browser-sync');
const serveStatic = require('serve-static');

const chokidar = require('chokidar');
const debounce = require('lodash.debounce');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const templates = require('./tools/templates');
const config = devMode && require('./tools/webpack-demo.config'); // eslint-disable-line global-require

const compiler = devMode && webpack(config);
const hotMiddleware = devMode && webpackHotMiddleware(compiler);

let dummyHashSeq = 0;
let templateOrConfigChanged = false;
const watchCallback = debounce(() => {
  const featureFlagCacheKey = Object.keys(require.cache).find((key) =>
    /feature-flags\.js$/i.test(key)
  );
  if (featureFlagCacheKey) {
    require.cache[featureFlagCacheKey] = undefined;
  }
  templates.cache.clear();
  if (templateOrConfigChanged) {
    templateOrConfigChanged = false;
    hotMiddleware.publish({
      action: 'sync',
      hash: `DUMMY_HASH_${dummyHashSeq++}`,
      errors: [],
      warnings: [],
    });
  }
}, 500);

const invokeWatchCallback = (name) => {
  if (!/feature-flags\.js$/i.test(name)) {
    templateOrConfigChanged = true;
  }
  watchCallback();
};

if (devMode) {
  chokidar
    .watch([
      'demo/feature-flags.js',
      'demo/**/*.hbs',
      'src/**/*.hbs',
      'src/**/*.config.js',
    ])
    .on('add', invokeWatchCallback)
    .on('change', invokeWatchCallback)
    .on('unlink', invokeWatchCallback);
}

const reComponentPath = pathToRegexp('/component/:component');
const reDemoComponentPath = pathToRegexp('/demo/:component');
const reCodePath = pathToRegexp('/code/:component');
const demoStaticRoute = serveStatic('demo');

function noopRoute(req, res, next) {
  next();
}

function navRoute(req, res, next) {
  const { url } = req;
  const name = url === '/' ? url : (reDemoComponentPath.exec(url) || [])[1];
  if (!name || /\.(js|css)/i.test(name)) {
    next();
  } else if (
    name !== '/' &&
    path.relative('src/components', `src/components/${name}`).substr(0, 2) ===
      '..'
  ) {
    res.status(404).end();
  } else {
    templates.cache
      .get()
      .then(({ componentSource, docSource, contents }) => {
        res.setHeader('Content-Type', 'text/html');
        res.end(
          contents.get('demo-nav')({
            yield: contents.get('demo-nav-data')({
              componentSource,
              docSource,
              portSassBuild: process.env.PORT_SASS_DEV_BUILD,
            }),
          })
        );
      })
      .catch((err) => {
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
  } else if (
    path.relative('src/components', `src/components/${name}`).substr(0, 2) ===
    '..'
  ) {
    res.writeHead(404);
    res.end();
  } else {
    templates
      .render({ layout: 'preview', concat: true }, name)
      .then((rendered) => {
        // eslint-disable-next-line eqeqeq
        if (rendered == null) {
          res.writeHead(404);
          res.end();
        } else {
          res.setHeader('Content-Type', 'text/html');
          res.end(rendered);
        }
      })
      .catch((error) => {
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
  } else if (
    path.relative('src/components', `src/components/${name}`).substr(0, 2) ===
    '..'
  ) {
    res.writeHead(404);
    res.end();
  } else {
    templates
      .render({ layout: false }, name)
      .then((renderedItems) => {
        const o = {};
        renderedItems.forEach((rendered, item) => {
          o[item.handle] = rendered.trim();
        });
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(o));
      })
      .catch((error) => {
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
