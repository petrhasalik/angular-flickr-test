var gulp = require('gulp');
var runSequence = require('run-sequence');

var StreamQueue = require('streamqueue');
var Server = require('http-server');

var concat = require('gulp-concat');
var clean = require('gulp-clean');
var cssmin = require('gulp-cssmin');
var filter = require('gulp-filter');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var ngmin = require('gulp-ngmin');
var uglify = require('gulp-uglify');

var gulpBowerFiles = require('gulp-bower-files');
var angularFilesort = require('gulp-angular-filesort');
var templateCache = require('gulp-angular-templatecache');
var concatJsDev = require('gulp-concat-js-dev');


var dirs = {
  build: 'build/',
  src: 'src/'
};

var files = {
  index: 'src/index.html',
  app: 'src/app.js',
  styles: 'src/css/styles.css',
  less: 'src/less/styles.less'
};

var paths = {
  scripts: ['src/**/*.js', '!' + files.app, '!src/**/*spec.js'],
  templates: ['src/app/**/*.html'],
  less: ['src/less/**/*.less'],
  livereload: [files.app, files.styles, files.index]
};


var config = {
  appName: 'flickerDemo',
};

var httpServerOptions = {
  host: 'localhost',
  port: 8282
};

function httpServer(options) {
  var server = Server.createServer(options);

  server.listen(options.port, options.host, function() {
    console.log("HTTP server running on ", options.host + ":" + options.port);
    console.log('Hit CTRL-C to stop the server');
  });

  process.on('SIGINT', function() {
    console.log('http-server stopped');
    server.close();
    process.exit();
  });
}

gulp.task('templates', function() {
  gulp.src(paths.templates)
    .pipe(templateCache('templates.js', {module: config.appName}))
    .pipe(gulp.dest(dirs.src));
});

function getScripsQueue() {
  var angularPaths = paths.scripts;
  angularPaths.push('src/templates.js');

  var bowerJsFitler = filter(['**/*.js', '!**/bootstrap.js']);

  var queue = new StreamQueue({objectMode: true});
  queue.queue(
    gulpBowerFiles().pipe(bowerJsFitler),
    gulp.src(angularPaths).pipe(angularFilesort()).pipe(ngmin())
    );

  queue.done();
  return queue;
}

gulp.task("scripts", function() {
  var queue = getScripsQueue();
  queue.pipe(concatJsDev('app.js', {webRoot: dirs.src}, ['//localhost:35729/livereload.js']))
    .pipe(gulp.dest(dirs.src));
});

gulp.task('less', function() {
  gulp.src(files.less)
    .pipe(less())
    .pipe(gulp.dest(dirs.src + '/css'));
});

gulp.task("watch", function() {
  livereload.listen();
  httpServer(httpServerOptions);

  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.less, ['less']);

  gulp.watch(paths.livereload).on('change', livereload.changed);

});

gulp.task('devel', function() {
  runSequence(
    ['templates', 'less'],
    'scripts',
    'watch'
    );
});

gulp.task('build-clean', function() {
  return gulp.src(dirs.build).pipe(clean());
});

gulp.task('build-index', function() {
  gulp.src(files.index)
    .pipe(gulp.dest(dirs.build));
});

gulp.task("build-scripts", function() {
  var queue = getScripsQueue();
  queue.pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dirs.build));
});

gulp.task('build-styles', function() {
  gulp.src(files.styles)
    .pipe(cssmin())
    .pipe(gulp.dest(dirs.build + '/css'));
});

gulp.task('build', function() {
  runSequence(
    'build-clean',
    'templates',
    'less',
    'build-index',
    'build-scripts',
    'build-styles'
    );
});

gulp.task('default', ['build']);