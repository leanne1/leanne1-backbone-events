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
            //TODO: use requirejs-optimizer for JS
            // js: {
            //     files: [sourceDir + 'js/**/*.js', '!' + sourceDir + 'js/lib/*.js', '!' + sourceDir + 'js/build-source/*.js'],
            //     tasks: ['concat:js_app', 'concat:js_all']
            // },
            options: {
                livereload: true
            }  
        },
        //Concat css files    
        concat: {   
            options: {
                separator: ';',
            },
            // js_app: {
            //     files: [{
            //         src: [
            //             sourceDir + '/js/lib-extends/*.js',
            //             sourceDir + '/js/app/models/slot.js',
            //             sourceDir + '/js/app/collections/slots.js',
            //             sourceDir + '/js/app/views/cal-view.js',
            //             sourceDir + '/js/app/views/dashboard-view.js',
            //             sourceDir + '/js/app/views/month-view.js',
            //             sourceDir + '/js/app/views/day-view.js',
            //             sourceDir + '/js/app/views/booking-view.js',
            //             sourceDir + '/js/app/views/slot-view.js',
            //             sourceDir + '/js/app/views/detail-view.js',
            //             sourceDir + '/js/app/views/cancel-all-view.js'
            //         ],
            //         dest: sourceDir + 'js/build-source/app.js'
            //     },
            //     {
            //         src: [
            //             sourceDir + '/js/cal-public/**/*.js'
            //         ],
            //         dest: buildDir + 'js/cal-public.js'
            //     },
            //     {
            //         src: [
            //             sourceDir + '/js/cal-private/**/*.js'
            //         ],
            //         dest: buildDir + 'js/cal-private.js', 
            //     }]
            // },
            // js_lib: {
            //     files: [{
            //         src: [
            //             sourceDir + '/js/lib/jquery-1.11.1.js',
            //             sourceDir + '/js/lib/jquery-ui.js',  
            //             sourceDir + '/js/lib/bootstrap.min.js',  
            //             sourceDir + '/js/lib/handlebars-v1.3.0.js',  
            //             sourceDir + '/js/lib/underscore.js',  
            //             sourceDir + '/js/lib/backbone.js',
            //         ],
            //         dest: sourceDir + 'js/build-source/lib.js', 
            //     }]
            // },
            // js_all: {
            //     files: [{
            //         src: [
            //             sourceDir + '/js/build-source/lib.js',
            //             sourceDir + '/js/build-source/app.js'
            //         ],
            //         dest: buildDir + 'js/main.js', 
            //     }]
            // },
            css: {
                files: [{
                    src: [
                        // sourceDir + '/styles/vendor/jquery-ui.structure.css',
                        // sourceDir + '/styles/vendor/jquery-ui.theme.css',
                        '<%= sass.dist.files[0].dest %>'
                    ],
                    dest: 'app/build/styles/main.css'
                }]
            }
        },
        //TODO: use require JS optimizer for this
        //Uglify js
        // uglify: {
        //     options: {
        //         compress: {
        //             drop_console: false
        //         }
        //     },
        //     dist: {
        //         files: [
        //             {
        //                 src: '<%= concat.js_all.files[0].dest %>',
        //                 dest: buildDir + 'js/main.js'
        //             },
        //             {
        //                 src: '<%= concat.js_app.files[1].dest %>',
        //                 dest: buildDir + 'js/cal-public.js'
        //             },
        //             {
        //                 src: '<%= concat.js_app.files[2].dest %>',
        //                 dest: buildDir + 'js/cal-private.js'
        //             }
        //         ]

        //     }
        // },

        //Minify CSS
        cssmin: {
            minify: {
                src: '<%= concat.css.files[0].dest %>',
                dest: buildDir + 'css/main.css'
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: sourceDir + 'images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: buildDir + 'images'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: sourceDir,
                    src: '*.html',
                    dest: buildDir
                }]
            }
        },        

        //Copy source files to build dir
        // copy: {
        //     dist: {
        //         files: [{
        //             expand: true,
        //             cwd: sourceDir + 'images/jquery-ui',
        //             src: [
        //                 '*.jpg',
        //                 '*.png',
        //                 '*.gif',
        //                 '*.svg'
        //             ],
        //             dest: buildDir + 'css/images/'
        //         }]
        //     }
        // }        
    });
    
    //Load Grunt plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    
    //Grunt tasks
    grunt.registerTask('dev',['watch']);
    //TODO --> add these back later: 'copy', 'uglify', 
    grunt.registerTask('build',['sass', 'concat', 'cssmin', 'imagemin', 'htmlmin']); 
}