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

    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'bin/www',
          node_env: 'development'
        }
      },
      prod: {
        options: {
          script: 'bin/www',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'path/to/test/server.js'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      express: {
        files:  [ '**/*.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false
        }
      },
      scripts: {
        files: [ 'dev/js/*.js' ],
        tasks: [ 'jshint' ]
      },
      styles: {
        files: [ 'dev/sass/*.scss' ],
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

  grunt.registerTask('server', [ 'express:dev', 'watch' ]);
  grunt.registerTask('dev', [ 'clean', 'sass', 'postcss:dev', 'jshint' ]);
  grunt.registerTask('dist', [ 'clean', 'sass', 'postcss:dist', 'uglify', 'concat' ]);
};