module.exports = function(grunt) {

	// 1. All configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'src/img',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'assets/img/'
				}]
			}
		},

		// LESS Compiler
		less: {
			development: {
				options: {
				  compress: false
				},
				files: {
				  "assets/css/style.css": "src/less/style.less"
				}
			},
			production: {
				options: {
					cleancss: true,
				},
				files: {
				  "assets/css/style.css": "src/less/style.less"
				}
			}
		},

		// File Minitoring
		watch: {
			css: {
			    files: ['src/less/*.less'],
			    tasks: ['less:development'],
			    options: {
			        spawn: false,
			    }
			},
			img: {
				files: ['src/img/*'],
				tasks: ['newer:imagemin']
			}
		}
	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-newer');

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('imagemin', ['imagemin']);

	// Thank you Chris Coyier
};
