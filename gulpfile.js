var gulp		= require('gulp');

gulp.task('watch', function() {
	gulp.watch('public/css/**/*', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		// harp compile
	});
});

/* ---------------------------------------
 	Stuffs
 -----------------------------------------*/

gulp.task('default', ['watch']);
