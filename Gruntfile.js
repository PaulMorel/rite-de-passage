module.exports = function(grunt) {

	// 1. All configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'assets/img',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'assets/img/build/'
				}]
			}
		},

		// LESS Compiler
		less: {
			development: {
				options: {
					files: {
						"assets/css/style.css": "assets/less/style.less"
					}
				}
			},
			production: {
				options: {
					cleancss: true,
					files: {
						"assets/css/style.css": "assets/less/style.less"
					}
				}
			}
		},

		watch: {
			css: {
			    files: ['assets/less/*.less'],
			    tasks: ['less:development'],
			    options: {
			        spawn: false,
			    }
			}
		},
	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	//grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['watch']);

	// Thank you Chris Coyier
};
