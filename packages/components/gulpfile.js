'use strict';

// Node
const fs = require('fs');
const path = require('path');
const http = require('http');

// Styles
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const customProperties = require('postcss-custom-properties');
// load dart-sass
const dartSass = require('sass');
// required for dart-sass - async builds are significantly slower without this package
const Fiber = require('fibers');
// require node-sass so we can explicitly set `gulp-sass`s `.compiler` property
const nodeSass = require('node-sass');

// Javascript deps
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const { promisify } = require('bluebird');
const debounce = require('lodash.debounce');

// BrowserSync/NodeMon
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');

// Gulp
const gulp = require('gulp');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const header = require('gulp-header');
const jsdoc = require('gulp-jsdoc3');
const log = require('fancy-log');
const through = require('through2');

// Rollup
const { rollup } = require('rollup');
const commonjs = require('@rollup/plugin-commonjs');
const { terser: rollupTerser } = require('rollup-plugin-terser');
const rollupConfigDev = require('./tools/rollup.config.dev');
const rollupConfigProd = require('./tools/rollup.config');

// WebPack
const webpack = require('webpack');

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
const { Server } = require('karma');
const commander = require('commander');

// Fractal templates, deferred require is so that we can run `gulp clean`
// without depending on `@carbon/icons` to be available
let templates;
function getTemplates() {
  if (!templates) {
    // eslint-disable-next-line global-require
    templates = require('./tools/templates');
  }
}

const assign = (v) => v;
const cloptions = commander
  .option(
    '-b, --use-breaking-changes',
    'Build with breaking changes turned on (For dev build only)'
  )
  .option(
    '-e, --use-experimental-features',
    'Build with experimental features turned on (For dev build only)'
  )
  .option(
    '-k, --keepalive',
    'Keeps browser open after first run of Karma test finishes'
  )
  .option('--name [name]', 'Component name used for aXe testing', assign, '')
  .option('-p, --port [port]', 'Uses the given port for dev env', assign, 3000)
  .option(
    '--port-sass-dev-build [port]',
    'Uses the given port for Sass dev build server',
    assign,
    5000
  )
  .option('-r, --rollup', 'Uses Rollup for dev env')
  .option('-s, --sass-source', 'Force building Sass source')
  .option('-ds, --use-dart-sass', 'Uses dart-sass instead of node-sass')
  .parse(process.argv);

// Axe A11y Test
const axe = require('gulp-axe-webdriver');

const promisePortSassDevBuild = portscanner.findAPortNotInUse(
  cloptions.portSassDevBuild,
  cloptions.portSassDevBuild + 100
);

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
    '!demo/js/data-table-demo-expand-all-manager.js',
    '!demo/js/file-uploader-demo-state-manager.js',
    '!demo/js/prism.js',
    '!demo/components.js',
    '!demo/index.js',
    '!demo/polyfills/*.js',
  ])
);

/**
 * JavaScript Tasks
 */

const { useBreakingChanges, useDartSass } = cloptions;
let { useExperimentalFeatures } = cloptions;

let sassDefaultOptions = {};

if (useDartSass) {
  sass.compiler = dartSass;
  sassDefaultOptions = {
    fiber: Fiber,
  };
} else {
  sass.compiler = nodeSass;
}

gulp.task('scripts:dev:feature-flags', () => {
  const replaceTable = {};
  if (typeof useBreakingChanges !== 'undefined') {
    replaceTable.breakingChangesX = useBreakingChanges;
  }
  if (typeof useExperimentalFeatures !== 'undefined') {
    replaceTable.componentsX = useExperimentalFeatures;
    replaceTable.grid = useExperimentalFeatures;
  }
  return readFile(path.resolve(__dirname, 'src/globals/js/feature-flags.js'))
    .then((contents) =>
      contents
        .toString()
        .replace(
          /(exports\.([\w-_]+)\s*=\s*)(true|false)/g,
          (match, definition, name) =>
            !(name in replaceTable)
              ? match
              : `${definition}${!!replaceTable[name]}`
        )
    )
    .then((contents) =>
      writeFile(path.resolve(__dirname, 'demo/feature-flags.js'), contents)
    );
});

const buildDemoJS = () => {
  if (cloptions.rollup) {
    return rollup({
      ...rollupConfigDev,
      plugins: [
        ...rollupConfigDev.plugins,
        process.env.NODE_ENV !== 'production' ? {} : rollupTerser(),
      ],
    })
      .then((bundle) =>
        bundle.write({
          format: 'iife',
          name: 'CarbonComponents',
          file: `demo/demo${
            process.env.NODE_ENV !== 'production' ? '' : '.min'
          }.js`,
          sourcemap: 'inline',
        })
      )
      .then(() => {
        browserSync.reload();
      });
  }
  const webpackDemoConfig = require('./tools/webpack-demo.config'); // eslint-disable-line global-require
  return webpackPromisified(webpackDemoConfig).then((stats) => {
    log(
      '[webpack:build]',
      stats.toString({
        colors: true,
      })
    );
  });
};

