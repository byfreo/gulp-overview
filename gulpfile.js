var gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat');
	

var jsFiles = ['components/scripts/custom.js'];
var sassFiles = ['components/sass/style.scss'];

gulp.task('js', function(){
	gulp.src(jsFiles)
	.pipe(concat('custom.js'))
	.pipe(browserify())
	.pipe(gulp.dest('builds/development/js'))
	.pipe(connect.reload())
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
	.pipe(connect.reload())
});   

gulp.task('watch', function(){
	gulp.watch(jsFiles, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
})

gulp.task('connect', function(){
	connect.server({
		root: 'builds/development/',
		livereload:true
	})
})

gulp.task('default', ['js', 'compass', 'connect', 'watch']);