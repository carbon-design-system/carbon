'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('nodemon', () => {
  let started = false;

  const stream = nodemon({
    script: './app/bin/www',
    watch: './app',
  })
  .on('start', () => {
    if (!started) {
      started = true;
      cb();
    } else {
      browserSync.reload({ stream: false });
    }
  });

  return stream;
});
