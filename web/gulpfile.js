'use strict';

var del = require('del');
var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('build', ['clean', 'build-files'])

gulp.task('clean', function (done) {
  del.sync(['.tmp/**/*', 'dist/**/*']);
  done();
});

gulp.task('build-files', [], function() {
	return gulp
		.src([
			'src/**/*',
			'!src/bower_components/**/*'
		])
		.pipe(gulp.dest('dist'))
});

