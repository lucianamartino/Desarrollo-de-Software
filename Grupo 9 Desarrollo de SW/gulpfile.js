import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import cssnano from 'cssnano';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import notify from 'gulp-notify';
import cache from 'gulp-cache';
import webp from 'gulp-webp';


const sass = gulpSass(dartSass);

const paths = {
    scss: 'public/scss/**/*.scss',
    js: 'public/js/**/*.js',
    imagenes: 'public/img/**/*'
};

export function css() {
    return gulp.src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/css'));
}

export function javascript() {
    return gulp.src(paths.js, { allowEmpty: true })
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./build/js'));
}

export function imagenes() {
    return gulp.src(paths.imagenes)
        .pipe(cache(imagemin({ optimizationLevel: 3 })))
        .pipe(gulp.dest('build/img'))
        .pipe(notify('Imagen Completada'));
}

export function versionWebp() {
    return gulp.src(paths.imagenes)
        .pipe(webp())
        .pipe(gulp.dest('build/img'))
        .pipe(notify({ message: 'Imagen Completada' }));
}

export function watchArchivos() {
    gulp.watch(paths.scss, css);
    gulp.watch(paths.js, javascript);
    gulp.watch(paths.imagenes, imagenes);
    gulp.watch(paths.imagenes, versionWebp);
}

export default gulp.parallel(css, javascript, imagenes, versionWebp, watchArchivos);
