var gulp = require('gulp');
var config = require('../../gulpconfig.js');

gulp.task('unsecure', ['start-unsecure'], function() {
    gulp.watch(config.backend.sourceTsFiles, ['restart']);
});