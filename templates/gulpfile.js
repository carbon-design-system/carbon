'use strict';

const gulp = require('gulp');
const requireDir = require('require-dir')('./tasks');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;


gulp.task('watch', () => {
  gulp.watch('app/scss/*.scss', ['styles', reload]);
  gulp.watch('app/dist/**/*.html', reload);
});

gulp.task('dev', ['build', 'watch', 'nodemon'], () => {
  browserSync.init({
    proxy: 'http://localhost:7777',
    open: false
  });
})

gulp.task('default', ['build', 'nodemon'], () => {
  browserSync.init({
    proxy: 'http://localhost:7777',
    open: false
  });
})