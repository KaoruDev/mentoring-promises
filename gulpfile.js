var gulp = require('gulp');
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');

gulp.task('default', () => {
  watch('spec/**/*', (file) => {
    gulp.src(file.path)
      .pipe(mocha({ reporter: 'spec' }))
      .on('error', () => {});
  });
});
