module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.initConfig({
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'main.css': 'main.scss'        // 'destination': 'source'
        }
      }
    },
    autoprefixer: {
      dist: {
        files: {
          'main.css': 'main.css'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['sass', 'autoprefixer']);
}
