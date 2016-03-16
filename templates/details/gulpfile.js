const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');

// Paths

const source = {
  app: 'app',
  dist: 'dist',
}

const paths = {
  css: `${source.app}/scss/**/*.scss`,
  js: `${source.app}/js/app.js`,
  html: `${source.app}/index.html`,
};

// Webpack

const webpackConfig = {
  output: {
    filename: 'app.js',
  },
  devtool: 'source-maps',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ]
  }
}

gulp.task('minify', () => {
  return gulp.src(paths.html)
    .pipe(htmlmin())
    .pipe(gulp.dest(source.dist))
    .pipe(browserSync.stream());
});

gulp.task('sass', () => {
  return gulp.src(paths.css)
    .pipe(sass({
      includePaths: ['./../../']
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(`${source.dist}/css`))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp.src(paths.js)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(`${source.dist}/js`))
    .pipe(browserSync.stream());
});

gulp.task('build', ['minify', 'sass', 'js'], () => {
  console.log('build done');
});

gulp.task('serve', ['build'], () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  gulp.watch(paths.html, ['minify']);
  gulp.watch(paths.css, ['sass']);
  gulp.watch(paths.js, ['js']);
});

gulp.task('default', ['minify', 'sass', 'js'], () => {
  console.log('done');
});
