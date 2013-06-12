module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    // Lint definitions
    jshint: {
      files: ["src/js/<%= pkg.name %>.js"],
      options: {
        jshintrc: "node_modules/grunt-contrib-jshint/.jshintrc"
      }
    },
    jsdoc: {
      dist: {
        src: ['src/js/jquery.mkflickr.js'],
        dest: 'build/doc'
      }
    },
    uglify: {
      options: {
        banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n"
      },
      build: {
        src: "src/js/<%= pkg.name %>.js",
        dest: "build/js/<%= pkg.name %>.min.js"
      }
    },
    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ["src/css/*.css"]
      },
      lax: {
        options: {
          import: false
        },
        src: ["src/css/*.css"]
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: "src/css/",
        src: ["*.css", "!*.min.css"],
        dest: "build/css/",
        ext: ".mkflickr.min.css"
      }
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.snowmeister.co.uk',
          port: 21,
          authKey: 'key1'
        },
        src: 'build/',
        dest: '/htdocs/lab/mkflickr',
        exclusions: ['.DS_Store','/*/.DS_Store', 'node_modules/', 'jquery.mkflickr.sublime-project', 'jquery.mkflickr.sublime-workspace']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-contrib-csslint");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  //grunt.loadNpmTasks("grunt-contrib-concat")
  // Default task(s).
  grunt.registerTask("default", ["jshint", "uglify", "csslint", "cssmin"]);

};