// Gulp Requires
var gulp 				= 	require('gulp'),
		gutil 			= 	require('gulp-util'),
		browserify 	= 	require('gulp-browserify'),
		compass 		= 	require('gulp-compass'),
		connect 		= 	require('gulp-connect'),
		concat 			= 	require('gulp-concat');

// Variables
var env,
		jsFiles,
		sassFiles,
		htmlFiles,
		outputDir,
		sassStyle;

// Environment
env = process.env.NODE_ENV || 'development';

if (env==='development') {
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
}else{
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}

// Paths
jsFiles 	= ['components/scripts/custom.js'];
sassFiles = ['components/sass/style.scss'];
htmlFiles = [outputDir+'index.html'];

// Javascript Files & Gulp Plugins + Connect
gulp.task('js', function(){
	gulp.src(jsFiles)
	.pipe(concat('custom.js'))
	.pipe(browserify())
	.pipe(gulp.dest(outputDir+'js'))
	.pipe(connect.reload())
});

// Sassify + Connect
gulp.task('compass', function(){
	gulp.src(sassFiles)
	.pipe(compass({
		sass:'components/sass',
		image:outputDir+'images',
		style:sassStyle
	})
	.on('error', gutil.log))
	.pipe(gulp.dest(outputDir+'css'))
	.pipe(connect.reload())
});   

// HTML File + Connect
gulp.task('html', function(){
	gulp.src(htmlFiles)
	.pipe(connect.reload())
})

// Connect
gulp.task('connect', function(){
	connect.server({
		root: outputDir,
		livereload:true
	})
})

// Watch
gulp.task('watch', function(){
	gulp.watch(jsFiles, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch(htmlFiles, ['html']);
})

// Run default
gulp.task('default', ['html', 'js', 'compass', 'connect', 'watch']);