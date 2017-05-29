var gulp = require('gulp');

var imagemin = require('gulp-imagemin');
var imageminGuetzli = require('imagemin-guetzli');
var responsive = require('gulp-responsive');
var rename = require("gulp-rename");

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

gulp.task('images', ['imagemin', 'png', 'responsive-img', 'responsive-thumbnail']);
