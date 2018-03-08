var gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat');
	

var jsFiles = ['components/scripts/custom.js'];

gulp.task('js', function(){
	gulp.src(jsFiles)
	.pipe(concat('custom.js'))
	.pipe(browserify())
	.pipe(gulp.dest('builds/development/js'))
});
 
