/*eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var gulpGrunt = require('gulp-grunt')(gulp);
var gulpImagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imagemin = require('imagemin');


gulp.task('default', function() {
    return gulp.src('img/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('scripts-dist', function() {
   gulp.src('js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('dist', [
  'copy-html',
  'copy-images',
  'styles',
  'lint',
  'scripts-dist'
]);

gulp.task('default', defaultTask);

gulp.task('default', function() {
    gulp.start('uglify', 'sass', 'grunt-sass:dist');
});

gulp.task('scripts', function() {
  gulp.src('js/**/*.js')
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function() {
  gulp.src('./sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./css/styles.css'))
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('lint', function () {
  return gulp.src(['js/**/*.js'])
  // eslint() attaches the lint output to the eslint
  // of the file object so it can be used by other m
  .pipe(eslint())
  // eslint.format() outputs the lint results to them
  // alternatively use eslint.formatEach() (see docs)
  .pipe(eslint.format())
  // To have the process exit with an error code (1)
  // lint error, return the stream and pipe to failOnError()
  .pipe(eslint.failOnError());
});

gulp.task('default', ['copy-html', 'copy-images', 'styles', 'lint'], function() {
  gulp.watch('./sass/**/*.scss', ['styles']);
  gulp.watch('./js/**/*.js', ['lint']);
  gulp.watch('../index.html', ['copy-html']);
  gulp.watch('./build/index.html').on('change', browserSync.reload);

  browserSync.init({
    server: './dist'
  });
});

gulp.task('tests', function() {
  gulp.src('tests/spec/extraSpec.js')
    .pipe(jasmine({
      integration: true,
      vendor: '/js/**/*.js'
    }));
});

gulp.task('copy-html', function() {
  gulp.src('./index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-images', function() {
  gulp.src('/img/*')
    .pipe(gulp.dest('/dist/img'));
});

function defaultTask(done) {
  // place code for your default task here
  done();
};
