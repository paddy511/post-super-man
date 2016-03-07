const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const webpack = require('gulp-webpack');

const less = require('gulp-less');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
const cleancss = new LessPluginCleanCSS({ advanced: true });
const autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

gulp.task('default');

gulp.task('compile-less',  () => {
	return gulp.src('./app/**/*.less')
		.pipe(concat('post-super-man.less'))
		.pipe(less({
			plugins: [autoprefix, cleancss]
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('bundle-js', () => {
	return gulp.src('app/**/*.js')
		.pipe(webpack({
			entry: "./app/src/app.js",
			output: {
			filename: 'post-super-man.js',
			sourceMapFilename: 'post-super-man.js.map'
      },
			module: {
		    preLoaders: [
		      {
		        test: /\.js$/,
		        loader: "source-map-loader"
		      },
			  {
			      test: /\.js?$/,
			      exclude: /(node_modules|bower_components)/,
			      loader: 'babel', // 'babel-loader' is also a legal name to reference
			      query: {
			        presets: ['es2015']
			    	}
			  }
		    ]
  		},
			devtool: "source-map"
		}))
		.pipe(gulp.dest('dist'));
});

//wacth
gulp.task('watch-less', () => {
	return gulp.watch(["app/src/**/*.less"], ["compile-less"]);
});

gulp.task('watch-js', () => {
	return gulp.watch("app/src/**/*.js", ["bundle-js"]);
});

gulp.task('watch', ['watch-less', 'watch-js']);