'use strict';
var gulp = require('gulp');

// Lint
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');


// Cache
var cache = require('gulp-cached'),
// newer = require('gulp-newer'),
  changed = require('gulp-changed');

// Debug
var debug = require('gulp-debug');

// Build
var del = require('del');
var install = require("gulp-install");
var $ = require('gulp-load-plugins')();

// LiveReload
var nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload');

var browserSync = require('browser-sync');


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// DEFAULT FOR 'gulp' COMMAND
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
gulp.task('default', ['test:local']);

gulp.task('test', ['test:local']);


// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src([
    '*.js',
    '*.html'
  ])
      .pipe(jshint.extract()) // Extract JS from .html files
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish')) ;
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// LiveReload
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Watch Files For Changes & Reload
gulp.task('serve',   function () {
  // Proxy Server
  // -------------
  var url = require('url');
  var proxy = require('proxy-middleware');
  var proxyOptions = url.parse('http://localhost:9200/5elements/');
  proxyOptions.route = '/5elements/';
  var proxies = [proxy(proxyOptions)];

  // browserSync Server
  // ------------------
  browserSync({
    notify: true,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    startPath: "/air-cruddy/demo/index.html",
    ghostMode: false,
    server: {
      middleware: proxies,
      baseDir: ['../.'],
      directory: true
    }
  });

});


gulp.task('serveNode', function () {
  livereload.listen({port: 35739});
  //    exec: "--use_strict --harmony",
  nodemon({
    script: 'demo-server/index.js',
    watch: ['demo-server/**/*.js'],
    ext: 'js',
    env: {ES_ADDR: 'localhost'}
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed(__dirname);
    }, 500);
  });
});

gulp.task('serveHome', function () {
  livereload.listen({port: 35739});
  //    exec: "--use_strict --harmony",
  nodemon({
    script: 'src/index.js',
    watch: ['src/**/*.js'],
    ext: 'js',
    env: {ES_ADDR: '192.168.1.100'}
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed(__dirname);
    }, 500);
  });
});


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Registering FOR 'gulp' COMMAND
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Load tasks for web-component-tester
// Adds tasks for `gulp test:local` and `gulp test:remote`
try { require('web-component-tester').gulp.init(gulp); } catch (err) {}

