var gulp = require('gulp');
var rimraf = require('rimraf');
var config = require('../../gulpconfig.js');

gulp.task('clean', function (cb) {
    rimraf(config.general.dist, cb);
});
