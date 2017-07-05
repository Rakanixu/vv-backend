var gulp = require('gulp');
var ts = require('gulp-typescript');
var gulpTslint = require("gulp-tslint");
var tslint = require("tslint");
var sourcemaps = require('gulp-sourcemaps');
var config = require('../../gulpconfig.js');
var path = require("path");

var tsProject = ts.createProject('tsconfig.json');

gulp.task('build', [], function () {
    var program = tslint.Linter.createProgram("./tsconfig.json");
    var tsResult = gulp.src(config.backend.sourceTsFiles, { base: "." })
        .on('error', function handleError(err) {
            if (!global.isWatching) {
                console.log(err);
                process.exit(1);
            }
        })
        .pipe(gulpTslint({
            program,
            formatter: "stylish"
        }))
        .pipe(gulpTslint.report({
            emitError: !global.isWatching
        }))
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    tsResult.dts.pipe(gulp.dest("."));
    return tsResult.js.pipe(sourcemaps.write('.', {
        includeContent: false,
        sourceRoot: (file) => {
            var sourceFile = path.join(file.cwd, file.sourceMap.file);
            return path.relative(path.dirname(sourceFile), file.base);
        }
    }))
    .pipe(gulp.dest(config.general.dist));
});

