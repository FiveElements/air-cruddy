'use strict';
const gulp = require('gulp');

const browserSync = require('browser-sync');


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// LiveReload
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Watch Files For Changes & Reload
gulp.task('serve',   function () {
    // Proxy Server
    // -------------
    const url = require('url');
    const proxy = require('proxy-middleware');
    const proxyEsOpt = url.parse('http://localhost:9200/5elements/');
    proxyEsOpt.route = '/5elements/';
    const proxyOptions = url.parse('http://localhost:8080/');
    proxyOptions.route = '/';
    const proxies = [proxy(proxyEsOpt), proxy(proxyOptions)];

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
            baseDir: ['.'],
            directory: true
        }
    });

});