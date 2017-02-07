const gulp = require('gulp');
const gulpMerge = require('gulp-merge');
const concat = require('gulp-concat');
const path = require('path');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const conf = require('../conf/gulp.conf');

gulp.task('styles', styles);

function styles() {
	return gulpMerge(
		gulp.src(conf.path.src('_index.scss')),
		gulp.src([conf.path.src('**/*.scss'), '!**/_*.scss'])
	)
    .pipe(concat('script.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'})).on('error', conf.errorHandler('Sass'))
    .pipe(postcss([autoprefixer()])).on('error', conf.errorHandler('Autoprefixer'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(conf.path.tmp()))
    .pipe(browserSync.stream());
}
