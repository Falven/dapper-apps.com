module.exports = function (grunt) {
    
    'use strict'

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                files: {
                    'dist/styles/index.css': 'dev/sass/index.scss'
                }
            }
        },

        postcss: {
            options: {
                map: false,
                processors: [
                    require('pixrem')(),
                    require('autoprefixer')(),
                    require('cssnano')()
                ]
            },
            dist: {
                src: 'dist/styles/*.css'
            }
        },

        jshint: {
            options: {
                globals: {
                    jQuery: true
                }
            },
            files: [ 'Gruntfile.js', 'dev/js/*.js' ]
        },

        uglify: {
            options: {
                mangle: true,
                compress: {
                    drop_console: true,
                    global_defs: {
                      "DEBUG": false
                    },
                    dead_code: true,
                    unused: true
                },
                sourceMap: false
            },
            files: {
                'dev/js/*.min.js': [ 'dev/js/*.js' ]
            }
        },

        concat: {
            scripts: {
                src: [ 'dev/js/*.min.js' ],
                dest: 'dist/scripts/index.js'
            }
        },

        watch: {
            scripts: {
                files: [ '**/*.js' ],
                tasks: [ 'jshint' ]
            },
            styles: {
                files: [ '**/*.scss' ],
                tasks: [ 'sass' ]
            }
        },

        clean: {
            build: [ 'dist/styles/', 'dist/scripts/' ]
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', [ 'watch' ]);
    grunt.registerTask('dev', [ 'sass', 'jshint' ]);
    grunt.registerTask('dist', [ 'clean', 'sass', 'postcss', 'uglify', 'concat' ]);
};