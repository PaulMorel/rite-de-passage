module.exports = function(grunt) {

	// Task Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'src/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'build/assets/img/'
				}]
			},
		},

		// LESS Compiler
		less: {
			development: {
				options: {
				  compress: false
				},
				files: {
				  "build/assets/css/style.css": "src/less/style.less"
				}
			},
			production: {
				options: {
					cleancss: true,
				},
				files: {
				  "build/assets/css/style.css": "src/less/style.less"
				}
			}
		},

		// File Monitoring
		watch: {
			css: {
			    files: ['src/less/*.less'],
			    tasks: ['less:development'],
			    options: {
			        spawn: false,
			    }
			},
			img: {
				files: ['src/img/**/*.{png,jpg,gif}'],
				tasks: ['newer:imagemin']
			}
		},

		// Staging & Deployment Environment
		'sftp-deploy': {
			staging: {
				auth: {
					host: 'w4.uqo.ca',
					port: 22,
					authKey: 'key'
				},
				src: 'build/',
				dest: './w3/htdocs/2014/',
				server_sep: '/'
			}
		}
	});

	// Task Loading
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-sftp-deploy');

	// Task Registering
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('stage', ['less:production','newer:imagemin' , 'sftp-deploy:staging'])

};
