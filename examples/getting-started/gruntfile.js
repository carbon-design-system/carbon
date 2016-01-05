module.exports = function(grunt) {
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
    }
  });

  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['sass']);
}
