'use strict';

// Node
const fs = require('fs');
const path = require('path');
const http = require('http');

// Styles
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// Javascript deps
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const pump = require('pump');
const { promisify } = require('bluebird');
const debounce = require('lodash.debounce');

// BrowserSync/NodeMon
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');

// Gulp
const gulp = require('gulp');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const header = require('gulp-header');
const jsdoc = require('gulp-jsdoc3');
const through = require('through2');

// Rollup
const rollup = require('rollup');
const commonjs = require('rollup-plugin-commonjs');
const rollupConfigDev = require('./tools/rollup.config.dev');
const rollupConfigProd = require('./tools/rollup.config');

// WebPack
const webpack = require('webpack');
const webpackDevConfig = require('./tools/webpack.dev.config');

const webpackPromisified = promisify(webpack);

// JSDoc
const jsdocConfig = require('gulp-jsdoc3/dist/jsdocConfig.json');

// Generic utility
const del = require('del');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdirp = promisify(require('mkdirp'));

const portscanner = require('portscanner');

// Test environment
const Server = require('karma').Server;
const commander = require('commander');

// Fractal templates
const templates = require('./tools/templates');

const assign = v => v;
const cloptions = commander
  .option('-b, --use-breaking-changes', 'Build with breaking changes turned on (For dev build only)')
  .option('-e, --use-experimental-features', 'Build with experimental features turned on (For dev build only)')
  .option('-k, --keepalive', 'Keeps browser open after first run of Karma test finishes')
  .option('--name [name]', 'Component name used for aXe testing', assign, '')
  .option('-p, --port [port]', 'Uses the given port for dev env', assign, 3000)
  .option('--port-sass-dev-build [port]', 'Uses the given port for Sass dev build server', assign, 5000)
  .option('-r, --rollup', 'Uses Rollup for dev env')
  .option('-s, --sass-source', 'Force building Sass source')
  .parse(process.argv);

// Axe A11y Test
const axe = require('gulp-axe-webdriver');

const promisePortSassDevBuild = portscanner.findAPortNotInUse(cloptions.portSassDevBuild, cloptions.portSassDevBuild + 100);

/**
 * Dev server
 */

gulp.task('dev-server', ['sass:dev', 'scripts:dev:feature-flags'], cb => {
  promisePortSassDevBuild.then(
    portSassDevBuild => {
      let started;
      const options = {
        script: './server.js',
        ext: 'js',
        watch: ['server.js', 'tools/templates.js'],
        env: {
          PORT: cloptions.port,
          PORT_SASS_DEV_BUILD: portSassDevBuild,
        },
      };
      nodemon(options).on('start', () => {
        if (!started) {
          started = true;
          cb();
        }
      });
    },
    err => {
      console.log('Error finding the port for Sass dev build:', err); // eslint-disable-line no-console
    }
  );
});

/**
 * Clean
 */

// Use: npm run prebuild
gulp.task('clean', () =>
  del([
    'scss',
    'css',
    'es',
    'umd',
    'scripts',
    'html',
    'dist',
    'demo/**/*.{js,map}',
    '!demo/js/components/**/*',
    '!demo/js/demo-switcher.js',
    '!demo/js/theme-switcher.js',
    '!demo/js/inline-loading-demo-button.js',
    '!demo/js/prism.js',
    '!demo/components.js',
    '!demo/index.js',
    '!demo/polyfills/*.js',
  ])
);

/**
 * JavaScript Tasks
 */

const useBreakingChanges = !!cloptions.useBreakingChanges;
let useExperimentalFeatures = !!cloptions.useExperimentalFeatures;

gulp.task('scripts:dev', ['scripts:dev:feature-flags'], () => {
  if (cloptions.rollup) {
    return rollup
      .rollup(rollupConfigDev)
      .then(bundle => bundle.write(rollupConfigDev))
      .then(() => {
        browserSync.reload();
      });
  }
  return webpackPromisified(webpackDevConfig).then(stats => {
    gutil.log(
      '[webpack:build]',
      stats.toString({
        colors: true,
      })
    );
  });
});

