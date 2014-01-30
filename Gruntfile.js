'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		browserify: {
			decoder: {
				src: ['./lib/decoder.js'],
				dest: './timbre.mp3_decode.js',
				options: {
					transform: ['workerify']
				}
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			lib: {
				options: {
					ignores: ['./lib/jsmad.js', './lib/timbre.js']
				},
				src: ['./lib/**/*']
			}
		},
		uglify: {
			options: {
				preserveComments: 'some'
			},
			dist: {
				files: {
					'timbre.mp3_decode.min.js': ['timbre.mp3_decode.js']
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browserify');

	// Default task.
	grunt.registerTask('default', ['build']);
	grunt.registerTask('build', ['jshint', 'browserify', 'uglify']);
};