gulp.task('scripts:dev', gulp.series('scripts:dev:feature-flags', buildDemoJS));

const setProductionMode = async () => {
  process.env.NODE_ENV = 'production';
};

gulp.task('scripts:dev:deploy', gulp.series(setProductionMode, 'scripts:dev'));

const pathsToConvertToESM = new Set([
  path.resolve(__dirname, 'src/globals/js/feature-flags.js'),
  path.resolve(__dirname, 'src/globals/js/settings.js'),
]);

const convertToESMGulpPlugin = () =>
  through.obj((file, enc, callback) => {
    if (!pathsToConvertToESM.has(file.path)) {
      callback(null, file);
    } else {
      rollup({
        input: file.path,
        plugins: [
          commonjs({
            sourceMap: false,
          }),
        ],
        onwarn: (warning, handle) => {
          if (warning.code !== 'EMPTY_BUNDLE') {
            handle(warning);
          }
        },
      })
        .then((bundle) => bundle.generate({ format: 'esm' }))
        .then(
          ({ output }) => {
            file.contents = Buffer.from(
              output.map(({ code }) => code).join('\n')
            );
            callback(null, file);
          },
          (err) => {
            callback(err);
          }
        );
    }
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
    plugins: [
      '@babel/plugin-transform-modules-umd',
      ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
  };

  return gulp
    .src(srcFiles)
    .pipe(convertToESMGulpPlugin())
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
  return gulp
    .src(srcFiles)
    .pipe(convertToESMGulpPlugin())
    .pipe(babel(babelOpts))
    .pipe(
      babel({
        plugins: [require('./tools/babel-plugin-pure-assignment')], // eslint-disable-line global-require
        babelrc: false,
      })
    )
    .pipe(gulp.dest('es/'));
});

gulp.task('scripts:rollup', () =>
  rollup(rollupConfigProd).then((bundle) =>
    bundle.write({
      format: 'iife',
      name: 'CarbonComponents',
      file: 'scripts/carbon-components.js',
    })
  )
);

const minifyJS = () =>
  gulp
    .src('./scripts/carbon-components.js')
    .pipe(terser())
    .pipe(rename('carbon-components.min.js'))
    .pipe(gulp.dest('scripts'));

gulp.task('scripts:compiled', gulp.series('scripts:rollup', minifyJS));

/**
 * Sass Tasks
 */

