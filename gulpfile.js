'use strict';

// Node
const fs = require('fs');
const path = require('path');

// Styles
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// Javascript deps
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const pump = require('pump');
const { promisify } = require('bluebird');

// BrowserSync/NodeMon
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');

// Gulp
const gulp = require('gulp');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const jsdoc = require('gulp-jsdoc3');

// Rollup
const rollup = require('rollup');
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

const writeFile = promisify(fs.writeFile);
const mkdirp = promisify(require('mkdirp'));

// Test environment
const Server = require('karma').Server;
const commander = require('commander');

// Fractal templates
const templates = require('./tools/templates');

const assign = v => v;
const cloptions = commander
  .option('-k, --keepalive', 'Keeps browser open after first run of Karma test finishes')
  .option('--name [name]', 'Component name used for aXe testing', assign, '')
  .option('-p, --port [port]', 'Uses the given port for dev env', assign, 3000)
  .option('-r, --rollup', 'Uses Rollup for dev env')
  .parse(process.argv);

// Axe A11y Test
const axe = require('gulp-axe-webdriver');

/**
 * Dev server
 */

gulp.task('dev-server', ['sass:dev'], cb => {
  let started;
  const options = {
    script: './server.js',
    ext: 'js',
    watch: ['server.js', 'tools/templates.js'],
    env: {
      PORT: cloptions.port,
    },
  };
  nodemon(options).on('start', () => {
    if (!started) {
      started = true;
      cb();
    }
  });
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

gulp.task('scripts:dev', () => {
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

gulp.task('scripts:umd', () => {
  const srcFiles = ['./src/**/*.js'];
  const babelOpts = {
    presets: [
      [
        'env',
        {
          targets: {
            browsers: ['last 1 version', 'ie >= 11'],
          },
        },
      ],
    ],
    plugins: ['transform-es2015-modules-umd', 'transform-class-properties'],
  };

  return gulp
    .src(srcFiles)
    .pipe(babel(babelOpts))
    .pipe(gulp.dest('umd/'));
});

gulp.task('scripts:es', () => {
  const srcFiles = ['./src/**/*.js'];
  const babelOpts = {
    presets: [
      [
        'env',
        {
          modules: false,
          targets: {
            browsers: ['last 1 version', 'ie >= 11'],
          },
        },
      ],
    ],
    plugins: ['transform-class-properties'],
  };

  return gulp
    .src(srcFiles)
    .pipe(babel(babelOpts))
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
      sass({
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

gulp.task('sass:source', () => {
  const srcFiles = './src/**/*.scss';

  return gulp.src(srcFiles).pipe(gulp.dest('scss'));
});

gulp.task('html:source', () => {
  const names = {
    'notification--default': 'inline-notification',
    'notification--toast': 'toast-notification',
  };
  return templates.render().then(renderedItems => {
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
        plugins: ['transform-class-properties', 'transform-object-rest-spread'],
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
  gulp.watch(['src/**/**/*.scss', 'demo/**/*.scss'], ['sass:dev']);
});

gulp.task('serve', ['dev-server', 'watch']);

// Build task collection
gulp.task('build:scripts', ['scripts:umd', 'scripts:es', 'scripts:compiled', 'scripts:dev']);
gulp.task('build:styles', ['sass:compiled', 'sass:source']);

// Mapped to npm run build
gulp.task('build', ['build:scripts', 'build:styles', 'html:source']);

// For demo environment
gulp.task('build:dev', ['sass:dev', 'scripts:dev']);

gulp.task('default', () => {
  // eslint-disable-next-line no-console
  console.log('\n\n Please use `$ npm run dev` and navigate to \n http://localhost:3000 to view project locally \n\n');
});
