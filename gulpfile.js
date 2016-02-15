'use strict';

const gulp        = require('gulp');

const browserify  = require('browserify');
const babelify    = require('babelify');
const source      = require('vinyl-source-stream');
const buffer      = require('vinyl-buffer');
const uglify      = require('gulp-uglify');
const sourcemaps  = require('gulp-sourcemaps');
const livereload  = require('gulp-livereload');
const webserver   = require('gulp-webserver');

const config = {
  host: 'localhost',
  port: '8080'
};

gulp.task('webserver', () => {
  gulp.src('.')
    .pipe(webserver({
      host: config.host,
      port: config.port,
      livereload: true,
      directoryListing: false,
    }));
});

gulp.task('build',  () => {
  // app.js is your main JS file with all your module inclusions
  return browserify({entries: 'js/app.js', debug: true})
    .transform(babelify, { presets: ["es2015"] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());
});

gulp.task('watch', ['webserver', 'build'], function () {
  livereload.listen();
  gulp.watch('js/*.js', ['build']);
});

gulp.task('default', ['watch']);
