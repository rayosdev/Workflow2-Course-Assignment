
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
       

        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    './app/css/styles.css': './app/scss/styles.scss'
                }
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: './app/css',
                    src: ['*.css', '*.min.css'],
                    dest: './dist/css',
                    ext: '.min.css'
                }]
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './app/img/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: './dist/img/'
                }]
            }
        },

        copy: {
            main: {
                files:[{
                    expand: true,
                    cwd: './app',
                    src: '*.html',
                    dest: './dist/',
                    filter: 'isFile',
                }]
            },
          },

 
        watch: {
            css: {
                files: './app/scss/*.scss',
                tasks: ['sass','cssmin']
            },
            html:{
                files: './app/*.html',
                tasks: ['copy']
            },
            img: {
                files: ['./app/img/*.{png,jpg,svg}'],
                tasks: ['imagemin']
            }

        },
        
        
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'dist/css/*',
                        'dist/*.html',
                        'dist/img/*'
                    ]
                },
                options: {
                    watchTask: true,
                    server: 'dist/'
                }
            }
        }
    })
    grunt.loadNpmTasks('grunt-sass')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-imagemin')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-browser-sync')
    // grunt.registerTask('default', ['imagemin','browserSync','watch'])
    grunt.registerTask('default', ['sass','cssmin','imagemin','copy','browserSync','watch'])

}