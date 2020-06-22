const { watch, src, dest, parallel } = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const tsify = require('tsify');
const uglify = require('gulp-uglify');
const fancy_log = require('fancy-log');

const paths = {
  pages: ['src/*.html'],
};

function copyHtml(cb) {
  src(paths.pages).pipe(dest('dist'));
  cb();
}

function bundle() {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {},
  })
    .on('error', fancy_log)
    .on('log', fancy_log)
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(dest('dist'));
}

function watcher() {
  watch('src/*.*', { ignoreInitial: false }, parallel(copyHtml, bundle));
}

exports.default = watcher;
