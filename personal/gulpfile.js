/**
 * Dependencies
 */
var gulp = require('gulp');
var connect = require('gulp-connect-php');
var livereload = require('gulp-livereload');
var gulpif = require('gulp-if');
var clean = require('gulp-clean');
var mkdirp = require('mkdirp');
var notify = require("gulp-notify");
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var wait = require('gulp-wait');
var gutil = require('gulp-util');


/**
 * Ports
 */

var ports = {
  server: 8080,
  livereload: 35729
}

/**
 * Development helpers
 */

var phpStarted = false;
var startPHP = function() {
  // Ensure ./public exists
  mkdirp("../../../../../wamp64/www/site");

  // Starting PHP
  connect.server({
    port: ports.server,
    base: "../../../../../wamp64/www/site",
    hostname: "0.0.0.0"
  });

  // Set the flag that express is ready
  phpStarted = true;

  // Express started
  gutil.log(gutil.colors.green('PHP ready.'));
};

var livereloadStarted = false;
var startLivereload = function() {
  // Starting Livereload
  livereload.listen({
    port: ports.livereload,
    quiet: true,
    reloadPage: "index.php"
  });

  // Set the flag that livereload is ready
  livereloadStarted = true;

  // Livereload started
  gutil.log(gutil.colors.green('Livereload ready.'));
};



/**
 * Tasks
 */

/**
 * Task: copyTask
 *
 * Description:
 *  This task is a generic copy operation for files that need to be copied
 *  from src to the dest without modificiation
 */
var copyTask = function (options) {
  var run = function () {
    mkdirp(options.dest); // Ensure output directory is available

    gulp.src(options.src)
      .pipe(gulp.dest(options.dest))
      .on('finish', function() {
          gutil.log(gutil.colors.green('[Copy] Copy to ' + options.dest + ' complete'));
      });
  };
  run();

  // Development watching
  if (options.development) {
    var runDev = function () {
      mkdirp(options.dest); // Ensure output directory is available

      gulp.src(options.src)
        .pipe(newer(options.dest))
        .pipe(gulp.dest(options.dest))
        .pipe(gulpif(options.development && livereloadStarted, livereload()))
        .pipe(notify(function (file) {
          gutil.log(gutil.colors.yellow('[Copy] Copied changed: ' + file.relative + ' to ' + options.dest));
        }));
    };
    gulp.watch(options.watch, runDev);
  }
}

/**
 * Task: browserifyTask
 *
 * Description:
 *
 */
var browserifyTask = function (options) {
  // Create bundler
  var appBundler = browserify({
    entries: [options.src],
    debug: options.development, // Sourcemapping
    cache: {},
    packageCache: {},
    fullPaths: false
  });

  // This is the actual rebundle process of our application bundle. It produces
  //  a "main.js" file in our "build" folder.
  var rebundle = function () {
    var start = Date.now();
    gutil.log(gutil.colors.yellow('[Browserify '+options.srcname+'] Building'));
    appBundler.bundle()
      .on('error', gutil.log)
      .pipe(source(options.srcname))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(gulpif(options.development && livereloadStarted, livereload()))
      .pipe(notify(function (file) {
        gutil.log(gutil.colors.green('[Browserify '+options.srcname+'] Build complete in ' + (Date.now() - start) + 'ms'));
      }));
  };

  // When we are developing we want to watch for changes and trigger a rebundle
  if (options.development) {
    appBundler = watchify(appBundler);
    appBundler.on('update', rebundle);
  }

  // And trigger the initial bundling
  rebundle();
}

/**
 * Task: sassTask
 *
 * Description:
 *
 */
var sassTask = function (options) {
  var run = function () {
    var start = Date.now();
    gulp.src(options.src)
      .pipe(notify(function (file) {
        gutil.log(gutil.colors.yellow('[SASS] Building: ' + file.relative));
      }))
      .pipe(gulpif(options.development, sourcemaps.init()))
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        cascade: options.development
      }))
      .pipe(gulpif(!options.development, minifyCss()))
      .pipe(gulpif(options.development, sourcemaps.write()))
      .pipe(gulp.dest(options.dest))
      .pipe(gulpif(options.development, wait(200)))
      .pipe(gulpif(options.development && livereloadStarted, livereload()))
      .pipe(notify(function (file) {
        gutil.log(gutil.colors.green('[SASS] Build finished in ' + (Date.now() - start) + 'ms'));
      }));
  };
  run();

  // Development watching
  if (options.development) {
    gulp.watch(options.watch, run);
  }
}

