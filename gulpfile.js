var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
var csscomb      = require('gulp-csscomb');
var cssnano      = require('gulp-cssnano');
var eslint       = require('gulp-eslint');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var rename       = require('gulp-rename');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');

var onError = function(err) {
  notify.onError({
    title:    "Error",
    message:  "<%= error %>",
  })(err);
  this.emit('end');
};

var plumberOptions = {
  errorHandler: onError,
};

var postCSSOptions = require('./config.postcss.json');
var autoprefixerOptions = postCSSOptions.autoprefixer;

gulp.task('sass', function() {
  return gulp.src('_sass/screen.scss')
    .pipe(plumber(plumberOptions))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('css'));
});

gulp.task('site:css', function() {
  return gulp.src('css/**/*.css')
    .pipe(csscomb('.csscomb.dist.json'))
    .pipe(cssnano())
    .pipe(gulp.dest('css'));
});

gulp.task('dist:css', function() {
  return gulp.src('_sass/hamburgers/hamburgers.scss')
    .pipe(sass())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('dist'))
    .pipe(csscomb('.csscomb.dist.json'))
    .pipe(cssnano())
    .pipe(rename('hamburgers.min.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('eslint', function() {
  return gulp.src('_js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('concat', ['eslint'], function() {
  return gulp.src([
      '_js/hamburgers.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('hamburgers.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task('site:js', function() {
  return gulp.src([
      '_js/**/*.js',
    ])
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

gulp.task('watch', function() {
  var browserSyncConfig = require('./bs-config.js');

  browserSync.init(browserSyncConfig);

  gulp.watch('_sass/**/*.scss', ['sass']);
  gulp.watch('_js/**/*.js', ['concat']);
});

gulp.task('build', ['sass', 'concat']);

gulp.task('site', ['build'], function() {
  gulp.start('site:css');
  gulp.start('site:js');
});

gulp.task('dist', ['dist:css']);

gulp.task('default', ['build', 'watch']);
