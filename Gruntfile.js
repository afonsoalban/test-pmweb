module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					'assets/css/style.css': 'assets/scss/app.scss'
				}
			}
		},
		sprite: {
			all: {
				src: 'assets/images/sprites/*.png',
				dest: 'assets/images/spritesheet.png',
				destCss: 'assets/scss/sprites.scss',
				algorithm: 'top-down',
				padding: 10
			}
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'assets/css/*.css',
						'assets/images/*',
						'assets/js/**/*.js',
						'*.html'
					]
				},
				options: {
					open: false,
					watchTask: true,
					proxy: 'localhost'
				}
			}
		},
		watch: {
			grunt: {
				files: ['Gruntfile.js']
			},
			sprites: {
				files: 'assets/images/sprites/*.png',
				tasks: ['sprite']
			},
			sass: {
				files: 'assets/scss/**/*.scss',
				tasks: ['sass']
			}
		}
	});

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sprite','sass','browserSync','watch']);
}
