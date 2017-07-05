var gulp = require('gulp');
var config = require('../../gulpconfig.js');

gulp.task('default', ['start'], function() {
    gulp.watch(config.backend.sourceTsFiles, ['restart']);
});
