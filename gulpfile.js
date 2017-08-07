var gulp = require('gulp');
var gulpif = require('gulp-if');
var data = require('gulp-data');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var nunjucksRender = require('gulp-nunjucks-render');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var del = require('del');

var pkg = require('./package.json');
var homepage = pkg.homepage.replace(/\/+$/, '');
var production = process.env.NODE_ENV === 'production';

gulp.task('sass', function() {
  var plugins = [
    autoprefixer({ browsers: ['last 2 versions'] }),
    cssnano()
  ];

  return gulp.src('src/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(production, postcss(plugins)))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(gulpif(production, uglify()))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
})

gulp.task('templates', function() {
  return gulp.src('src/pages/**/*.nunjucks')
    .pipe(data(function(file) {
      return require('./config.json');
    }))
    .pipe(nunjucksRender({
      path: ['src/templates/'],
      data: {
        'BASE_URL': production ? homepage : '',
        'CURRENT_YEAR': new Date().getFullYear()
      }
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  return gulp.src('src/**/*.{png,jpg,gif,ico,svg}')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('clean', function() {
  return del.sync('dist');
});

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: 'dist/'
  });

  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/**/*.nunjucks', ['templates']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/images/*', ['images']);
});

gulp.task('build', function() {
  runSequence('clean', ['sass', 'scripts', 'templates', 'images']);
});
