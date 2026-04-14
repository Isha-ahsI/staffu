const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const babel = require("gulp-babel");
const newer = require("gulp-newer");
const cleanCSS = require('gulp-clean-css');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const npmDist = require('gulp-npm-dist');
const fileinclude = require('gulp-file-include');
const rtlcss = require('gulp-postcss-rtlcss');

const folder = {
    src: "src/",
    build: "build/",
    dist: "build/",
    build_scss: "build/css/",
    build_js: "build/js/",
    build_img: "build/images/",
    build_data: "build/data/",
    build_videos:"build/videos",
    build_plugins: "build/plugins/"
};

// Copy ALL third-party libraries from node_modules
const thirdParty = () => {
    // Bootstrap
    gulp.src('node_modules/bootstrap/dist/**/*')
        .pipe(gulp.dest(folder.build_plugins + 'bootstrap'));

    gulp.src('node_modules/bootstrap-icons/**/*')
        .pipe(gulp.dest(folder.build_plugins + 'bootstrap-icons'));

    // SimpleBar
    gulp.src('node_modules/simplebar/dist/**/*')
        .pipe(gulp.dest(folder.build_plugins + 'simplebar'));

    // Using npmDist for other packages
    return gulp
        .src(npmDist(), { base: './node_modules', encoding: false })
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
        }))
        .pipe(gulp.dest(folder.build_plugins))
        .on('end', () => {
        });
};

// HTML task
function html() {
    var out = folder.dist + "";

    return gulp
        .src([
            folder.src + 'html/**/*.html',
            '!' + folder.src + 'html/**/partials/**'
        ])
        .pipe(fileinclude({
            prefix: '%%',
            basepath: '@file',
            indent: true
        }))
        .pipe(gulp.dest(out))
        .on('end', () => {
        })
        .pipe(browserSync.stream());
}

// Compile & minify SCSS (LTR)
async function styles() {
    const autoprefixer = (await import('gulp-autoprefixer')).default;
    return gulp
        .src(folder.src + 'scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(folder.build_scss))
        .on('end', () => {
            console.log('✓ LTR CSS compiled successfully');
        })
        .pipe(browserSync.stream());
}

// Generate RTL CSS from compiled LTR CSS
async function stylesRTL() {
    const autoprefixer = (await import('gulp-autoprefixer')).default;
    
    return gulp
        .src(folder.src + 'scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rtlcss()) // Convert to RTL
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.rtl.min' }))
        .pipe(gulp.dest(folder.build_scss))
        .on('end', () => {
            console.log('✓ RTL CSS compiled successfully');
        })
        .pipe(browserSync.stream());
}

// Compile all JS files (WITHOUT bundle conflict)
function js() {
    return gulp
        .src([
            folder.src + "js/**/*.js",
            '!' + folder.src + "js/layout.js",  // Exclude files used in bundle
            '!' + folder.src + "js/main.js"
        ])
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(uglify())
        .pipe(gulp.dest(folder.build_js))
        .on('end', () => {
        })
        .pipe(browserSync.stream());
}

// Concat layout.js + main.js into combined file
function jsBundle() {
    return gulp
        .src([
            folder.src + "js/layout.js",
            folder.src + "js/main.js"
        ])
        .pipe(concat("combined.js"))  // Different name to avoid conflict
        .pipe(rename({ basename: "combined", suffix: ".min" }))
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(uglify())
        .pipe(gulp.dest(folder.build_js))
        .on('end', () => {
        })
        .pipe(browserSync.stream());
}

// Image processing
function img() {
    return gulp
        .src(folder.src + "images/**/*.{png,jpg,jpeg,gif,svg,webp,ico,bmp,PNG,JPG,JPEG,GIF,SVG}", {
            allowEmpty: true,
            encoding: false,
            base: folder.src
        })
        .pipe(newer(folder.build_img))
        .pipe(gulp.dest(folder.build))
        .on('end', () => {
        })
        .pipe(browserSync.stream());
}

function video() {
    console.log(':film_camera: Copying videos...');
    return gulp
        .src(folder.src + "videos/**/*.{mp4,webm,ogg,mov,avi,flv,mkv}", {
            allowEmpty: true,
            encoding: false,
            base: folder.src
        })
        .pipe(newer(folder.build + "videos/"))
        .pipe(gulp.dest(folder.build))
        .on('end', () => {
            console.log(':white_tick: Videos copied successfully!');
        })
        .pipe(browserSync.stream());
}

// Copy data files
function data() {
    return gulp
        .src(folder.src + "data/**/*", { allowEmpty: true })
        .pipe(gulp.dest(folder.build_data))
        .on('end', () => {
        })
        .pipe(browserSync.stream());
}

// Start BrowserSync server
function serve(done) {
    browserSync.init({
        server: {
            baseDir: folder.build,
            index: "index.html"
        },
        port: 3000,
        open: true,
        notify: false,
        ui: false,
        ghostMode: false
    });
    done();
}

// Reload browser
function reload(done) {
    browserSync.reload();
    done();
}

// Watch files
function watch() {
    gulp.watch(folder.src + "html/**/*", gulp.series(html, reload));
    gulp.watch(folder.src + "images/**/*", gulp.series(img, reload));
    gulp.watch(folder.src + "videos/**/*", gulp.series(video, reload));
    gulp.watch(folder.src + "data/**/*", gulp.series(data, reload));
    
    // Watch SCSS and compile both LTR and RTL
    gulp.watch(folder.src + "scss/**/*", gulp.series(gulp.parallel(styles, stylesRTL), reload));
    
    gulp.watch(folder.src + "js/**/*", gulp.series(gulp.parallel(js, jsBundle), reload));
}

// Development task
gulp.task("dev", gulp.series(
    gulp.parallel(thirdParty, html, img,video, data, styles, stylesRTL, js, jsBundle),
    gulp.parallel(serve, watch)
));

// Build task
gulp.task("build", gulp.series(
    gulp.parallel(thirdParty, html, img,video, data, styles, stylesRTL, js, jsBundle)
));

// RTL only build task
gulp.task("build-rtl", gulp.series(stylesRTL));

// Default task
gulp.task("default", gulp.series("dev"));

// Export individual tasks
exports.html = html;
exports.styles = styles;
exports.stylesRTL = stylesRTL;
exports.js = js;
exports.jsBundle = jsBundle;
exports.img = img;
exports.video = video;
exports.data = data;
exports.serve = serve;
exports.watch = watch;
exports.thirdParty = thirdParty;
exports.reload = reload;