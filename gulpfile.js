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
    return gulp.src(['src/img/*.jpg', 'src/views/images/*.png'], { base: 'src' })
        .pipe(imagemin(imageminGuetzli()))
        .pipe(gulp.dest('dist'));
});

gulp.task('png', function() {
    return gulp.src('src/img/*.png')
        .pipe(imagemin(imagemin.optipng({ optimizationLevel: 7 })))
        .pipe(gulp.dest('dist/img'));
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
        .pipe(rename({ suffix: '-thumbnail' }))
        .pipe(gulp.dest('dist/views/images'));
});

// Minify html

gulp.task('minify-html', function() {
    return gulp.src(['src/*.html', 'src/views/*.html'], { base: 'src' })
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

// Clean css

gulp.task('minify-css', function() {
    return gulp.src('src/css/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-css-views', function() {
    return gulp.src('src/views/css/*.css')
        .pipe(concat('styles.css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/views/css'));
});

// Minify js

gulp.task('uglify', function() {
    return gulp.src(['src/js/*.js', 'src/views/js/*.js'], { base: 'src' })
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('critical', ['minify'], function () {
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

gulp.task('images', ['imagemin', 'png', 'responsive-img', 'responsive-thumbnail']);
gulp.task('minify', ['minify-html', 'minify-css', 'minify-css-views']);

