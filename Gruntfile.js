/**
 * Created by Danny Schreiber on 12/30/2014.
 */
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            jsFilesForTesting: [
                'app/vendors/jquery/jquery.js',
                'app/vendors/angular/angular.js',
                'app/vendors/angular-bootstrap/ui-bootstrap-tpls-0.6.0.js',
                'app/vendors/angular-ui-router/release/angular-ui-router.js',
                'app/vendors/angular-mocks/angular-mocks.js',
                'app/vendors/lodash/dist/lodash.js',
                'app/src/**/*.spec.js'
            ]
        },

        karma: {
            development: {
                configFile: 'karma.conf.js',
                options: {
                    files: [
                        '<%= meta.jsFilesForTesting %>',
                        'app/src/**/*.js'
                    ]
                }
            },
            dist: {
                options: {
                    configFile: 'karma.conf.js',
                    files: [
                        '<%= meta.jsFilesForTesting %>',
                        'dist/<%= pkg.namelower %>-<%= pkg.version %>.js'
                    ]
                }
            },
            minified: {
                options: {
                    configFile: 'karma.conf.js',
                    files: [
                        '<%= meta.jsFilesForTesting %>',
                        'dist/<%= pkg.namelower %>-<%= pkg.version %>.min.js'
                    ]
                }
            }
        },

        jshint: {
            beforeconcat: ['app/src/**/*.js'],
            ignore_warning: {
                options: {
                    '-W030': true
                }
            }
        },

        concat: {
            dist: {
                src: ['app/src/module.js','app/src/**/*.js', '!app/src/**/*.spec.js'],
                dest: 'dist/<%= pkg.namelower %>-<%= pkg.version %>.js'
            },
            dist_css: {
                src:['app/src/assets/css/**/*.css'],
                dest:'dist/<%= pkg.namelower %>-<%= pkg.version %>.css'
            }
        },
        cssmin: {
            dist_css:{
                src: 'dist/<%= pkg.namelower %>-<%= pkg.version %>.css',
                dest: 'dist/<%= pkg.namelower %>-<%= pkg.version %>.min.css'
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'dist/<%= pkg.namelower %>-<%= pkg.version %>.min.js': ['dist/<%= pkg.namelower %>-<%= pkg.version %>.js']
                }
            }
        },

        jsdoc: {
            src: ['app/src/**/*.js'],
            options: {
                destination: 'doc'
            }
        }
    });

    grunt.registerTask('test', ['karma:development']);
    grunt.registerTask('build',
        [
            'jshint',
            'karma:development',
            'concat',
            'concat:dist_css',
            'karma:dist',
            'uglify',
            'karma:minified',
            'cssmin:dist_css',
            'jsdoc'
        ]);
};
