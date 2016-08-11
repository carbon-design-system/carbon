const gulp = require('gulp');

gulp.task('build', ['styles'], () => {
  return gulp.src([
    'node_modules/@console/bluemix-components/consumables/js/es5/bluemix-components.min.js',
    'node_modules/svgxuse/svgxuse.min.js',
  ])
  .pipe(gulp.dest('./app/dist/js'));
});
