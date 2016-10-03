var gulp = require('gulp');
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');

gulp.task('default', () => {
  watch('**/*', () => {
    gulp.src('spec/**/*')
      .pipe(mocha({ reporter: 'spec' }))
      .on('error', console.warn);
  });
});
