'use-strict';

//////////////////////////////
// Requires
//////////////////////////////
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var sass = require('gulp-sass');
var stylish = require('jshint-stylish');
var merge = require('merge-stream');
var lazypipe = require('lazypipe');

//////////////////////////////
// Variables
//////////////////////////////

var dirs = {
  'images': 'dev/images/*.{png,jpg,jpeg}',
  'markdown': 'dev/docs/*.md',
  'sass': {
    'main': 'dev/*.scss',
    'components': 'dev/components/**/*.scss',
    'lint': [
      'dev/components/**/*.scss',
      'dev/dev.scss',
      '!dev/*.css'
    ]
  },
  'js': {
    'lint': [
      'Gulpfile.js',
      '*.json',
      'dev/dev.js',
      'dev/components/**/package.json'
    ]
  },
  'html': {
    'reload': [
      'dev/index.html',
      'dev/components/**/html/*.html'
    ]
  }
};

var importPath = {
  node_modules: {
    colors: '../node_modules/bluemix-colors/npm-dist/bluemix-colors',
    typography: '../node_modules/bluemix-typography/bluemix-typography'
  },
  bower_components: {
    colors: '../bluemix-colors/bower-dist/bluemix-colors',
    typography: '../bluemix-typography/bluemix-typography'
  }
};

//////////////////////////////
// BrowserSync
//////////////////////////////

gulp.task('browser-sync', function() {
  browserSync.init({
    logPrefix: "Bluemix Components",
    server: {
      baseDir: "./dev"
    }
  });
});

//////////////////////////////
// HTML Tasks
//////////////////////////////

gulp.task('html:reload', function() {
  gulp.watch(dirs.html.reload).on('change', browserSync.reload);
});

//////////////////////////////
// JavaScript Tasks
//////////////////////////////

gulp.task('jshint', function() {
  return gulp.src(dirs.js.lint)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('jshint:watch', function() {
  gulp.watch(dirs.js.lint, ['jshint']);
});

gulp.task('js:reload', function() {
  gulp.watch(dirs.js.lint).on('change', browserSync.reload);
});


//////////////////////////////
// Sass Tasks
//////////////////////////////

// Using importPaths here to properly compile dev.css for development
gulp.task('sass', function() {
  return gulp.src(dirs.sass.main)
    .pipe(replace('{PATH_TO_COLORS}', importPath.node_modules.colors))
    .pipe(replace('{PATH_TO_TYPOGRAPHY}', importPath.node_modules.typography))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions']
    }))
    .pipe(gulp.dest('dev'))
    .pipe(browserSync.stream());
});

gulp.task('sass:dist', function() {
  var npmDistMain = gulp.src(dirs.sass.main)
    .pipe(replace('{PATH_TO_COLORS}', importPath.node_modules.colors))
    .pipe(replace('{PATH_TO_TYPOGRAPHY}', importPath.node_modules.typography))
    .pipe(rename('_bluemix-components.scss'))
    .pipe(gulp.dest('npm-dist'));

  var npmDistPatterns = gulp.src(dirs.sass.components)
    .pipe(gulp.dest('npm-dist/components'));

  var bowerDistMain = gulp.src(dirs.sass.main)
    .pipe(replace('{PATH_TO_COLORS}', importPath.bower_components.colors))
    .pipe(replace('{PATH_TO_TYPOGRAPHY}', importPath.bower_components.typography))
    .pipe(rename('_bluemix-components.scss'))
    .pipe(gulp.dest('bower-dist'));

  var bowerDistPatterns = gulp.src(dirs.sass.components)
    .pipe(gulp.dest('bower-dist/components'));

  return merge(npmDistMain, npmDistPatterns, bowerDistMain, bowerDistPatterns);
});

gulp.task('sass:watch', function() {
  gulp.watch([dirs.sass.main, dirs.sass.components], ['sass', 'sass:dist']);
});

//////////////////////////////
// Image Tasks
//////////////////////////////

gulp.task('image', function() {
  var npmDist = gulp.src(dirs.images)
    .pipe(gulp.dest('npm-dist/images'));

  var bowerDist = gulp.src(dirs.images)
    .pipe(gulp.dest('bower-dist/images'));

  return merge(npmDist, bowerDist);
});

gulp.task('image:watch', function() {
  gulp.watch(dirs.images, ['image']);
});

//////////////////////////////
// Markdown Tasks
//////////////////////////////

gulp.task('markdown', function() {
  var npmDist = gulp.src(dirs.markdown)
    .pipe(gulp.dest('npm-dist/docs'));

  var bowerDist = gulp.src(dirs.markdown)
    .pipe(gulp.dest('bower-dist/docs'));

  return (npmDist, bowerDist);
});

//////////////////////////////
// Running Tasks
//////////////////////////////

gulp.task('build', ['sass', 'image', 'markdown']);

gulp.task('watch', ['sass:watch', 'jshint:watch', 'image:watch', 'html:reload', 'js:reload']);

gulp.task('default', ['browser-sync', 'build', 'watch']);
