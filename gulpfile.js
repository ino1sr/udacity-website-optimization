var gulp = require('gulp');

var imagemin = require('gulp-imagemin');
var imageminGuetzli = require('imagemin-guetzli');
var responsive = require('gulp-responsive');
var rename = require("gulp-rename");
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var critical = require('critical');

// Optimize images

gulp.task('imagemin', function() {
  return gulp.src('src/img/*.jpg', {base: 'src'})
    .pipe(imagemin(imageminGuetzli()))
    .pipe(gulp.dest('dist'));
});

gulp.task('png', function() {
  return gulp.src('src/img/*.png')
    .pipe(imagemin(imagemin.optipng({optimizationLevel: 7})))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('png-copy', function() {
  return gulp.src('src/views/images/*.png', {base: 'src/views'})
    .pipe(gulp.dest('dist/views'));
});

gulp.task('responsive-img', function() {
  return gulp.src('src/views/images/pizzeria.jpg')
    .pipe(responsive({
      'pizzeria.jpg': {
        width: 400,
        quality: 50
      }
    }))
    .pipe(gulp.dest('dist/views/images'));
});

gulp.task('responsive-thumbnail', function() {
  return gulp.src('src/views/images/pizzeria.jpg')
    .pipe(responsive({
      'pizzeria.jpg': {
        width: 100
      }
    }))
    .pipe(rename({
      suffix: '-thumbnail'
    }))
    .pipe(gulp.dest('dist/views/images'));
});

// Minify html

gulp.task('minify-html', function() {
  return gulp.src('src/*.html', {base: 'src'})
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'));
});

// Clean css

gulp.task('minify-css', function() {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('dist/css'));
});

// Minify js

gulp.task('uglify', function() {
  return gulp.src('src/js/*.js', {base: 'src'})
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// Inline critical-path css

gulp.task('critical', ['minify'], function() {
  critical.generate({
    inline: true,
    base: 'dist/',
    src: 'index.html',
    css: ['dist/css/style.css'],
    dest: 'index.html',
    minify: true,
    width: 320,
    height: 480
  });
});

// Copy `views` except images to `dist`

gulp.task('copy', function() {
  return gulp.src(['src/views/*.html', 'src/views/css/*', 'src/views/js/*'], {base: 'src/views'})
    .pipe(gulp.dest('dist/views'));
});

gulp.task('images', ['imagemin', 'png', 'png-copy', 'responsive-img', 'responsive-thumbnail']);
gulp.task('minify', ['minify-html', 'minify-css', 'uglify']);

// Default task

gulp.task('default', ['images', 'critical', 'copy']);

// Clean `dist` folder

var del = require('del');

gulp.task('clean', function() {
  return del([
    'dist/**/*'
  ]);
});
