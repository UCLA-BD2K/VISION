var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jsFiles = ['*.js', 'src/**/*.js', 'test/*.js'];
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');
    var injectSrc = gulp.src(['./public/css/*.css',
                             './public/js/*.js'], {
        read: false
    });
    var injectOptions = {
        ignorePath: '/public'
    };

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    return gulp.src('./src/views/*.ejs')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('mocha', function () {
    return gulp.src(['test/*.js'], {
            read: false
        })
        .pipe(mocha());
        //.on('error', gutil.log);
});

gulp.task('default', ['inject', 'mocha'], function () {
    var options = {
        script: 'app.js',
        tasks: ['mocha'],
        delayTime: 1,
        env: {
            'PORT': 5000
        },
        watch: jsFiles,
        legacyWatch: true
    };

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting...');
        });
});

gulp.task('jenkins', ['inject'], function() {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 5000
        },
        watch: jsFiles,
        legacyWatch: true
    };

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting...');
        });
})