const buildStyles = (prod) => {
  const buildStylesForType = () =>
    gulp
      .src('src/globals/scss/styles.scss')
      .pipe(sourcemaps.init())
      .pipe(
        sass(
          Object.assign({}, sassDefaultOptions, {
            outputStyle: prod ? 'compressed' : 'expanded',
          })
        ).on('error', sass.logError)
      )
      .pipe(
        postcss([
          autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'ie >= 11'],
            grid: 'autoplace',
          }),
        ])
      )
      .pipe(
        rename((filePath) => {
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
  return buildStylesForType;
};

gulp.task('sass:compiled', gulp.parallel(buildStyles(), buildStyles(true)));

gulp.task('sass:dev', () => {
  const flags = {
    'grid-columns-16': false,
    'ui-shell': true,
  };
  if (typeof useBreakingChanges !== 'undefined') {
    flags['breaking-changes-x'] = useBreakingChanges;
  }
  if (typeof useExperimentalFeatures !== 'undefined') {
    flags['components-x'] = useExperimentalFeatures;
    flags.grid = useExperimentalFeatures;
  }
  return gulp
    .src('demo/scss/demo.scss')
    .pipe(sourcemaps.init())
    .pipe(
      header(`
      $feature-flags: (${Object.keys(flags)
        .reduce((a, flag) => [...a, `${flag}: ${!!flags[flag]}`], [])
        .join(', ')});
     `)
    )
    .pipe(
      sass(
        Object.assign({}, sassDefaultOptions, {
          includePaths: ['node_modules'],
          outputStyle: 'expanded',
        })
      ).on('error', sass.logError)
    )
    .pipe(
      postcss([
        customProperties(),
        autoprefixer({
          browsers: ['> 1%', 'last 2 versions', 'ie >= 11'],
          grid: 'autoplace',
        }),
      ])
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('demo'))
    .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('sass:dev:server', () => {
  const debouncedSassBuild = debounce((switchTo) => {
    if (
      typeof useExperimentalFeatures === 'undefined' ||
      !useExperimentalFeatures !== !switchTo
    ) {
      useExperimentalFeatures = switchTo;
      gulp.task('sass:dev')();
      gulp.task('scripts:dev:feature-flags')();
    }
  }, 500);
  return promisePortSassDevBuild.then((portSassDevBuild) => {
    http
      .createServer((req, res) => {
        const switchTo = (
          (/^\/(experimental|classic)/i.exec(req.url) || [])[1] || ''
        ).toLowerCase();
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

gulp.task('sass:source', () =>
  gulp.src('./src/**/*.scss').pipe(gulp.dest('scss'))
);

const buildDemoHTML = () => {
  getTemplates();
  return Promise.all([
    mkdirp(path.resolve(__dirname, 'demo/code')),
    mkdirp(path.resolve(__dirname, 'demo/component')),
  ]).then(() =>
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
            minify: true,
            queryRoute: true,
          })
        ),
        ...componentSource
          .map(({ handle }) =>
            templates
              .render({ layout: false }, handle)
              .then((renderedItems) => {
                const o = {};
                renderedItems.forEach((rendered, item) => {
                  o[item.handle] = rendered.trim();
                });
                return writeFile(
                  path.resolve(__dirname, 'demo/code', handle),
                  JSON.stringify(o)
                );
              })
          )
          .toArray(),
        templates
          .render({ layout: 'preview', layoutContext: { minify: true } })
          .then((table) =>
            Promise.all(
              Array.from(table.entries()).map(([{ handle }, value]) =>
                writeFile(
                  path.resolve(__dirname, 'demo/component', `${handle}.html`),
                  value
                )
              )
            )
          ),
      ])
    )
  );
};

gulp.task('html:dev', gulp.series('scripts:dev:feature-flags', buildDemoHTML));

const buildHTML = () => {
  const names = {
    'notification--default': 'inline-notification',
    'notification--toast': 'toast-notification',
  };
  getTemplates();
  return templates.render({ layout: false }).then((renderedItems) => {
    const promises = [];
    renderedItems.forEach((rendered, item) => {
      const dirname = path.dirname(
        path.resolve(__dirname, 'html', item.relViewPath)
      );
      const filename = `${
        names[item.handle] || item.handle.replace(/--default$/, '')
      }.html`;
      promises.push(
        mkdirp(dirname).then(() =>
          writeFile(path.resolve(dirname, filename), rendered)
        )
      );
    });
    return Promise.all(promises);
  });
};

gulp.task('html:source', gulp.series('scripts:dev:feature-flags', buildHTML));

/**
 * Dev server
 */

const launchDevServer = (cb) => {
  promisePortSassDevBuild.then(
    (portSassDevBuild) => {
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
    (err) => {
      console.log('Error finding the port for Sass dev build:', err); // eslint-disable-line no-console
    }
  );
};

gulp.task(
  'dev-server',
  gulp.series(
    gulp.parallel(['sass:dev', 'scripts:dev:feature-flags']),
    launchDevServer
  )
);

/**
 * JSDoc
 */

gulp.task('jsdoc', (cb) => {
  gulp
    .src('./src/**/*.js')
    .pipe(
      babel({
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-object-rest-spread',
        ],
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
          (err) => {
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

const startTest = (done) => {
  new Server(
    {
      configFile: path.resolve(__dirname, 'tests/karma.conf.js'),
      singleRun: !cloptions.keepalive,
    },
    done
  ).start();
};

gulp.task('test:unit', gulp.series('html:source', startTest));

const startAccessibilityTest = (done) => {
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
    saveOutputIn: !componentName
      ? `a11y-html.json`
      : `a11y-${componentName}.json`,
    urls: !componentName
      ? ['http://localhost:3000']
      : [`http://localhost:3000/component/${componentName}/`],
  };

  return axe(options, done);
};

gulp.task('test:a11y', gulp.series('sass:compiled', startAccessibilityTest));

gulp.task('test', gulp.parallel('test:unit', 'test:a11y'));

// Watch Tasks
gulp.task('watch', () => {
  if (cloptions.rollup) {
    gulp.watch(
      ['src/**/**/*.js', 'demo/**/**/*.js', '!demo/demo.js'],
      gulp.task('scripts:dev')
    );
  }
  gulp.watch(
    ['src/**/**/*.scss', 'demo/**/*.scss'],
    !cloptions.sassSource
      ? gulp.task('sass:dev')
      : gulp.parallel('sass:dev', 'sass:source')
  );
});

gulp.task('serve', gulp.parallel('dev-server', 'watch', 'sass:dev:server'));

// Build task collection
gulp.task(
  'build:scripts',
  gulp.parallel(
    'scripts:umd',
    'scripts:es',
    'scripts:compiled',
    'scripts:dev:deploy'
  )
);
gulp.task('build:styles', gulp.parallel('sass:compiled', 'sass:source'));

// Mapped to npm run build
gulp.task(
  'build',
  gulp.parallel('build:scripts', 'build:styles', 'html:source')
);

// For demo environment
gulp.task('build:dev', gulp.parallel('sass:dev', 'scripts:dev', 'html:dev'));
gulp.task(
  'build:dev:deploy',
  gulp.parallel('sass:dev', 'scripts:dev:deploy', 'html:dev')
);

gulp.task('default', gulp.task('serve'));
