module.exports = function(grunt) {
    var sourceDir = 'app/',
        buildDir = 'app/build/';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        //Compile sass to css
        sass: {
            dist: {
                files: [{
                    src: [
                        sourceDir + 'styles/main.scss'
                    ],
                    dest: buildDir + 'styles/main.css'
                }]
            } 
        },
        //Watch files for changes, then run given task/s
        watch: {
            sass: {
                files: [sourceDir + 'styles/**/*.scss'],
                tasks: ['sass', 'concat:css']
            },
            images: {
                files: [sourceDir + 'images/**/*.{png,jpg,jpeg}'],
                tasks: ['imagemin']
            },
            options: {
                livereload: true
            }  
        },
        //Concat JS and CSS files    
        concat: {   
            options: {
                separator: ';',
            },
            js_head: {
                files: [
                    {
                        src: [
                            sourceDir + 'scripts/head/*.js'
                        ],
                        dest: buildDir + 'scripts/head/head.js'
                    }
                ]
            },
            css: {
                files: [
                    {
                        src: [
                            '<%= sass.dist.files[0].dest %>',
                            sourceDir + 'bower_components/datepicker-fr/themes/base/core.css',
                            sourceDir + 'bower_components/datepicker-fr/themes/base/theme.css',
                            sourceDir + 'bower_components/datepicker-fr/themes/base/datepicker.css'
                        ],
                        dest: 'app/build/styles/main.css'
                    }
                ]
            }
        },
        //TODO: use require JS optimizer for require JS files
        //Uglify js
        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            dist: {
                files: [
                    {
                        src: '<%= concat.js_head.files[0].dest %>',
                        dest: buildDir + 'scripts/head/head.js'
                    }
                ]
            }
        },

        //Minify CSS
        cssmin: {
            minify: {
                src: '<%= concat.css.files[0].dest %>',
                dest: buildDir + 'css/main.css'
            }
        },
        //Optimise images
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: sourceDir + 'images',
                        src: '{,*/}*.{png,jpg,jpeg}',
                        dest: buildDir + 'images'
                    }
                ]
            }
        },
        //Copy source files to build dir
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: sourceDir + 'bower_components/datepicker-fr/themes/base/images',
                        src: ['*.png'],
                        dest: buildDir + 'styles/images/'
                    }
                ]
            }
        }        
    });
    
    //Load Grunt plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    
    //Grunt tasks
    grunt.registerTask('dev',['watch']);
    grunt.registerTask('build',['sass', 'concat', 'cssmin', 'imagemin', 'uglify', 'copy']); 
}