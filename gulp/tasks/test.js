var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var wait = require('gulp-wait');

gulp.task('test', ['build'], () => {
    return gulp
        .src('spec/**/*spec.js')
        .pipe(wait(600)) // wait for dev server to start properly :(
        .pipe(jasmine({
            config: {
                "spec_dir": "dist/test",
                "spec_files": [
                    "**/*[sS]pec.js"
                ],
                "helpers": [
                    "helpers/**/*.js"
                ],
                "stopSpecOnExpectationFailure": false,
                "random": false
            }
        }))
        .once('error', function () {
            process.exit(1);
        })
        .once('end', function () {
            process.exit();
        });
});

gulp.task('set-test-backend-env-variables', function () {
    process.env.PM_DB_PORT = process.env.PM_DB_PORT || '35036';
    process.env.PM_PORT = '35035';
    process.env.PM_DB_NAME = 'test';
});