gulp.task('scripts:dev:feature-flags', () => {
  const replaceTable = {
    breakingChangesX: useBreakingChanges,
    componentsX: useExperimentalFeatures,
  };
  return readFile(path.resolve(__dirname, 'src/globals/js/feature-flags.js'))
    .then(contents =>
      contents
        .toString()
        .replace(/(exports\.([\w-_]+)\s*=\s*)(true|false)/g, (match, definition, name) =>
          !(name in replaceTable) ? match : `${definition}${replaceTable[name]}`
        )
    )
    .then(contents => writeFile(path.resolve(__dirname, 'demo/feature-flags.js'), contents));
});

gulp.task('scripts:umd', () => {
  const srcFiles = ['./src/**/*.js'];
  const babelOpts = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 1 version', 'ie >= 11'],
          },
        },
      ],
    ],
    plugins: ['@babel/plugin-transform-modules-umd', ['@babel/plugin-proposal-class-properties', { loose: true }]],
  };
  const pathsToConvertToESM = new Set([
    path.resolve(__dirname, 'src/globals/js/feature-flags.js'),
    path.resolve(__dirname, 'src/globals/js/settings.js'),
  ]);
  const cjsPlugin = commonjs();
  cjsPlugin.options({ entry: '' });

  return gulp
    .src(srcFiles)
    .pipe(
      through.obj((file, enc, callback) => {
        if (!pathsToConvertToESM.has(file.path)) {
          callback(null, file);
        } else {
          Promise.resolve(cjsPlugin.transform(file.contents.toString(), file.path)).then(
            result => {
              if (!result) {
                callback(null, file);
              } else {
                file.contents = Buffer.from(result.code);
                callback(null, file);
              }
            },
            err => {
              callback(err);
            }
          );
        }
      })
    )
    .pipe(babel(babelOpts))
    .pipe(
      babel({
        plugins: [require('./tools/babel-plugin-pure-assignment')], // eslint-disable-line global-require
        babelrc: false,
      })
    )
    .pipe(gulp.dest('umd/'));
});

gulp.task('scripts:es', () => {
  const srcFiles = ['./src/**/*.js'];
  const babelOpts = {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: {
            browsers: ['last 1 version', 'ie >= 11'],
          },
        },
      ],
    ],
    plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
  };
  const pathsToConvertToESM = new Set([
    path.resolve(__dirname, 'src/globals/js/feature-flags.js'),
    path.resolve(__dirname, 'src/globals/js/settings.js'),
  ]);
  const cjsPlugin = commonjs();
  cjsPlugin.options({ entry: '' });
  return gulp
    .src(srcFiles)
    .pipe(babel(babelOpts))
    .pipe(
      babel({
        plugins: [require('./tools/babel-plugin-pure-assignment')], // eslint-disable-line global-require
        babelrc: false,
      })
    )
    .pipe(
      through.obj((file, enc, callback) => {
        if (!pathsToConvertToESM.has(file.path)) {
          callback(null, file);
        } else {
          Promise.resolve(cjsPlugin.transform(file.contents.toString(), file.path)).then(
            result => {
              if (!result) {
                callback(null, file);
              } else {
                file.contents = Buffer.from(result.code);
                callback(null, file);
              }
            },
            err => {
              callback(err);
            }
          );
        }
      })
    )
    .pipe(gulp.dest('es/'));
});

gulp.task('scripts:rollup', () => rollup.rollup(rollupConfigProd).then(bundle => bundle.write(rollupConfigProd)));

gulp.task('scripts:compiled', ['scripts:rollup'], cb => {
  const srcFile = './scripts/carbon-components.js';

  pump([gulp.src(srcFile), uglify(), rename('carbon-components.min.js'), gulp.dest('scripts')], cb);
});

/**
 * Sass Tasks
 */

