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
                'public/vendors/jquery/jquery.js',
                'public/vendors/angular/angular.js',
                'public/vendors/angular-bootstrap/ui-bootstrap-tpls.js',
                'public/vendors/angular-ui-router/release/angular-ui-router.js',
                'public/vendors/angular-mocks/angular-mocks.js',
                'public/vendors/lodash/dist/lodash.js',
                'public/src/app.js',
                'public/src/**/*.spec.js'
            ]
        },

        karma: {
            development: {
                configFile: 'karma.conf.js',
                options: {
                    files: [
                        '<%= meta.jsFilesForTesting %>',
                        'public/src/**/*.js'
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
            beforeconcat: ['public/src/**/*.js'],
            ignore_warning: {
                options: {
                    '-W030': true
                }
            }
        },

        concat: {
            dist: {
                src: ['public/src/module.js', 'public/src/app.js','public/src/**/*.js', '!public/src/**/*.spec.js'],
                dest: 'dist/<%= pkg.namelower %>-<%= pkg.version %>.js'
            },
            dist_css: {
                src:['public/src/assets/css/**/*.css', '!public/src/assets/css/<%= pkg.namelower %>-<%= pkg.version %>.*'],
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
                        dest: 'public/vendors/'
                    },
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['<%= pkg.namelower %>-<%= pkg.version %>.css','<%= pkg.namelower %>-<%= pkg.version %>.min.css'],
                        dest: 'public/src/assets/css/'
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
            'copy:dist',
            'jsdoc'
        ]);
};