/**
 * Task: imgTask
 *
 * Description:
 *
 */
var imgTask = function (options) {
  var run = function () {
    gulp.src(options.src)
      //.pipe(newer(options.dest))
      .pipe(imagemin({
        optimizationLevel: 3
      }))
      .pipe(gulp.dest(options.dest));
      //.pipe(gulpif(options.development && livereloadStarted, livereload()));
  };
  run();

  // Development watching
  if (options.development) {
    var runDev = function () {
      gulp.src(options.src)
        .pipe(newer(options.dest))
        .pipe(imagemin({
          optimizationLevel: 3
        }))
        .pipe(gulp.dest(options.dest))
        .pipe(gulpif(options.development && livereloadStarted, livereload()));
    };
    gulp.watch(options.watch, runDev);
  }
}


/**
 * Main
 */
var runTasks = function (is_development) {

  // General source copying
  copyTask({
    development: is_development,
    src: [
      './src/*.*',
      './src/.*',
      '!./src/.DS_Store'
    ],
    watch: [
      './src/*.*',
      './src/.*',
      '!./src/.DS_Store'
    ],
    dest: '../../../../../wamp64/www/site'
  });

  copyTask({
    development: is_development,
    src: [ './src/app/**' ],
    watch: [ './src/app/**' ],
    dest: '../../../../../wamp64/www/site/app'
  });

  copyTask({
    development: is_development,
    src: [ './src/fonts/**' ],
    watch: [ './src/fonts/**' ],
    dest: '../../../../../wamp64/www/site/assets/fonts'
  });


  copyTask({
    development: is_development,
    src: [ './src/assets/img/**' ],
    watch: [ './src/assets/img/**' ],
    dest: '../../../../../wamp64/www/site/assets/img'
  });

  // Browserify
  browserifyTask({
    development: is_development,
    srcname: 'main.js',
    src: './src/assets/js/main.js',
    dest: '../../../../../wamp64/www/site/assets/js'
  });
  // Sass
  sassTask({
    development: is_development,
    src: './src/assets/sass/main.scss',
    watch: './src/assets/sass/**/*.scss',
    dest: '../../../../../wamp64/www/site/assets/css'
  });

};




/**
 * Task: clean-build
 *
 * Description:
 *  Deletes the build directory `./public` to ensure the deploy
 *  or testing has no extra files that aren't a part of the build
 *  process.
 */
gulp.task('clean', function () {
  gutil.log(gutil.colors.yellow('Cleaning build directory... '));
  return gulp.src('./public')
    .pipe(clean())
    .on('finish', function() {
        gutil.log(gutil.colors.yellow('Cleaning complete.'));
    });
});


/**
 * Task: deploy
 *
 * Description:
 *  Generates the ./public directory with all source code that
 *  has the production environment set. This will minify js,css
 *  and not include debugging information etc.
 */
gulp.task('deploy', ['clean'], function() {
  // Set environment
  process.env.NODE_ENV = 'production';

  // Run tasks
  runTasks(false); // Production
});

/**
 * Task: test-deploy
 *
 * Description:
 *  Runs the php server to test the current ./public code. This can
 *  be ran after `deploy` to make sure things run correctly.
 */
gulp.task('test-deploy', function() {
  // Set environment
  process.env.NODE_ENV = 'production';

  // Start PHP
  startPHP();
});

/**
 * Task: default
 *
 * Description:
 *  Development testing mode. Will get the build directory setup
 *  with all source code. Adds debugging, livereload for development.
 */
gulp.task('default', function() {
  // Set environment
  //process.env.NODE_ENV = 'development';

  // Start PHP
  startPHP();

  // Run tasks
  runTasks(true); // Development

  // Delay 3 seconds to let PHP spin up and tasks finish their first pass
  //  before livereload starts
  setTimeout(startLivereload, 3000);
});
