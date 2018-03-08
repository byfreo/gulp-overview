var gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	concat = require('gulp-concat');
	

var jsFiles = ['components/scripts/custom.js'];
var sassFiles = ['components/sass/style.scss'];

gulp.task('js', function(){
	gulp.src(jsFiles)
	.pipe(concat('custom.js'))
	.pipe(browserify())
	.pipe(gulp.dest('builds/development/js'))
});

gulp.task('compass', function(){
	gulp.src(sassFiles)
	.pipe(compass({
		sass:'components/sass',
		image:'builds/development/images',
		style:'expanded'
	})
	.on('error', gutil.log))
	.pipe(gulp.dest('builds/development/css'))
});   

gulp.task('default', ['js', 'compass']);
 
