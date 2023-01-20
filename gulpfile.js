const {
    src,
    dest,
    watch,
    series,
    tree
} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create();

const paths = {
    scss: {
        src: './scss/**/*.scss',
        dest: './dist/css'
    },
    js: {
        src: './js/**/*.js',
        dest: './dist/js'
    },
    html: {
        src: './*.html',
        dest: './dist/'
    },
    img: {
        src: './img/**/*.*',
        dest: './dist/img'
    }
}

function styleTask() {
    return src(paths.scss.src, {sourcemaps: true})
    .pipe(concat('style.css'))
    .pipe(sass())
    .on('error',sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest(paths.scss.dest), {sourcemaps: '-' })
    .pipe(browserSync.stream())
}

function jsTask() {
    return src(paths.js.src, { sourcemaps: true })
        .pipe(concat('all.js'))
        .pipe(terser())
        .pipe(dest(paths.js.dest), { sourcemaps: '.' })
        .pipe(browserSync.stream())
}

function htmlTask() {
    return src(paths.html.src)
        .pipe(dest(paths.html.dest))
}

function imgTask() {
    return src(paths.img.src)
        .pipe(imagemin())
        .pipe(dest(paths.img.dest))
}

function watchTask() {

    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    watch(paths.html.src, htmlTask).on('change', browserSync.reload);
    watch(paths.img.src, imgTask);
    watch(paths.scss.src, styleTask);
    watch(paths.js.src, jsTask);
}

exports.default = series(
    styleTask,
    jsTask,
    imgTask,
    htmlTask,
    watchTask
)