'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			lib: {
				src: ['timbre.mp3_decode.js']
			}
		},
		uglify: {
			options: {
				preserveComments: 'some'
			},
			dist: {
				files: {
					'lib/jsmad.min.js': ['lib/jsmad.js'],
					'timbre.mp3_decode.min.js': ['timbre.mp3_decode.js']
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task.
	grunt.registerTask('default', ['jshint', 'uglify']);
};