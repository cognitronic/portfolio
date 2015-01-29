/**
 * Created by Danny Schreiber on 12/30/2014.
 */
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            jsFilesForTesting: [
                'admin/vendors/jquery/jquery.js',
                'admin/vendors/jasmine-jquery/lib/jasmine-jquery.js',
                'admin/vendors/angular/angular.js',
                'admin/vendors/angular-bootstrap/ui-bootstrap-tpls.js',
                'admin/vendors/angular-ui-router/release/angular-ui-router.js',
                'admin/vendors/angular-mocks/angular-mocks.js',
                'admin/vendors/lodash/dist/lodash.js',
                'admin/vendors/ram-utilities/dist/ram-utilities-0.0.1.js',
                'admin/fixtures/setup.js',
                'admin/fixtures/**/*.js',
                {
                    pattern: 'admin/fixtures/**/*.json',
                    watched: true,
                    served: true,
                    included: false
                },
                'admin/src/app.js',
                'admin/src/**/*.spec.js'
            ]
        },

        karma: {
            development: {
                configFile: 'karma.conf.js',
                options: {
                    files: [
                        '<%= meta.jsFilesForTesting %>',
                        'admin/src/**/*.js'
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
            beforeconcat: ['admin/src/**/*.js'],
            ignore_warning: {
                options: {
                    '-W030': true
                }
            }
        },

        concat: {
            dist: {
                src: ['admin/src/module.js', 'admin/src/app.js','admin/src/**/*.js', '!admin/src/**/*.spec.js'],
                dest: 'dist/<%= pkg.namelower %>-<%= pkg.version %>.js'
            },
            dist_css: {
                src:['admin/src/assets/css/**/*.css', '!admin/src/assets/css/<%= pkg.namelower %>-<%= pkg.version %>.*'],
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
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['<%= pkg.namelower %>-<%= pkg.version %>.js','<%= pkg.namelower %>-<%= pkg.version %>.min.js'],
                        dest: 'admin/vendors/'
                    },
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['<%= pkg.namelower %>-<%= pkg.version %>.css','<%= pkg.namelower %>-<%= pkg.version %>.min.css'],
                        dest: 'admin/src/assets/css/'
                    }
                ]
            }
        },
        jsdoc: {
            src: ['public/src/**/*.js'],
            options: {
                destination: 'doc'
            }
        }
    });

    grunt.registerTask('test', ['karma:development']);
    grunt.registerTask('build', [
        'jshint',
        'concat',
        'concat:dist_css',
        'uglify',
        'cssmin:dist_css',
        'copy:dist'
    ]);
    grunt.registerTask('build_with_tests',
        [
            'jshint',
            'karma:development',
            'concat',
            'concat:dist_css',
            'karma:dist',
            'uglify',
            'karma:minified',
            'cssmin:dist_css',
            'copy:dist',
            'jsdoc'
        ]);
};
