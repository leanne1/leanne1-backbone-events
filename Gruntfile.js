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
            js_head: {
                files: [{
                    src: [
                        sourceDir + 'scripts/head/*.js'
                    ],
                    dest: buildDir + 'scripts/head/head.js'
                }]
            },
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
        //TODO: use require JS optimizer for require files
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
        //             cwd: sourceDir + 'scripts/head/',
        //             src: [
        //                 '*.js'
        //                 ],
        //             dest: buildDir + 'scripts/head/'
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
    //TODO --> add these back later: 'copy', , 
    grunt.registerTask('build',['sass', 'concat', 'cssmin', 'imagemin', 'htmlmin', 'uglify']); 
}