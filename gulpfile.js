const gulp = require('gulp');
const babel = require('gulp-babel');
const npmDist = require('gulp-npm-dist');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const minifyCss = require('gulp-clean-css');
var browserify = require('gulp-browserify');

sass.compiler = require('node-sass');

gulp.task('es6',()=> {
    return gulp.src('src/app.js')
        .pipe(browserify())
        .pipe(rename('app.min.js'))
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});

gulp.task('copy:libs',()=>{
    gulp.src(npmDist(),{base:'./node_modules'})
        .pipe(gulp.dest('build/libs'));
});

gulp.task('sass',()=>{
    return gulp.src('src/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(rename('style.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('build'));
});

gulp.task('default',()=>{
    gulp.watch('src/app.js',gulp.series('es6'));
    gulp.watch('src/*.scss',gulp.series('sass'));
});


