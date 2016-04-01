module.exports = function (grunt) {
  'use strict';
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
      dev: {
        options: {
          map: false,
          processors: [
          require('pixrem')(),
          require('autoprefixer')()
          ]
        },
        src: 'dist/styles/*.css'
      },
      dist: {
        options: {
          map: false,
          processors: [
          require('pixrem')(),
          require('autoprefixer')(),
          require('cssnano')()
          ]
        },
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
      express: {
        files:  [ '**/*.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      },
      scripts: {
        files: [ '**/*.js' ],
        tasks: [ 'jshint' ]
      },
      styles: {
        files: [ '**/*.scss' ],
        tasks: [ 'sass', 'postcss:dev' ]
      }
    },

    clean: {
      build: [ 'dist/styles/', 'dist/scripts/' ]
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', [ 'watch' ]);
  grunt.registerTask('dev', [ 'clean', 'sass', 'postcss:dev', 'jshint' ]);
  grunt.registerTask('dist', [ 'clean', 'sass', 'postcss:dist', 'uglify', 'concat' ]);
  grunt.registerTask('clean' [ 'clean' ]);
};