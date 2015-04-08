var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');

var globs = {
    js: [path.join(__dirname, '/src/**/*.js')],
    css: [path.join(__dirname, '/src/**/*.css')]
};

gulp.task('default', function () {
    gutil.log('Compiling..');

    gulp.src(globs.js)
        .pipe(gulp.dest('dist'))
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));

    gulp.src(globs.css)
        .pipe(gulp.dest('dist'))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist'));
});
