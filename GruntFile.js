module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

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

        jasmine : {
            src : 'src/src/<%= pkg.name %>.js',
            options : {
                specs : 'spec/src/<%= pkg.name %>-spec.js'
            }
        },
    });

    grunt.registerTask('default', 'watch');
};
