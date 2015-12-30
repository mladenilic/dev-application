module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            files: 'src/<%= pkg.name %>.js',
            tasks: ['jshint', 'jasmine'],
        },

        jshint: {
            options: {jshintrc: '.jshintrc'},
            src: 'src/<%= pkg.name %>.js'
        },

        jasmine: {
            src: 'src/<%= pkg.name %>.js',
            options: {
                specs: 'spec/**/*.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', 'watch');
};
