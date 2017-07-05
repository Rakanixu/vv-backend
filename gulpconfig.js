var gutil = require('gulp-util');

let dist = "./dist";

gutil.log(gutil.colors.bgBlack("             "));
gutil.log(gutil.colors.bgBlack.bold("  " + gutil.colors.white("epic") + gutil.colors.yellow(">") + gutil.colors.green("labs") + "  "));
gutil.log(gutil.colors.bgBlack("             "));
gutil.log("Deployment folder: " + gutil.colors.blue(dist));

module.exports = {
  "general": {
    "dist": dist
  },
  "backend": {
    "sourceTsFiles": ["app/**/*.ts", "specs/**/*.ts"],
  }
}