const { src, dest, series, watch, parallel } = require('gulp');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const stylus = require('gulp-stylus');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-clean-css');

const path = {
    stylus: 'src/styl/*.styl',
    jsSrc: 'src/js/*.js',
    css: 'assets/css/',
    js: 'assets/js/'
}

var plumberOpts = {
	errorHandler: notify.onError("Error: <%= error.message %>")
}

const css = (cb) => {
    const stream = src(path.stylus)
        .pipe(plumber(plumberOpts))
        .pipe(stylus())
        .pipe(minifycss())
        .pipe(concat('styles.min.css'))
        .pipe(autoprefixer('last 2 versions'));

    stream.pipe(dest(path.css));
    return stream;
}

const js = (cb) => {
    const stream = src(path.jsSrc)
        .pipe(plumber(plumberOpts))
        .pipe(concat('main.min.js'))
        .pipe(dest(path.js));

    return stream;
}

const watcher = (done) => {
    watch(['index.html', 'src/**'])
        .on('change', series(parallel(css, js)))
  }
  
  exports.default = series(parallel(css, js), watcher);
