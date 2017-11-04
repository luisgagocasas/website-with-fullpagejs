'use strict';
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    jade = require('gulp-jade'),
    jadeInheritance = require('gulp-jade-inheritance'),
    changed = require('gulp-changed'),
    cached = require('gulp-cached'),
    gulpif = require('gulp-if'),
    filter = require('gulp-filter'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('jade', function(){
  //, '!jade/componentes/base.jade'
  gulp.src(['jade/**/*.jade'])
  .pipe(changed('www/', {extension: '.html'}))
  .pipe(gulpif(global.isWatching, cached('jade')))
  .pipe(jadeInheritance({basedir: 'jade'}))
  .pipe(filter(function (file) {
    return !/\/_/.test(file.path) && !/^_/.test(file.relative);
  }))
  .pipe(jade({pretty: true}))
  .on('error', console.log.bind(console))
  .pipe(gulp.dest('www/'))
  .pipe(reload({stream: true}));
});

gulp.task('setWatch', function() {
  global.isWatching = true;
});

gulp.task('stylus', function(){
  gulp.src('stylus/index.styl')
  .pipe(stylus({
    compress: true,
    linenos: false,
    use: nib()
  }))
  .on('error', console.log.bind(console))
  .pipe(gulp.dest('www/css'))
  .pipe(reload({stream: true}));
});

gulp.task('javascript', function(){
  gulp.src('javascript/index.js')
  .pipe(concat('index.js'))
  .pipe(uglify({
    mangle: false,
    output: {
      beautify: true
    },
    wrap: false
  }))
  .on('error', console.log.bind(console))
  .pipe(gulp.dest('www/js'))
  .pipe(reload({stream: true}));
});

gulp.task('browserSync', function(done){
  browserSync.init({
    //PROXY
    /*
    proxy: {
      target: "http://localhost/elsitio/",
      ws: true
    },*/
    //SERVER
    server: {
      baseDir: "./www"
    },
    notify: false,
    injectChanges: true,
    //Online{
    online: true,
    xip: false,
    tunnel: false,
    //}
    ghostMode: {
      clicks: true,
      scroll: true,
      links: true,
      forms: true
    },
    open: "ui",
    //browser: ["google-chrome-stable", "firefox"]
  });
  gulp.watch('jade/**/*.jade', ['jade']);
  gulp.watch('stylus/**/*.styl', ['stylus']);
  gulp.watch('javascript/**/*.js', ['javascript']);
});

gulp.task('default', ['setWatch', 'jade', 'stylus', 'javascript', 'browserSync'])