gulp.task('sass:compiled', () => {
  function buildStyles(prod) {
    return gulp
      .src('src/globals/scss/styles.scss')
      .pipe(sourcemaps.init())
      .pipe(
        sass({
          outputStyle: prod ? 'compressed' : 'expanded',
        }).on('error', sass.logError)
      )
      .pipe(
        autoprefixer({
          browsers: ['> 1%', 'last 2 versions'],
        })
      )
      .pipe(
        rename(filePath => {
          if (filePath.basename === 'styles') {
            filePath.basename = 'carbon-components';
          }
          if (prod) {
            filePath.extname = `.min${filePath.extname}`;
          }
        })
      )
      .pipe(
        sourcemaps.write('.', {
          includeContent: false,
          sourceRoot: '../src',
        })
      )
      .pipe(gulp.dest('css'))
      .pipe(browserSync.stream({ match: '**/*.css' }));
  }

  buildStyles(); // Expanded CSS
  buildStyles(true); // Minified CSS
});

gulp.task('sass:dev', () =>
  gulp
    .src('demo/scss/demo.scss')
    .pipe(sourcemaps.init())
    .pipe(
      header(`
        $feature-flags: (
          components-x: ${useExperimentalFeatures},
          breaking-changes-x: ${useBreakingChanges},
          grid: ${useExperimentalFeatures},
          ui-shell: ${useExperimentalFeatures},
        );
      `)
    )
    .pipe(
      sass({
        includePaths: ['node_modules'],
        importer: (url, prev, done) => {
          done({
            file: url.replace(/^carbon-components\/scss\//, `${path.resolve(__dirname, 'src')}/`),
          });
        },
        outputStyle: 'expanded',
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        browsers: ['> 1%', 'last 2 versions'],
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('demo'))
    .pipe(browserSync.stream({ match: '**/*.css' }))
);

gulp.task('sass:dev:server', () => {
  const debouncedSassBuild = debounce(switchTo => {
    if (!useExperimentalFeatures !== !switchTo) {
      useExperimentalFeatures = switchTo;
      gulp.start('sass:dev');
      gulp.start('scripts:dev:feature-flags');
    }
  }, 500);
  return promisePortSassDevBuild.then(portSassDevBuild => {
    http
      .createServer((req, res) => {
        const switchTo = ((/^\/(experimental|classic)/i.exec(req.url) || [])[1] || '').toLowerCase();
        if (switchTo) {
          res.writeHead(200, {
            'Access-Control-Allow-Origin': `http://localhost:${cloptions.port}`,
          });
          res.end();
          debouncedSassBuild(switchTo === 'experimental');
        }
      })
      .listen(portSassDevBuild);
    console.log(`Sass dev build server started on port: ${portSassDevBuild}`); // eslint-disable-line no-console
  });
});

gulp.task('sass:source', () => {
  const srcFiles = './src/**/*.scss';

  return gulp.src(srcFiles).pipe(gulp.dest('scss'));
});

gulp.task('html:dev', ['scripts:dev:feature-flags'], () =>
  Promise.all([mkdirp(path.resolve(__dirname, 'demo/code')), mkdirp(path.resolve(__dirname, 'demo/component'))]).then(() =>
    templates.cache.get().then(({ componentSource, docSource, contents }) =>
      Promise.all([
        writeFile(
          path.resolve(__dirname, 'demo/index.html'),
          contents.get('demo-nav')({
            yield: contents.get('demo-nav-data')({
              componentSource,
              docSource,
              routeWithQueryArgs: true,
              useStaticFullRenderPage: true,
            }),
          })
        ),
        ...componentSource
          .map(({ handle }) =>
            templates.render({ layout: false }, handle).then(renderedItems => {
              const o = {};
              renderedItems.forEach((rendered, item) => {
                o[item.handle] = rendered.trim();
              });
              return writeFile(path.resolve(__dirname, 'demo/code', handle), JSON.stringify(o));
            })
          )
          .toArray(),
        templates
          .render({ layout: 'preview' })
          .then(table =>
            Promise.all(
              Array.from(table.entries()).map(([{ handle }, value]) =>
                writeFile(path.resolve(__dirname, 'demo/component', `${handle}.html`), value)
              )
            )
          ),
      ])
    )
  )
);

gulp.task('html:source', ['scripts:dev:feature-flags'], () => {
  const names = {
    'notification--default': 'inline-notification',
    'notification--toast': 'toast-notification',
  };
  return templates.render({ layout: false }).then(renderedItems => {
    const promises = [];
    renderedItems.forEach((rendered, item) => {
      const dirname = path.dirname(path.resolve(__dirname, 'html', item.relViewPath));
      const filename = `${names[item.handle] || item.handle.replace(/--default$/, '')}.html`;
      promises.push(mkdirp(dirname).then(() => writeFile(path.resolve(dirname, filename), rendered)));
    });
    return Promise.all(promises);
  });
});

/**
 * JSDoc
 */

gulp.task('jsdoc', cb => {
  gulp
    .src('./src/**/*.js')
    .pipe(
      babel({
        plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread'],
        babelrc: false,
      })
    )
    .pipe(gulp.dest('./docs/js/tmp'))
    .on('end', () => {
      gulp.src(['README.md', 'docs/js/tmp/**/*.js'], { read: false }).pipe(
        jsdoc(
          Object.assign(jsdocConfig, {
            // eslint-disable-line global-require
            opts: {
              destination: './docs/js',
            },
          }),
          err => {
            if (err) {
              cb(err);
            } else {
              del('./docs/js/tmp', cb);
            }
          }
        )
      );
    })
    .on('error', cb);
});

/**
 * Test
 */

gulp.task('test', ['test:unit', 'test:a11y']);

gulp.task('test:unit', ['html:source'], done => {
  new Server(
    {
      configFile: path.resolve(__dirname, 'tests/karma.conf.js'),
      singleRun: !cloptions.keepalive,
    },
    done
  ).start();
});

gulp.task('test:a11y', ['sass:compiled'], done => {
  const componentName = cloptions.name;
  const options = {
    a11yCheckOptions: {
      rules: {
        'html-has-lang': { enabled: false },
        bypass: { enabled: false },
        'image-alt': { enabled: false },
      },
    },
    verbose: true,
    showOnlyViolations: true,
    exclude: '.offleft, #flex-col, #flex-row',
    tags: ['wcag2aa', 'wcag2a'],
    folderOutputReport: !componentName ? 'tests/axe/allHtml' : 'tests/axe',
    saveOutputIn: !componentName ? `a11y-html.json` : `a11y-${componentName}.json`,
    urls: !componentName ? ['http://localhost:3000'] : [`http://localhost:3000/component/${componentName}/`],
  };

  return axe(options, done);
});

// Watch Tasks
gulp.task('watch', () => {
  if (cloptions.rollup) {
    gulp.watch(['src/**/**/*.js', 'demo/**/**/*.js', '!demo/demo.js'], ['scripts:dev']);
  }
  gulp.watch(['src/**/**/*.scss', 'demo/**/*.scss'], !cloptions.sassSource ? ['sass:dev'] : ['sass:dev', 'sass:source']);
});

gulp.task('serve', ['dev-server', 'watch', 'sass:dev:server']);

// Build task collection
gulp.task('build:scripts', ['scripts:umd', 'scripts:es', 'scripts:compiled', 'scripts:dev']);
gulp.task('build:styles', ['sass:compiled', 'sass:source']);

// Mapped to npm run build
gulp.task('build', ['build:scripts', 'build:styles', 'html:source']);

// For demo environment
gulp.task('build:dev', ['sass:dev', 'scripts:dev', 'html:dev']);

gulp.task('default', () => {
  // eslint-disable-next-line no-console
  console.log('\n\n Please use `$ npm run dev` and navigate to \n http://localhost:3000 to view project locally \n\n');
});
