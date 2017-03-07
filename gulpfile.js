var gulp = require('gulp');

var package = require('./package.json');
var runSequence = require('run-sequence');
var argv = require('yargs').argv;

// MAIN SEQUENCE //
gulp.task('default', function () {
  runSequence('loadFiles','fonts',['sass','browserSync', 'watch']);//,'addremote'
});

///////////////////// TASKS ////////////////////////////

// LOAD PROJECT FILES FROM TEMPLATES //
var filesTemplate = "../../templates/"+ package.scripts.template +"/**/*";
var filesDest = "src/";
gulp.task('loadFiles', function() {
    gulp.src(filesTemplate)
    .pipe(gulp.dest(filesDest))
    .pipe(gulp.watch('src/sass/**/*.sass', ['sass']));
});

// FONTS //
gulp.task('fonts', function() {
	var destPlace = (!argv.production)?"src/fonts":"dist/fonts";
	var fontList = [];
	for(var f in package.scripts.fonts){
		fontList[f] = "../../templates/fonts/"+package.scripts.fonts[f]+".*";
	}
	return gulp.src(fontList)
	.pipe(gulp.dest(destPlace))
});

// SASS //
var sass = require('gulp-sass');
gulp.task('sass',function(){
  return gulp.src('src/sass/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('src/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// BROWSER SYNC //
var browserSync = require('browser-sync').create();
gulp.task('browserSync', function() {
  var baseDir = (!argv.production)?"src":"dist";
  browserSync.init({
    server: {
      baseDir: baseDir
    },
  })
});

// WATCH //
gulp.task('watch',['browserSync', 'sass'],function(){
	gulp.watch('src/sass/**/*.sass', ['sass']);
	gulp.watch('src/*', browserSync.reload);
});

// IMAGES OPTIMIZER //
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
gulp.task('images', function() {
  return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'))
});

// JS | CSS OPTIMIZER //
var useref = require('gulp-useref');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
gulp.task('useref', function(){
  return gulp.src(['!src/sass','src/*'])
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// DEL DIST FILES //
var del = require('del');
gulp.task('clean:dist', function() {
  return gulp.src(['!src/sass','src/*'])
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// CLEAR CACHE //
gulp.task('cache:clear', function () {
	return cache.clearAll();
});

// DATA //
var jsonMinify = require('gulp-json-minify');
gulp.task('data', function() {
  return gulp.src('src/data/**/*')
  .pipe(jsonMinify())
  .pipe(gulp.dest('dist/data'))
});

// VIEWS //
gulp.task('views', function() {
	return gulp.src('src/views/**/*')
	.pipe(gulp.dest('dist/views'))
});

// BUILD //
gulp.task('build', function() {
	argv.production = true;
	runSequence(
		'clean:dist','cache:clear','sass',['useref'],'views','fonts','images','data','browserSync'
	)
});