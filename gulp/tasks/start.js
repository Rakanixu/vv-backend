var gulp = require('gulp');
var server = require('gulp-develop-server');
var config = require('../../gulpconfig.js');

gulp.task('start', ['build'], function () {
    global.isWatching = true;
    gulp.watch(config.backend.sourceTsFiles, ['restart']);
    server.listen({
        path: config.general.dist + '/app/app.js',
        env: { PM_DB_PASS: process.env.PM_DB_PASS || 'product_master', PM_DB_HOST: process.env.PM_DB_HOST || 'localhost' }
    }, function (error) {
        console.log(error);
    });
});

gulp.task('restart', ['build'], function () {
    server.restart();
});

gulp.task('start-test', ['build'], function () {
    global.isWatching = true;
    gulp.watch(config.backend.sourceTsFiles, ['restart']);
    server.listen({
        path: config.general.dist + '/app/app.js',
        args: ['--unsecure'],
        env: { NODE_ENV: 'test', PM_PORT: "35035", PM_DB_PORT: process.env.PM_DB_PORT || "35036", PM_DB_NAME: "test" }
    }, function (error) {
        console.log(error);
    });
});